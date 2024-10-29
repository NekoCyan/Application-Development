'use client';

import { cartCountAction } from '@/redux/cartsCount/CartsCountSlice';
import { RootDispatch, RootState } from '@/redux/store';
import { NekoResponse } from '@/types';
import { API, ROUTES } from '@/utils';
import { GET } from '@/utils/Request';
import CartStorage from '@/utils/localStorage/CartStorage';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function HeaderCart() {
	const { status } = useSession();

	const cartCount = useSelector<RootState, number>(
		(state) => state.cartCount.value,
	);
	const dispatch: RootDispatch = useDispatch();

	useEffect(() => {
		// if (status === 'authenticated') {
		// 	GET(API.CartCount)
		// 		.then((x) => {
		// 			const data = x.data as NekoResponse<{ count: number }>;

		// 			dispatch(cartCountAction.set(data.data.count));
		// 		})
		// 		.catch((err) => {
		// 			console.error(err);
		// 		});
		// } else {
		// 	const cartStorage = new CartStorage(localStorage);

		// 	dispatch(cartCountAction.set(cartStorage.getCartCount()));
		// }
		dispatch(cartCountAction.set(0));
	}, [status]);

	return (
		<Link
			href={ROUTES.Cart}
			className='text-center text-gray-700 hover:text-primary transition relative'
		>
			<div className='text-2xl'>
				<i className='fa-solid fa-bag-shopping'></i>
			</div>
			<div className='text-xs leading-3'>Cart</div>
			<div className='absolute -right-3 -top-1 w-5 h-5 rounded-full flex items-center justify-center bg-primary text-white text-xs'>
				{cartCount >= 10 ? '9+' : cartCount}
			</div>
		</Link>
	);
}
