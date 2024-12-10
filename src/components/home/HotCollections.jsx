// packages
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import OwlCarousel from 'react-owl-carousel';
import axios from 'axios';

const HotCollectionsSkeleton = () => {
  return (
    <div className='owl-carousel owl-theme skeleton'>
      <div className='owl-stage-outer'>
        {new Array(4).fill(0).map((_, index) => (
          <div key={index} className='nft_coll'>
            <div className='nft_wrap'>
              <Skeleton count={1} />
            </div>
            <div className='nft_coll_pp'>
              <Skeleton circle height='100%' />
              <i className='fa fa-check' />
            </div>
            <div className='nft_coll_info'>
              <Skeleton count={1} width='30%' height='18px' />
              <Skeleton count={1} width='20%' height='14px' />
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

const HotCollections = () => {
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
        const resp = await axios.get('https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections');
        setItems(resp.data);
        setTimeout(() => {
          setUiIsLoading(false);
        }, 500);
      } catch (error) {
        console.error('Error fetching hot collection items: ', error);
        setUiIsLoading(false);
      }
    }
    fetchItems();
  }, []);

  return (
    <section id='section-collections' className='no-bottom'>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='text-center'>
              <h2>Hot Collections</h2>
              <div className='small-border bg-color-2'></div>
            </div>
          </div>
          {ui_isLoading ? <HotCollectionsSkeleton /> : <OwlCarousel className='owl-theme' loop margin={10} nav responsive={carouselOptionsResponsive}>
            {_items.map((item) => (
              <div key={item.id} className='nft_coll'>
                <div className='nft_wrap'>
                  <Link to={`/item-details/${item.nftId}`}>
                    <img src={item.nftImage} className='lazy img-fluid' alt={`${item.title} image`} />
                  </Link>
                </div>
                <div className='nft_coll_pp'>
                  <Link to={`/author/${item.authorId}`}>
                    <img className='lazy pp-coll' src={item.authorImage} alt={`User ${item.authorId}`} />
                  </Link>
                  <i className='fa fa-check' />
                </div>
                <div className='nft_coll_info'>
                  <Link to='/explore'>
                    <h4>{item.title}</h4>
                  </Link>
                  <span>ERC-{item.code}</span>
                </div>
              </div>
            ))}
          </OwlCarousel>}
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
