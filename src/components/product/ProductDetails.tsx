import { CategoryData, ProductData } from '@/database/interfaces';
import { Container } from 'react-bootstrap';
import ProductDetailsData from './productDetailsComponents/ProductDetailsData';
import ProductDetailsPreview from './productDetailsComponents/ProductDetailsPreview';
import ProductDetailsInfo from './productDetailsComponents/ProductDetailsInfo';
import ProductDetailsRelated from './productDetailsComponents/ProductDetailsRelated';

export default function ProductDetails({
	productData,
	categoriesList,
}: Readonly<{
	productData: ProductData;
	categoriesList: CategoryData[];
}>) {
	return (
		<Container className='pt-5'>
			<div className='grid md:grid-cols-3 grid-cols-1 gap-6'>
				<div className='md:col-span-1 col-span-1'>
					<ProductDetailsPreview images={productData.imageUrls} />
				</div>

				<div className='md:col-span-2 col-span-2'>
					<ProductDetailsData
						props={productData}
						categories={categoriesList}
					/>
				</div>
			</div>
			<ProductDetailsInfo props={productData} />
			<ProductDetailsRelated productData={productData} />
		</Container>
	);
}
