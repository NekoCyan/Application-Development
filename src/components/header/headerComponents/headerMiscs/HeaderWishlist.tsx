'use client';

import { RootDispatch, RootState } from '@/redux/store';
import { wishlistAction } from '@/redux/wishlistCount/WishlistSlice';
import { NekoResponse } from '@/types';
import { API, ROUTES } from '@/utils';
import { GET } from '@/utils/Request';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function HeaderWishlist() {
	const { status } = useSession();

	const wishlistCount = useSelector<RootState, number>(
		(state) => state.wishlist.value.length,
	);
	const dispatch: RootDispatch = useDispatch();

	useEffect(() => {
		if (status === 'authenticated') {
			GET(API.Wishlist)
				.then((x) => {
					const data = x.data as NekoResponse<{ data: number[] }>;

					dispatch(wishlistAction.set(data.data.data));
				})
				.catch((err) => {
					console.error(err);
				});
		}
	}, [status]);

	return (
		<Link
			href={ROUTES.Wishlist}
			className='text-center text-gray-700 hover:text-primary transition relative'
		>
			<div className='text-2xl'>
				<i className='fa-regular fa-heart'></i>
			</div>
			<div className='text-xs leading-3'>Wishlist</div>
			<div className='absolute right-0 -top-1 w-5 h-5 rounded-full flex items-center justify-center bg-primary text-white text-xs'>
				{wishlistCount >= 10 ? '9+' : wishlistCount}
			</div>
		</Link>
	);
}
