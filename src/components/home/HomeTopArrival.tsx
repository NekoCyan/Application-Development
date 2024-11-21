'use client';

import Loading from '@/app/loading';
import { ProductData } from '@/database/interfaces';
import { PageList } from '@/database/interfaces/ExternalDocument';
import { NekoResponse } from '@/types';
import { API } from '@/utils';
import { GET } from '@/utils/Request';
import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import ProductBox from '../product/ProductBox';

export default function HomeTopArrival() {
	const [isFetching, setIsFetching] = useState(true);
	const [topArrival, setTopArrival] = useState<ProductData[]>([]);

	useEffect(() => {
		GET(
			API.ProductsList +
				'?' +
				new URLSearchParams({
					inStock: '',
					newest: '',
					limit: '4',
				}),
			{
				headers: {
					'Content-Type': 'application/json',
				},
			},
		)
			.then((x) => {
				const data = x.data as NekoResponse<PageList<ProductData>>;

				setTopArrival(data.data.list);
			})
			.catch((err) => {
				console.log(err);
				setTopArrival([]);
			})
			.finally(() => {
				setIsFetching(false);
			});
	}, []);

	return (
		<Container className='pb-16'>
			<h2 className='text-2xl font-medium text-gray-800 uppercase mb-6'>
				top new arrival
			</h2>
			{isFetching && <Loading />}
			{!isFetching && topArrival.length === 0 && <p>No products found</p>}
			{!isFetching && topArrival.length > 0 && (
				<div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
					{topArrival.map((product) => (
						<ProductBox key={product.productId} product={product} />
					))}
				</div>
			)}
		</Container>
	);
}
