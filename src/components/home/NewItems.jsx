// packages
import React, { useEffect, useState } from 'react';
import OwlCarousel from 'react-owl-carousel';
import axios from 'axios';
// components
import { NFTItemCard, NFTItemCardSkeleton } from '../UI/NFTItemCard';

const NewItemsSkeleton = () => {
  return (
    <div className='owl-carousel owl-theme skeleton'>
      <div className='owl-stage-outer'>
        {new Array(4).fill(0).map((_, index) => (<NFTItemCardSkeleton key={index} />))}
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
            {_items?.map((item, index) => (<NFTItemCard key={index} data={item} />))}
          </OwlCarousel>}
        </div>
      </div>
    </section>
  );
};

export default NewItems;