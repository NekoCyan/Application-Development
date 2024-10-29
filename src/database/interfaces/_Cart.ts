import { Document, HydratedDocument, Model } from 'mongoose';
import { DocumentResult } from './ExternalDocument';

export interface CartData {
	userId: number;
	data: {
		productId: number;
		quantity: number;
	}[];
}
export interface ICart extends CartData, DocumentResult<CartData>, Document {}
export interface ICartMethods {}
export interface ICartModel extends Model<ICart, {}, ICartMethods> {}
export type CartHydratedDocument = HydratedDocument<ICart, ICartMethods>;
