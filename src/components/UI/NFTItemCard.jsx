// packages
import React from 'react';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
// components
import Countdown from '../UI/Countdown';

const NFTItemCardSkeleton = () => {
	return (
		<div className='nft__item'>
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
	);
}

const NFTItemCard = ({ data, authorId, authorImage }) => {
	return (
		<div className='nft__item'>
			<div className='author_list_pp'>
				<Link to={`/author/${data.authorId || authorId}`} data-bs-toggle='tooltip' data-bs-placement='top' title='Creator: Monica Lucas'>
					<img className='lazy' src={data.authorImage || authorImage} alt={`User ${data.authorId || authorId}`} />
					<i className='fa fa-check'></i>
				</Link>
			</div>
			<Countdown time={data.expiryDate} />
			<div className='nft__item_wrap'>
				<div className='nft__item_extra'>
					<div className='nft__item_buttons'>
						<button>Buy Now</button>
						<div className='nft__item_share'>
							<h4>Share</h4>
							<a href='' target='_blank' rel='noreferrer'>
								<i className='fa fa-facebook fa-lg'></i>
							</a>
							<a href='' target='_blank' rel='noreferrer'>
								<i className='fa fa-twitter fa-lg'></i>
							</a>
							<a href=''>
								<i className='fa fa-envelope fa-lg'></i>
							</a>
						</div>
					</div>
				</div>
				<Link to={`/item-details/${data.nftId}`}>
					<img src={data.nftImage} className='lazy nft__item_preview' alt={`${data.title} image`} />
				</Link>
			</div>
			<div className='nft__item_info'>
				<Link to={`/item-details/${data.nftId}`}>
					<h4>{data.title}</h4>
				</Link>
				<div className='nft__item_price'>{data.price} ETH</div>
				<div className='nft__item_like'>
					<i className='fa fa-heart'></i>
					<span>{data.likes}</span>
				</div>
			</div>
		</div>
	);
}

export { NFTItemCard, NFTItemCardSkeleton };