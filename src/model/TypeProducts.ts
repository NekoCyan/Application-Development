import { Document, HydratedDocument, Model } from 'mongoose';
import { DocumentResult } from '@/database/interfaces/ExternalDocument';

// Information about the product
export interface InformationProductData {
  name: string;
  description: string;
  details: string;
  categoryIds: number[];
}

// Sale-related information
export interface SaleProductData {
  price: number;
  stock: number;
  sold: number;
  salePercentage: number;
}

// Common product data applicable to all products
export interface CommonProductData {
  productId: number;
  images: string[];
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Full product data combining all information
export type ProductData = InformationProductData &
  SaleProductData &
  CommonProductData;

// Product document extending Mongoose Document with product data and methods
export interface IProduct
  extends ProductData,
    DocumentResult<ProductData>,  // Include other fields if required from DocumentResult
    Document {}

// Define any custom methods for Product documents
export interface IProductMethods {}

// Mongoose model for Product with custom methods
export interface IProductModel extends Model<IProduct, {}, IProductMethods> {}

// Hydrated document type
export type ProductHydratedDocument = HydratedDocument<IProduct, IProductMethods>;


