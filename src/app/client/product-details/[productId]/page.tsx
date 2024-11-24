import { PageProps } from '@/types';
import { API, REVALIDATE, WEBSITE } from '@/utils';
import getUrl from '@/utils/getUrl';
import { notFound } from 'next/navigation';
import Component from './component';

export async function generateMetadata(
	props: Readonly<PageProps<{ productId: string }>>,
) {
	const fetchedProduct = await fetch(
		getUrl(API.ProductsGet(props.params.productId)),
		{
			headers: {
				'Content-Type': 'application/json',
			},
			next: {
				revalidate: REVALIDATE.Product,
			},
		},
	);
	const product = (await fetchedProduct.json()).data;

	let title;

	if (Object.keys(product).includes('name')) {
		title = WEBSITE.title(product.name);
	} else {
		title = WEBSITE.title(`Not found`);
	}

	return {
		title,
	};
}

export default async function Page(
	props: Readonly<PageProps<{ productId: string }>>,
) {
	const fetchedProduct = await fetch(
		getUrl(API.ProductsGet(props.params.productId)),
		{
			headers: {
				'Content-Type': 'application/json',
			},
			next: {
				revalidate: REVALIDATE.Product,
			},
		},
	);
	const product = (await fetchedProduct.json()).data;
	if (Object.keys(product).includes('name')) {
		product['productId'] = props.params.productId;
		const fetchedCategories = await fetch(getUrl('/api/categories'), {
			next: {
				revalidate: REVALIDATE.Category,
			},
		});
		const categories = (await fetchedCategories.json()).data;

		return <Component categories={categories.list} product={product} />;
	} else {
		return notFound();
	}
}
