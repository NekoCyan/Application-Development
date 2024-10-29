import { Document, HydratedDocument, Model } from 'mongoose';
import { DocumentResult } from './ExternalDocument';

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
	images: string[];
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
export interface IProductModel extends Model<IProduct, {}, IProductMethods> {}
export type ProductHydratedDocument = HydratedDocument<
	IProduct,
	IProductMethods
>;
