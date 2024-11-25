'use client';

import { ProductData } from '@/database/interfaces';
import { FormatCurrency, ROUTES } from '@/utils';
import Image from 'next/image';
import Link from 'next/link';
import { Fragment } from 'react';
import AddToCart from '../button/AddToCartBtn';
import WishlistToggledBtn from '../button/WishlistToggledBtn';

export interface ProductBoxProps {
	product: ProductData;
}
export default function ProductBox({ product }: Readonly<ProductBoxProps>) {
	const isSale = product.salePercentage > 0;
	const salePrice = product.price * (1 - product.salePercentage / 100);

	return (
		<div className='bg-white shadow rounded overflow-hidden group'>
			<div className='relative'>
				<Image
					src={product.imageUrls[0]}
					alt={product.name}
					width={300}
					height={300}
					className='h-[300px] rounded-b-none w-full'
				/>
				<div
					className='absolute inset-0 bg-black bg-opacity-40 flex items-center 
                    justify-center gap-2 opacity-0 group-hover:opacity-100 transition'
				>
					<Link
						href={ROUTES.ProductDetails(product.productId)}
						className='text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition'
						title='view product'
					>
						<i className='fa-solid fa-magnifying-glass'></i>
					</Link>
					<WishlistToggledBtn productId={product.productId} />
				</div>
			</div>
			<div className='pt-4 pb-3 px-4'>
				<Link href={ROUTES.ProductDetails(product.productId)}>
					<h4 className='uppercase min-h-[85px] font-medium text-xl mb-2 text-gray-800 hover:text-primary transition line-clamp-3'>
						{product.name}
					</h4>
				</Link>
				<div className='flex items-baseline mb-1 space-x-2'>
					{isSale ? (
						<Fragment>
							<p className='text-xl text-primary font-semibold'>
								{FormatCurrency(salePrice)}
							</p>
							<p className='text-sm text-gray-400 line-through'>
								{FormatCurrency(product.price)}
							</p>
							<p className='text-sm text-primary font-semibold'>
								({product.salePercentage}% off)
							</p>
						</Fragment>
					) : (
						<p className='text-xl text-gray-400 font-semibold'>
							{FormatCurrency(salePrice)}
						</p>
					)}
				</div>
				<div className='flex items-center'>
					<div className='flex gap-1 text-sm text-yellow-400'>
						<span>
							<i className='fa-solid fa-star'></i>
						</span>
						<span>
							<i className='fa-solid fa-star'></i>
						</span>
						<span>
							<i className='fa-solid fa-star'></i>
						</span>
						<span>
							<i className='fa-solid fa-star'></i>
						</span>
						<span>
							<i className='fa-solid fa-star'></i>
						</span>
					</div>
					<div className='text-xs text-gray-500 ml-3'>(150)</div>
				</div>
			</div>
			<AddToCart productData={product} quantity={1} />
		</div>
	);
}
