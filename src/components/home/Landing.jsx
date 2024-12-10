// packages
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
// assets
import NFT from '../../images/nft.png';
import backgroundImage from '../../images/bg-shape-1.jpg';

const Landing = () => {

  useEffect(() => {
    AOS.init({
      offset: 40,
      duration: 1000,
      easing: 'ease'
    });
  }, []);

  return (
    <section id='section-hero' aria-label='section' className='no-top no-bottom vh-100' data-bgimage='url(images/bg-shape-1.jpg) bottom' style={{ background: `url(${backgroundImage}) bottom / cover` }}>
      <div className='v-center'>
        <div className='container'>
          <div className='row align-items-center'>
            <div className='col-md-6'>
              <div className='spacer-single' />
              <h6 data-aos='fade-up' data-aos-delay='0'>
                <span className='text-uppercase id-color-2'>Ultraverse Market</span>
              </h6>
              <div className='spacer-10' />
              <h1 data-aos='fade-up' data-aos-delay='200'>Create, sell or collect digital items.</h1>
              <p className='lead' data-aos='fade-up' data-aos-delay='250'>Unit of data stored on a digital ledger, called a blockchain, that certifies a digital asset to be unique and therefore not interchangeable</p>
              <div className='spacer-10' />
              <Link className='btn-main lead' to='/explore' data-aos='fade-up' data-aos-delay='500'>Explore</Link>
              <div className='mb-sm-30' />
            </div>
            <div className='col-md-6 xs-hide'>
              <img src={NFT} className='lazy img-fluid' alt='' data-aos='zoom-in' data-aos-delay='0' />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;