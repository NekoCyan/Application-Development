'use client';

import AddToCart from '@/components/button/AddToCartBtn';
import WishlistToggledBtn from '@/components/button/WishlistToggledBtn';
import { CategoryData, ProductData } from '@/database/interfaces';
import { FormatCurrency, ROUTES } from '@/utils';
import { BASE_URL } from '@/utils/getUrl';
import Link from 'next/link';
import { Fragment, useState } from 'react';

export default function ProductDetailsData({
	props,
	categories,
}: Readonly<{
	props: ProductData;
	categories: CategoryData[];
}>) {
	const [quantity, setQuantity] = useState(1);

	const {
		productId,
		name,
		stock,
		categoryIds,
		description,
		salePercentage,
		price,
	} = props;

	const currentPrice = FormatCurrency(price);
	const salePrice = FormatCurrency(price * (1 - (salePercentage ?? 0) / 100));
	const isSale = !!(salePercentage && salePercentage > 0);

	const validateQuantity = (input: number) => {
		if (input < 1) return 1;
		if (input > stock) return stock;
		return input;
	};

	const handleAddQuantityUp = () => {
		setQuantity(validateQuantity(quantity + 1));
	};

	const handleAddQuantityDown = () => {
		setQuantity(validateQuantity(quantity - 1));
	};

	return (
		<Fragment>
			<h2 className='text-3xl font-medium uppercase mb-2'>{name}</h2>
			<div className='flex items-center mb-4'>
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
				<div className='text-xs text-gray-500 ml-3'>(150 Reviews)</div>
			</div>
			<div className='space-y-2'>
				<p className='text-gray-800 font-semibold space-x-2'>
					<span>Availability: </span>
					{stock > 0 ? (
						<Fragment>
							<span className='text-green-600'>In Stock</span>
							<span className='text-gray-600'>
								({stock} Available)
							</span>
						</Fragment>
					) : (
						<span className='text-red-600'>Out of Stock</span>
					)}
				</p>
				<p className='space-x-2'>
					<span className='text-gray-800 font-semibold'>
						Category:{' '}
					</span>
					{categoryIds.map((id) => {
						const url = new URL(BASE_URL);
						url.pathname = ROUTES.Products;
						url.searchParams.set(
							'filterByCategories',
							id.toString(),
						);

						return (
							<Link
								key={id}
								href={url.toString()}
								target='_blank'
								className='text-gray-600 hover:underline'
								onClick={(e) =>
									e.currentTarget.href === '#' &&
									e.preventDefault()
								}
							>
								{categories.find((c) => c.categoryId === id)
									?.name ?? 'Unknown'}
							</Link>
						);
					})}
				</p>
				<p className='space-x-2'>
					<span className='text-gray-800 font-semibold'>SKU: </span>
					<span className='text-gray-600'>BE45VGRT</span>
				</p>
			</div>
			<div className='flex items-baseline mb-1 space-x-2 font-roboto mt-4'>
				{isSale ? (
					<Fragment>
						<p className='text-xl text-primary font-semibold'>
							{salePrice}
						</p>
						<p className='text-base text-gray-400 line-through'>
							{currentPrice}
						</p>
						<p className='text-xl text-primary uppercase font-bold'>
							(save up to {salePercentage}% off)
						</p>
					</Fragment>
				) : (
					<p className='text-xl text-gray-400 font-semibold'>
						{currentPrice}
					</p>
				)}
			</div>

			<p className='mt-4 text-gray-600'>{description}</p>

			<div className='mt-4'>
				<h3 className='text-sm text-gray-800 uppercase mb-1'>
					Quantity
				</h3>
				<div className='flex border border-gray-300 text-gray-600 divide-x divide-gray-300 w-max'>
					<button
						className='h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none'
						onClick={handleAddQuantityDown}
					>
						-
					</button>
					<div className='h-8 w-8 text-base flex items-center justify-center'>
						{quantity}
					</div>
					<button
						className='h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none'
						onClick={handleAddQuantityUp}
					>
						+
					</button>
				</div>
			</div>
			<div className='w-[300px] mt-3 flex flex-row gap-5'>
				<AddToCart productData={props} quantity={quantity} />
				<WishlistToggledBtn productId={productId} />
			</div>
		</Fragment>
	);
}
