// packages
import React from 'react';
// components
import { NFTItemCard, NFTItemCardSkeleton } from '../UI/NFTItemCard';

const AuthorItemsSkeleton = () => {
  return (
    <>
      {new Array(8).fill(0).map((_, index) => (
        <div className='col-lg-3 col-md-6 col-sm-6 col-xs-12' key={index}>
          <NFTItemCardSkeleton />
        </div>
      ))}
    </>
  );
}

const AuthorItems = ({ authorId, authorImage, items, isLoading }) => {

  return (
    <div className='de_tab_content'>
      <div className='tab-1'>
        <div className='row'>
          {isLoading ? <AuthorItemsSkeleton /> : (<>
            {items?.map((item, index) => (
              <div className='col-lg-3 col-md-6 col-sm-6 col-xs-12' key={index}>
                <NFTItemCard data={item} authorId={authorId} authorImage={authorImage} />
              </div>
            ))}
          </>)}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
