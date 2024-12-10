// packages
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import axios from 'axios';
import AOS from 'aos';

const TopSellersSkeleton = () => {
  return (
    <ol className='author_list skeleton'>
      {new Array(12).fill(0).map((_, index) => (
        <li key={index}>
          <div className='author_list_pp'>
            <Skeleton circle />
            <i className='fa fa-check' />
          </div>
          <div className='author_list_info'>
            <Skeleton count={1} width='40%' height='18px' />
            <Skeleton count={1} width='25%' height='14px' />
          </div>
        </li>
      ))}
    </ol>
  );
}

const TopSellers = () => {
  // states
  const [_sellers, setSellers] = useState([]);
  const [ui_isLoading, setUiIsLoading] = useState(true);

  useEffect(() => {
    const fetchSellers = async () => {
      // fetch API
      try {
        const resp = await axios.get('https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers');
        setSellers(resp.data);
        setTimeout(() => {
          setUiIsLoading(false);
        }, 500);
      } catch (error) {
        console.error('Error fetching top sellers: ', error);
        setUiIsLoading(false);
      }
    }
    fetchSellers();
    AOS.init({
      offset: 40,
      duration: 1000,
      easing: 'ease'
    });
  }, []);

  return (
    <section id='section-popular' className='pb-5'>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='text-center' data-aos='fade' data-aos-delay='0'>
              <h2>Top Sellers</h2>
              <div className='small-border bg-color-2' />
            </div>
          </div>
          <div className='col-md-12'>
            {!ui_isLoading && _sellers ? (<ol className='author_list' data-aos='fade-up' data-aos-delay='200'>
              {_sellers?.map((seller, index) => (
                <li key={index}>
                  <div className='author_list_pp'>
                    <Link to={`/author/${seller.authorId}`}>
                      <img className='lazy pp-author' src={seller.authorImage} alt={`User ${seller.authorId}`} />
                      <i className='fa fa-check' />
                    </Link>
                  </div>
                  <div className='author_list_info'>
                    <Link to={`/author/${seller.authorId}`}>{seller.authorName}</Link>
                    <span>{seller.price} ETH</span>
                  </div>
                </li>
              ))}
            </ol>) : <TopSellersSkeleton />}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
