'use client';

import Loading from '@/app/loading';
import { ProductData } from '@/database/interfaces';
import { PageList } from '@/database/interfaces/ExternalDocument';
import { NekoResponse } from '@/types';
import { API } from '@/utils';
import { GET } from '@/utils/Request';
import { useEffect, useState } from 'react';
import ProductBox from '../ProductBox';

export default function ProductDetailsRelated({
	productData,
}: Readonly<{ productData: ProductData }>) {
	const [isFetching, setIsFetching] = useState(true);
	const [productRelated, setProductRelated] = useState<ProductData[]>([]);

	useEffect(() => {
		GET(
			API.ProductsList +
				'?' +
				new URLSearchParams({
					inStock: '',
					limit: '4',
					shuffle: 'after',
					excludeProductIds: productData.productId.toString(),
					filterByCategories: productData.categoryIds.join(','),
					filterByCategoriesType: 'OR',
				}),
			{
				headers: {
					'Content-Type': 'application/json',
				},
			},
		)
			.then((x) => {
				const data = x.data as NekoResponse<PageList<ProductData>>;

				setProductRelated(data.data.list);
			})
			.catch((err) => {
				console.log(err);
				setProductRelated([]);
			})
			.finally(() => {
				setIsFetching(false);
			});
	}, []);

	return (
		<div className='py-5'>
			<h3 className='text-2xl text-gray-800 mb-2'>Products related</h3>
			{isFetching && <Loading />}
			{!isFetching && productRelated.length === 0 && (
				<p>No products found</p>
			)}
			{!isFetching && productRelated.length > 0 && (
				<div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
					{productRelated.map((product) => (
						<ProductBox key={product.productId} product={product} />
					))}
				</div>
			)}
		</div>
	);
}
