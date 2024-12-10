// packages
import React, { useEffect, useState } from 'react';
import axios from 'axios';
// components
import { NFTItemCard, NFTItemCardSkeleton } from '../UI/NFTItemCard';

const ExploreItemsSkeleton = () => {
  return (
    <>
      {new Array(8).fill(0).map((_, index) => (
        <div key={index} className='d-item col-lg-3 col-md-6 col-sm-6 col-xs-12 skeleton' style={{ display: 'block', backgroundSize: 'cover' }}>
          <NFTItemCardSkeleton />
        </div>
      ))}
    </>
  );
}

const ExploreItems = () => {
  // states
  const [_items, setItems] = useState([]);
  const [ui_isLoading, setUiIsLoading] = useState(true);
  const [ui_filter, setUiFilter] = useState('');
  const [ui_filteredItems, setUiFilteredItems] = useState('');
  const [ui_numVisibleItems, setUiNumVisibleItems] = useState(8);

  const filterItems = () => {
    switch (ui_filter) {
      case 'price_low_to_high':
        setUiFilteredItems(_items.slice().sort((a, b) => a.price - b.price));
        break;
      case 'price_high_to_low':
        setUiFilteredItems(_items.slice().sort((a, b) => b.price - a.price));
        break;
      case 'likes_high_to_low':
        setUiFilteredItems(_items.slice().sort((a, b) => b.likes - a.likes));
        break;
      default:
        setUiFilteredItems(_items);
        break;
    }
  }

  const fetchItems = async () => {
    // fetch API
    try {
      const resp = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/explore${ui_filter !== '' ? `?filter=${ui_filter}` : ''}`);
      setItems(resp.data);
      //setUiFilteredItems(resp.data);
      setTimeout(() => {
        setUiIsLoading(false);
      }, 500);
    } catch (error) {
      console.error('Error fetching new items: ', error);
      setUiIsLoading(false);
    }
  }

  useEffect(() => {    
    fetchItems();
  }, []);

  useEffect(() => {
    //filterItems();
    fetchItems();
  }, [ui_filter]);

  return (
    <>
      <div>
        <select id='filter-items' defaultValue='' onChange={(e) => setUiFilter(e.target.value)}>
          <option value=''>Default</option>
          <option value='price_low_to_high'>Price, Low to High</option>
          <option value='price_high_to_low'>Price, High to Low</option>
          <option value='likes_high_to_low'>Most liked</option>
        </select>
      </div>
      {!ui_isLoading ? (<>
        {_items?.slice(0, ui_numVisibleItems).map((item, index) => (<div key={index} className='d-item col-lg-3 col-md-6 col-sm-6 col-xs-12' style={{ display: 'block', backgroundSize: 'cover' }}>
          <NFTItemCard data={item} />
        </div>))}
      </>) : <ExploreItemsSkeleton />}
      {(!ui_isLoading && ui_numVisibleItems < _items.length) && <div className='col-md-12 text-center'>
        <button id='loadmore' className='btn-main lead' onClick={() => setUiNumVisibleItems((prev) => prev + 4)}>Load more</button>
      </div>}
    </>
  );
};

export default ExploreItems;