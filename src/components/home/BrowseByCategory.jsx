// packages
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';

const BrowseByCategory = () => {

  useEffect(() => {
    AOS.init({
      offset: 40,
      duration: 1000,
      easing: 'ease'
    });
  }, []);

  return (
    <section id='section-category' className='no-top'>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='text-center' data-aos='fade' data-aos-delay='0'>
              <h2>Browse by category</h2>
              <div className='small-border bg-color-2' />
            </div>
          </div>
          <div className='col-md-2 col-sm-4 col-6 mb-sm-30' data-aos='zoom-in-left' data-aos-delay='200'>
            <Link to='/explore' className='icon-box style-2 rounded'>
              <i className='fa fa-image' />
              <span>Art</span>
            </Link>
          </div>
          <div className='col-md-2 col-sm-4 col-6 mb-sm-30' data-aos='zoom-in-left' data-aos-delay='250'>
            <Link to='/explore' className='icon-box style-2 rounded'>
              <i className='fa fa-music' />
              <span>Music</span>
            </Link>
          </div>
          <div className='col-md-2 col-sm-4 col-6 mb-sm-30' data-aos='zoom-in-left' data-aos-delay='300'>
            <Link to='/explore' className='icon-box style-2 rounded'>
              <i className='fa fa-search' />
              <span>Domain Names</span>
            </Link>
          </div>
          <div className='col-md-2 col-sm-4 col-6 mb-sm-30' data-aos='zoom-in-left' data-aos-delay='350'>
            <Link to='/explore' className='icon-box style-2 rounded'>
              <i className='fa fa-globe' />
              <span>Virtual Worlds</span>
            </Link>
          </div>
          <div className='col-md-2 col-sm-4 col-6 mb-sm-30' data-aos='zoom-in-left' data-aos-delay='400'>
            <Link to='/explore' className='icon-box style-2 rounded'>
              <i className='fa fa-vcard' />
              <span>Trading Cards</span>
            </Link>
          </div>
          <div className='col-md-2 col-sm-4 col-6 mb-sm-30' data-aos='zoom-in-left' data-aos-delay='450'>
            <Link to='/explore' className='icon-box style-2 rounded'>
              <i className='fa fa-th' />
              <span>Collectibles</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrowseByCategory;