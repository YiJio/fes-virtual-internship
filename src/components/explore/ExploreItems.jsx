// packages
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import axios from 'axios';
// components
import Countdown from '../UI/Countdown';

const ExploreItemsSkeleton = () => {
  return (
    <>
      {new Array(8).fill(0).map((_, index) => (
        <div key={index} className='d-item col-lg-3 col-md-6 col-sm-6 col-xs-12 skeleton' style={{ display: 'block', backgroundSize: 'cover' }}>
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

  useEffect(() => {
    const fetchItems = async () => {
      // fetch API
      try {
        const resp = await axios.get('https://us-central1-nft-cloud-functions.cloudfunctions.net/explore');
        setItems(resp.data);
        setUiFilteredItems(resp.data);
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

  useEffect(() => {
    filterItems();
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
      {!ui_isLoading && ui_filteredItems ? (<>
        {ui_filteredItems?.slice(0, ui_numVisibleItems).map((item, index) => (<div key={index} className='d-item col-lg-3 col-md-6 col-sm-6 col-xs-12' style={{ display: 'block', backgroundSize: 'cover' }}>
          <div className='nft__item'>
            <div className='author_list_pp'>
              <Link to={`/author/${item.authorId}`} data-bs-toggle='tooltip' data-bs-placement='top'>
                <img className='lazy' src={item.authorImage} alt={`User ${item.authorId}`} />
                <i className='fa fa-check' />
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
                      <i className='fa fa-facebook fa-lg' />
                    </a>
                    <a href='' target='_blank' rel='noreferrer'>
                      <i className='fa fa-twitter fa-lg' />
                    </a>
                    <a href=''>
                      <i className='fa fa-envelope fa-lg' />
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
        </div>))}
      </>) : <ExploreItemsSkeleton />}
      {(!ui_isLoading && ui_numVisibleItems < _items.length) && <div className='col-md-12 text-center'>
        <button id='loadmore' className='btn-main lead' onClick={() => setUiNumVisibleItems((prev) => prev + 4)}>Load more</button>
      </div>}
    </>
  );
};

export default ExploreItems;