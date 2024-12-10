// packages
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import axios from 'axios';
// assets
import EthImage from '../images/ethereum.svg';

const ItemDetailsSkeleton = () => {
  return (
    <div className='row skeleton'>
      <div className='col-md-6 text-center'>
        <Skeleton count={1} width='100%' height='100%' />
      </div>
      <div className='col-md-6'>
        <div className='item_info'>
          <Skeleton count={1} width='50%' height='36px' style={{ marginBottom: '25px' }} />
          <div className='item_info_counts'>
            <div className='item_info_views' />
            <div className='item_info_like' />
          </div>
          <Skeleton count={3} style={{ marginBottom: '12px' }} />
          <div className='d-flex flex-row'>
            <div className='mr40'>
              <h6>Owner</h6>
              <div className='item_author'>
                <div className='author_list_pp'>
                  <Skeleton circle />
                </div>
                <div className='author_list_info'>
                  <Skeleton count={1} width='30%' height='20px' />
                </div>
              </div>
            </div>
          </div>
          <div className='de_tab tab_simple'>
            <div className='de_tab_content'>
              <h6>Creator</h6>
              <div className='item_author'>
                <div className='author_list_pp'>
                  <Skeleton circle />
                </div>
                <div className='author_list_info'>
                  <Skeleton count={1} width='30%' height='20px' />
                </div>
              </div>
            </div>
            <div className='spacer-40'></div>
            <h6>Price</h6>
            <Skeleton width='15%' height='24px' />
          </div>
        </div>
      </div>
    </div>
  );
}

const ItemDetails = () => {
  // hooks
  const { id } = useParams();
  // states
  const [_item, setItem] = useState({});
  const [ui_isLoading, setUiIsLoading] = useState(true);

  useEffect(() => {
    const fetchItem = async () => {
      // fetch API
      try {
        const resp = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${id}`);
        setItem(resp.data);
        setTimeout(() => {
          setUiIsLoading(false);
        }, 500);
      } catch (error) {
        console.error('Error fetching item: ', error);
        setUiIsLoading(false);
      }
    }
    window.scrollTo(0, 0);
    fetchItem();
  }, []);

  return (
    <div id='wrapper'>
      <div className='no-bottom no-top' id='content'>
        <div id='top' />
        <section aria-label='section' className='mt90 sm-mt-0'>
          <div className='container'>
            {ui_isLoading ? <ItemDetailsSkeleton /> : (<div className='row'>
              <div className='col-md-6 text-center'>
                <img src={_item.nftImage} className='img-fluid img-rounded mb-sm-30 nft-image' alt={`${_item.title}`} />
              </div>
              <div className='col-md-6'>
                <div className='item_info'>
                  <h2>{_item.title} #{_item.tag}</h2>
                  <div className='item_info_counts'>
                    <div className='item_info_views'>
                      <i className='fa fa-eye' />
                      {_item.views}
                    </div>
                    <div className='item_info_like'>
                      <i className='fa fa-heart' />
                      {_item.likes}
                    </div>
                  </div>
                  <p>{_item.description}</p>
                  <div className='d-flex flex-row'>
                    <div className='mr40'>
                      <h6>Owner</h6>
                      <div className='item_author'>
                        <div className='author_list_pp'>
                          <Link to={`/author/${_item.ownerId}`}>
                            <img className='lazy' src={_item.ownerImage} alt={`User ${_item.ownerId}`} />
                            <i className='fa fa-check' />
                          </Link>
                        </div>
                        <div className='author_list_info'>
                          <Link to={`/author/${_item.ownerId}`}>{_item.ownerName}</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='de_tab tab_simple'>
                    <div className='de_tab_content'>
                      <h6>Creator</h6>
                      <div className='item_author'>
                        <div className='author_list_pp'>
                          <Link to={`/author/${_item.creatorId}`}>
                            <img className='lazy' src={_item.creatorImage} alt={`User ${_item.creatorId}`} />
                            <i className='fa fa-check' />
                          </Link>
                        </div>
                        <div className='author_list_info'>
                          <Link to={`/author/${_item.creatorId}`}>{_item.creatorName}</Link>
                        </div>
                      </div>
                    </div>
                    <div className='spacer-40'></div>
                    <h6>Price</h6>
                    <div className='nft-item-price'>
                      <img src={EthImage} alt='' />
                      <span>{_item.price}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>)}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;