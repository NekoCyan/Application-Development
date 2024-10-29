'use client';

import Loading from '@/app/loading';
import { NekoResponse } from '@/types';
import { API, ROUTES, Truncate } from '@/utils';
import { MultiStyles } from '@/utils/ComponentUtils';
import { GET } from '@/utils/Request';
import { BASE_URL } from '@/utils/getUrl';
import debounce from 'lodash.debounce';
import Image from 'next/image';
import Link from 'next/link';
import { FormEvent, useEffect, useState } from 'react';

type HeaderSearchProps = {
	isDisabled?: boolean;
};

export default function HeaderSearch({
	isDisabled,
}: Readonly<HeaderSearchProps>) {
	const [searchTerm, setSearchTerm] = useState('');
	const [searchResults, setSearchResults] = useState<any[]>([]);
	const [isSearching, setIsSearching] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(true);

	useEffect(() => {
		if (!isSearching) setIsSearching(true);
		const fetchData = debounce(async () => {
			// Fetch search results from the server or an API
			// GET(API.ProductsList, {
			// 	params: {
			// 		name: searchTerm,
			// 	},
			// })
			// 	.then((x) => {
			// 		const data = x.data as NekoResponse<any>;
			// 		if (!data.success) throw new Error(data.message);
			// 		console.log(data);
			// 		setSearchResults(data.data.list);
			// 	})
			// 	.catch((err) => {
			// 		setSearchResults([]);
			// 	})
			// 	.finally(() => {
			// 		setIsSearching(false);
			// 	});
			setSearchResults([]);
			setIsSearching(false);
		}, 500);

		if (searchTerm) fetchData();
		else {
			fetchData?.cancel();
			setSearchResults([]);
		}

		return () => {
			fetchData.cancel();
		};
	}, [searchTerm]);

	async function onSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();

		const url = new URL(BASE_URL);
		url.pathname = ROUTES.Products;
		url.searchParams.set('name', searchTerm);

		window.location.href = url.toString();
	}

	const handleChange = (e: any) => {
		setSearchTerm(e.target.value?.trim() ?? '');
	};

	const handleModalOpen = () => {
		setIsModalOpen(true);
	};

	return (
		<div className='col-md-12 col-lg-3'>
			{!isDisabled && (
				<div className={'relative'}>
					<form
						onSubmit={onSubmit}
						className='w-full min-w-full relative flex'
					>
						<input
							autoComplete='off'
							type='text'
							name='search'
							className={
								'w-full border border-primary border-r-0 pl-12 py-3 pr-3 rounded-l-md focus:outline-none'
							}
							placeholder='Search here...'
							onChange={handleChange}
							onFocus={handleModalOpen}
						/>
						<button
							className={
								'bg-primary border border-primary text-white px-6 rounded-r-md hover:bg-transparent hover:text-primary'
							}
						>
							Search
						</button>
					</form>
					<div
						className={MultiStyles(
							'absolute mt-1 z-20 bg-white w-full rounded-xl border-1 border-gray-300 shadow-md',
							searchTerm && isModalOpen ? 'block' : 'hidden',
							!isSearching && 'overflow-y-auto scrollbar',
							!isSearching && searchResults.length === 0
								? 'h-[100px]'
								: 'h-[250px]',
						)}
					>
						{isSearching && <Loading width={250} height={100} />}
						{!isSearching &&
							searchResults.length > 0 &&
							searchResults.map((product) => (
								<Link
									key={product.productId}
									href={ROUTES.ProductDetails(
										product.productId.toString(),
									)}
									className={MultiStyles(
										'flex flex-row gap-2 p-2 border-b-1 border-gray-300',
									)}
									onClick={() => {
										setIsModalOpen(false);
									}}
								>
									<Image
										width={100}
										height={100}
										src={product.imageUrls[0]}
										alt={Truncate(product.name, 20)}
									/>
									<a
										href={ROUTES.ProductDetails(
											product.productId.toString(),
										)}
										className='text-black'
									>
										{product.name}
									</a>
								</Link>
							))}
						{!isSearching && searchResults.length === 0 && (
							<div className='flex justify-center items-center h-full'>
								<h4 className='m-0 text-center'>
									No results found, try to use another
									keyword...
								</h4>
							</div>
						)}
					</div>
				</div>
			)}
		</div>
	);
}
