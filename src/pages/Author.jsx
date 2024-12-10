// packages
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import axios from 'axios';
// components
import AuthorItems from '../components/author/AuthorItems';
// assets
import AuthorBanner from '../images/author_banner.jpg';

const AuthorSkeleton = ({ isLoading }) => {
  return (
    <div className='row'>
      <div className='col-md-12 skeleton'>
        <div className='d_profile de-flex'>
          <div className='de-flex-col'>
            <div className='profile_avatar'>
              <Skeleton circle />
              <i className='fa fa-check' />
              <div className='profile_name'>
                <Skeleton count={1} width='200px' height='28px' />
                <Skeleton count={1} width='50%' height='16px' />
                <Skeleton count={1} width='200px' height='16px' />
              </div>
            </div>
          </div>
          <div className='profile_follow de-flex'>
            <div className='de-flex-col'>
              <Skeleton count={1} width='150px' height='42px' />
            </div>
          </div>
        </div>
      </div>
      <div className='col-md-12 skeleton'>
        <div className='de_tab tab_simple'>
          <AuthorItems isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}

const Author = () => {
  // hooks
  const { id } = useParams();
  // states
  const [_author, setAuthor] = useState({});
  const [ui_isLoading, setUiIsLoading] = useState(true);
  const [ui_isFollowing, setUiIsFollowing] = useState(false);
  const [ui_isCopiedText, setUiIsCopiedText] = useState('Copy');

  const handleFollowing = () => {
    let newState = !ui_isFollowing;
    if (newState) {
      setAuthor((prev) => ({ ...prev, followers: prev.followers + 1 }));
    } else {
      setAuthor((prev) => ({ ...prev, followers: prev.followers - 1 }));
    }
    setUiIsFollowing((prev) => !prev);
  }

  const handleCopied = () => {
    console.log('clicked')
    navigator.clipboard.writeText(_author.address);
    setUiIsCopiedText('Copied!');
  }
  
  useEffect(() => {
    const fetchAuthor = async () => {
      // fetch API
      try {
        const resp = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`);
        setAuthor(resp.data);
        setTimeout(() => {
          setUiIsLoading(false);
        }, 500);
      } catch (error) {
        console.error('Error fetching author: ', error);
        setUiIsLoading(false);
      }
    }
    window.scrollTo(0, 0);
    fetchAuthor();
  }, []);

  useEffect(() => {
    // change back to allowing user to copy
    if(ui_isCopiedText === 'Copied!') {
      setTimeout(() => {
        setUiIsCopiedText('Copy');
      }, 1500);
    }
  }, [ui_isCopiedText]);

  return (
    <div id='wrapper'>
      <div className='no-bottom no-top' id='content'>
        <div id='top'></div>
        <section id='profile_banner' aria-label='section' className='text-light' data-bgimage='url(images/author_banner.jpg) top' style={{ background: `url(${AuthorBanner}) top` }} />
        <section aria-label='section'>
          <div className='container'>
            <div className='row'>
              {ui_isLoading ? <AuthorSkeleton isLoading={ui_isLoading} /> : (<div className='row'>
                <div className='col-md-12'>
                  <div className='d_profile de-flex'>
                    <div className='de-flex-col'>
                      <div className='profile_avatar'>
                        <img src={_author.authorImage} alt='' />
                        <i className='fa fa-check'></i>
                        <div className='profile_name'>
                          <h4>
                            {_author.authorName}
                            <span className='profile_username'>@{_author.tag}</span>
                            <span id='wallet' className='profile_wallet'>{_author.address}</span>
                            <button id='btn_copy' title='Copy Text' onClick={handleCopied}>{ui_isCopiedText}</button>
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div className='profile_follow de-flex'>
                      <div className='de-flex-col'>
                        <div className='profile_follower'>{_author.followers} followers</div>
                        <button className='btn-main' onClick={handleFollowing}>{ui_isFollowing ? 'Unfollow' : 'Follow'}</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='col-md-12'>
                  <div className='de_tab tab_simple'>
                    <AuthorItems authorId={_author.authorId} authorImage={_author.authorImage} items={_author.nftCollection} />
                  </div>
                </div>
              </div>)}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;