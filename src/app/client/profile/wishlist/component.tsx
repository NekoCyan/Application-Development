'use client';

import Loading from '@/app/loading';
import { ProductData } from '@/database/interfaces';
import { RootDispatch, RootState } from '@/redux/store';
import { wishlistAction } from '@/redux/wishlistCount/WishlistSlice';
import { APIResponse } from '@/types';
import { API, LIMITER, MultiStyles, ROUTES, Truncate } from '@/utils';
import { POST } from '@/utils/Request';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Container, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

export default function Component() {
	const { status } = useSession();
	const [products, setProducts] = useState<
		Pick<ProductData, 'productId' | 'name' | 'stock' | 'imageUrls'>[] | null
	>(null);
	const [isDeleting, setIsDeleting] = useState<number[]>([]);

	const dispatch: RootDispatch = useDispatch();
	const wishlist = useSelector<RootState, number[]>(
		(state) => state.wishlist.value,
	);

	useEffect(() => {
		if (status === 'loading') return;

		POST(API.ProductListIds, {
			productIds: wishlist,
		})
			.then((x) => {
				const data = x.data as APIResponse<{
					data: Pick<
						ProductData,
						'productId' | 'name' | 'stock' | 'imageUrls'
					>[];
				}>;
				if (!data.success) throw new Error(data.message);

				setProducts(data.data.data);
			})
			.catch((err) => {
				toast.error(err.message);
				setProducts([]);
			})
			.finally(() => {});
	}, [wishlist]);

	const handleRemoveWishlist = (productId: number) => {
		if (!products || products.length === 0) return;

		setIsDeleting([...isDeleting, productId]);

		POST(API.Wishlist, {
			productId: productId,
		})
			.then((x) => {
				const data = x.data as APIResponse<{
					status: boolean;
				}>;
				if (!data.success) throw new Error(data.message);

				if (data.data.status === true)
					throw new Error(
						`Please try to delete again to remove the product from wishlist.`,
					);
				else {
					const newProducts = products.filter(
						(x) => x.productId !== productId,
					);
					setProducts(newProducts);
					dispatch(wishlistAction.remove(productId));
				}
			})
			.catch((err: any) => {
				setIsDeleting(isDeleting.filter((x) => x !== productId));
				toast.error(err.message);
			});
	};

	return (
		<Container>
			{products && products.length > 0 && (
				<div className='overflow-x-auto mb-2 sm:mb-0'>
					<Table className='table-auto' cellPadding={2}>
						<thead>
							<tr>
								<th className='text-center'>#</th>
								<th className='text-center'>Image</th>
								<th className='text-left'>Product Name</th>
								<th className='text-center'>Stock available</th>
							</tr>
						</thead>
						<tbody>
							{products.map((data, index) => {
								return (
									<tr key={data.productId}>
										<td className='align-middle min-w-[50px]'>
											<div className='flex flex-col justify-center items-center'>
												{index + 1}
												<Link
													href='#'
													className={MultiStyles(
														isDeleting.includes(
															parseInt(
																data.productId as any,
															),
														)
															? 'cursor-not-allowed opacity-50'
															: 'cursor-pointer',
													)}
													onClick={(e) => {
														if (
															isDeleting.includes(
																parseInt(
																	data.productId as any,
																),
															)
														)
															return;
														e.preventDefault();
														handleRemoveWishlist(
															parseInt(
																data.productId as any,
															),
														);
													}}
												>
													<i className='fa fa-trash text-danger cursor-pointer text-2xl' />
												</Link>
											</div>
										</td>
										<td className='min-w-[100px] sm:w-[150px]'>
											<Image
												width={150}
												height={100}
												src={data.imageUrls?.[0]}
												alt={Truncate(
													data.name,
													LIMITER.Cart.ProductName,
												)}
											/>
										</td>
										<td className='min-w-[200px] sm:w-full link2'>
											<Link
												href={ROUTES.ProductDetails(
													data.productId.toString(),
												)}
												className='line-clamp-3'
											>
												{data.name}
											</Link>
										</td>
										<td
											className={MultiStyles(
												'text-center font-bold text-2xl',
												data.stock === 0 &&
													'text-red-500',
											)}
										>
											{data.stock}
										</td>
									</tr>
								);
							})}
						</tbody>
					</Table>
				</div>
			)}
			{products && products.length === 0 && (
				<div className='text-center py-10'>
					<h3>Nothing in Wishlist</h3>
					<Link
						href={ROUTES.Products}
						className='uppercase underline text-2xl'
					>
						go Shopping and find some
					</Link>
				</div>
			)}
			{!products && <Loading className='py-5' width={300} height={100} />}
		</Container>
	);
}
