// packages
import React, { useEffect } from 'react';
import AOS from 'aos';

const LandingIntro = () => {

  useEffect(() => {
    AOS.init({
      offset: 40,
      duration: 1000,
      easing: 'ease'
    });
  }, []);

  return (
    <section id='section-intro' className='no-top no-bottom'>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-4 col-md-6 mb-sm-30'>
            <div className='feature-box f-boxed style-3'>
              <i className='bg-color-2 i-boxed icon_wallet' data-aos='fade-up' data-aos-delay='0' />
              <div className='text'>
                <h4 className='' data-aos='fade-up' data-aos-delay='0'>Set up your wallet</h4>
                <p data-aos='fade-up' data-aos-delay='200'>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem.</p>
              </div>
              <i className='wm icon_wallet' />
            </div>
          </div>
          <div className='col-lg-4 col-md-6 mb-sm-30'>
            <div className='feature-box f-boxed style-3'>
              <i className='bg-color-2 i-boxed icon_cloud-upload_alt' data-aos='fade-up' data-aos-delay='0' />
              <div className='text'>
                <h4 className='' data-aos='fade-up' data-aos-delay='0'>Add your NFT's</h4>
                <p data-aos='fade-up' data-aos-delay='200'>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem.</p>
              </div>
              <i className='wm icon_cloud-upload_alt' />
            </div>
          </div>
          <div className='col-lg-4 col-md-6 mb-sm-30'>
            <div className='feature-box f-boxed style-3'>
              <i className='bg-color-2 i-boxed icon_tags_alt' data-aos='fade-up' data-aos-delay='0' />
              <div className='text'>
                <h4 className='' data-aos='fade-up' data-aos-delay='0'>Sell your NFT's</h4>
                <p data-aos='fade-up' data-aos-delay='200'>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem.</p>
              </div>
              <i className='wm icon_tags_alt' />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingIntro;