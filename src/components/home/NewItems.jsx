// packages
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import OwlCarousel from 'react-owl-carousel';
import axios from 'axios';
// components
import Countdown from '../UI/Countdown';

const NewItemsSkeleton = () => {
  return (
    <div className='owl-carousel owl-theme skeleton'>
      <div className='owl-stage-outer'>
        {new Array(4).fill(0).map((_, index) => (
          <div key={index} className='nft__item'>
            <div className='author_list_pp'>
              <Skeleton circle />
              <i className='fa fa-check' />
            </div>
            <div className='nft__item_wrap'>
              <Skeleton count={1} />
            </div>
            <div className='nft__item_info'>
              <Skeleton count={1} width='40%' height='18px' />
              <Skeleton count={1} width='25%' height='14px' />
              <div className='nft__item_like'>
                <i className='fa fa-heart' />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className='owl-nav'>
        <button type='button' role='presentation' className='owl-prev'><span aria-label='Previous'>‹</span></button>
        <button type='button' role='presentation' className='owl-next'><span aria-label='Next'>›</span></button>
      </div>
    </div>
  );
}

const NewItems = () => {
  // states
  const [_items, setItems] = useState([]);
  const [ui_isLoading, setUiIsLoading] = useState(true);
  // configurations
  const carouselOptionsResponsive = {
    0: { items: 1 },
    600: { items: 2 },
    768: { items: 3 },
    1024: { items: 3 },
    1200: { items: 4 },
  };

  useEffect(() => {
    const fetchItems = async () => {
      // fetch API
      try {
        const resp = await axios.get('https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems');
        setItems(resp.data);
        setTimeout(() => {
          setUiIsLoading(false);
        }, 500);
      } catch (error) {
        console.error('Error fetching new items: ', error);
        setUiIsLoading(false);
      }
    }
    fetchItems();
  }, []);

  return (
    <section id='section-items' className='no-bottom'>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='text-center'>
              <h2>New Items</h2>
              <div className='small-border bg-color-2'></div>
            </div>
          </div>
          {ui_isLoading ? <NewItemsSkeleton /> : <OwlCarousel className='owl-theme' loop margin={10} nav responsive={carouselOptionsResponsive}>
            {_items?.map((item, index) => (<React.Fragment key={index}>
              <div className='nft__item'>
                <div className='author_list_pp'>
                  <Link to={`/author/${item.authorId}`} data-bs-toggle='tooltip' data-bs-placement='top' title='Creator: Monica Lucas'>
                    <img className='lazy' src={item.authorImage} alt={`User ${item.authorId}`} />
                    <i className='fa fa-check'></i>
                  </Link>
                </div>
                <Countdown time={item.expiryDate} />
                <div className='nft__item_wrap'>
                  <div className='nft__item_extra'>
                    <div className='nft__item_buttons'>
                      <button>Buy Now</button>
                      <div className='nft__item_share'>
                        <h4>Share</h4>
                        <a href='' target='_blank' rel='noreferrer'>
                          <i className='fa fa-facebook fa-lg'></i>
                        </a>
                        <a href='' target='_blank' rel='noreferrer'>
                          <i className='fa fa-twitter fa-lg'></i>
                        </a>
                        <a href=''>
                          <i className='fa fa-envelope fa-lg'></i>
                        </a>
                      </div>
                    </div>
                  </div>
                  <Link to={`/item-details/${item.nftId}`}>
                    <img src={item.nftImage} className='lazy nft__item_preview' alt={`${item.title} image`} />
                  </Link>
                </div>
                <div className='nft__item_info'>
                  <Link to={`/item-details/${item.nftId}`}>
                    <h4>{item.title}</h4>
                  </Link>
                  <div className='nft__item_price'>{item.price} ETH</div>
                  <div className='nft__item_like'>
                    <i className='fa fa-heart'></i>
                    <span>{item.likes}</span>
                  </div>
                </div>
              </div>
            </React.Fragment>))}
          </OwlCarousel>}
        </div>
      </div>
    </section>
  );
};

export default NewItems;