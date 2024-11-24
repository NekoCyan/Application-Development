import { Document, HydratedDocument, Model } from 'mongoose';
import { DocumentResult, PageList } from './ExternalDocument';

export interface InformationProductData {
	name: string;
	/**
	 * Short description of the product.
	 */
	description: string;
	/**
	 * Long details of the product (includes fully about its).
	 */
	details: string;
	categoryIds: number[];
}
export interface SaleProductData {
	price: number;
	stock: number;
	sold: number;
	/**
	 * 0 to 100.
	 */
	salePercentage: number;
}
export interface CommonProductData {
	productId: number;
	imageUrls: string[];
	/**
	 * If false, the product will not be shown
	 * in the website.
	 */
	status: boolean;

	createdAt: Date;
	updatedAt: Date;
}
export type ProductData = InformationProductData &
	SaleProductData &
	CommonProductData;
export interface IProduct
	extends ProductData,
		DocumentResult<ProductData>,
		Document {}
export interface IProductMethods {}
export interface IProductModel extends Model<IProduct, {}, IProductMethods> {
	isValidProductName(name: string): Promise<boolean>;
	getProduct(productId: number): Promise<ProductData>;
	createProduct(
		data: Omit<
			Partial<ProductData> & Pick<ProductData, 'name'>,
			'productId'
		>,
	): Promise<ProductHydratedDocument>;
	editProduct(
		productId: number,
		data: Omit<Partial<ProductData>, 'productId'>,
	): Promise<ProductData>;
	deleteProduct(productId: number): Promise<ProductData>;
	getProductList(
		limit?: string | number,
		page?: string | number,
		filter?: {
			name?: string;
			price?: {
				from: number;
				to: number;
			};
			inStock?: boolean;
			category?: {
				Ids: number[];
				Type: 'AND' | 'OR';
			};
			excludeProductIds?: number[];
			/**
			 * * -1: All.
			 * * 0: Inactive.
			 * * 1: Active.
			 */
			status?: -1 | 0 | 1;
		},
	): Promise<PageList<ProductData>>;
}
export type ProductHydratedDocument = HydratedDocument<
	IProduct,
	IProductMethods
>;
