'use client';

import ProductDetails from '@/components/product/ProductDetails';
import { CategoryData, ProductData } from '@/database/interfaces';
import { ROUTES } from '@/utils';
import { isAdmin } from '@/utils/ComponentUtils';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { Fragment } from 'react';
import { Container } from 'react-bootstrap';

export interface ProductDetailsProps {
	product: ProductData;
	categories: CategoryData[];
}

export default function Component({
	product,
	categories,
}: Readonly<ProductDetailsProps>) {
	const { data } = useSession();

	return (
		<Fragment>
			{isAdmin(data) && (
				<Container>
					<div className='text-right pt-5'>
						<Link
							href={
								ROUTES.AdminProductsEdit(product.productId) +
								`?callbackUrl=${ROUTES.ProductDetails(
									product.productId,
								)}`
							}
							className='btn btn-primary'
						>
							ADMIN ONLY | Edit this Product
						</Link>
					</div>
				</Container>
			)}
			<ProductDetails productData={product} categoriesList={categories} />
		</Fragment>
	);
}
