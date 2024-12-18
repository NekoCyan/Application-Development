import { ProductData } from '@/database/interfaces';
import { PageList } from '@/database/interfaces/ExternalDocument';
import { NekoResponse, PageProps } from '@/types';
import { IsNullOrUndefined, REVALIDATE, WEBSITE } from '@/utils';
import getUrl from '@/utils/getUrl';
import { Metadata } from 'next';
import Component from './component';

export const metadata: Metadata = {
	title: WEBSITE.title(`Products Searching`),
};

export default async function Page(
	props: Readonly<
		PageProps<
			{},
			Partial<{
				name: string;
				price: string;
				filterByCategories: string;
				inStock: string;
				page: string;
			}>
		>
	>,
) {
	let searchParams = new URLSearchParams();
	!IsNullOrUndefined(props.searchParams.name) &&
		searchParams.append('name', props.searchParams.name!);
	!IsNullOrUndefined(props.searchParams.price) &&
		searchParams.append('price', props.searchParams.price!);
	!IsNullOrUndefined(props.searchParams.filterByCategories) &&
		searchParams.append(
			'filterByCategories',
			props.searchParams.filterByCategories!,
		);
	!IsNullOrUndefined(props.searchParams.inStock) &&
		searchParams.append('inStock', props.searchParams.inStock!);

	const fetchedProducts = await fetch(
		getUrl('/api/products') + '?' + searchParams.toString(),
		{
			headers: {
				'Content-Type': 'application/json',
			},
			next: {
				revalidate: REVALIDATE.ProductSearch,
			},
		},
	);
	const { message, success, data } =
		(await fetchedProducts.json()) as NekoResponse<
			PageList<ProductData>
		>;

	return (
		<Component
			props={props}
			products={data.list}
			errorMsg={!success ? message : ''}
			totalPage={data.totalPage}
		/>
	);
}
