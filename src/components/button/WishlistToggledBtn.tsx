'use client';

import { RootDispatch, RootState } from '@/redux/store';
import { wishlistAction } from '@/redux/wishlistCount/WishlistSlice';
import { APIResponse } from '@/types';
import { API } from '@/utils';
import { POST } from '@/utils/Request';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import ToolTip from '../tooltip/ToolTip';

export interface WishlistToggledBtnProps {
	productId: number;
}

export default function WishlistToggledBtn({
	productId,
}: Readonly<WishlistToggledBtnProps>) {
	productId = parseInt(productId as any);

	const { status } = useSession();
	const isAuthenticated = status === 'authenticated';

	const dispatch: RootDispatch = useDispatch();
	const wishlist = useSelector<RootState, number[]>(
		(state) => state.wishlist.value,
	);

	const [isSubmittingWhishlist, setIsSubmittingWhishlist] = useState(false);
	const isInWishlist = wishlist.includes(productId);

	let toolTipText = 'Login to love this';
	if (isAuthenticated) {
		toolTipText = isInWishlist ? 'Remove from wishlist' : 'Add to wishlist';
	}

	useEffect(() => {
		if (!isSubmittingWhishlist) return;

		POST(API.Wishlist, {
			productId: productId,
		})
			.then((x) => {
				const data = x.data as APIResponse<{
					status: boolean;
				}>;
				if (!data.success) throw new Error(data.message);

				if (data.data.status === true) {
					dispatch(wishlistAction.add(productId));
				} else {
					dispatch(wishlistAction.remove(productId));
				}
			})
			.catch((err: any) => {
				toast.error(err.msg);
			})
			.finally(() => {
				setIsSubmittingWhishlist(false);
			});
	}, [isSubmittingWhishlist]);

	return (
		<button
			disabled={!status || isSubmittingWhishlist}
			onClick={() => {
				if (isAuthenticated) setIsSubmittingWhishlist(true);
			}}
		>
			<ToolTip text={toolTipText}>
				<div className='text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition'>
					{isInWishlist ? (
						<i className='fa-solid fa-heart'></i>
					) : (
						<i className='fa-regular fa-heart'></i>
					)}
				</div>
			</ToolTip>
		</button>
	);
}
