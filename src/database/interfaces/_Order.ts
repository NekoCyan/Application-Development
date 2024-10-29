import { Document, HydratedDocument, Model } from 'mongoose';
import { DocumentResult } from './ExternalDocument';
import { ProductData } from './_Product';

export interface OrderData {
	/**
	 * Discord snowflake will included created timestamp.
	 */
	orderId: string;
	userId: number;
	products: (Pick<
		ProductData,
		'productId' | 'name' | 'price' | 'salePercentage' | 'images'
	> & {
		quantity: number;
	})[];
	shipDetails: {
		fullName: string;
		email: string;
		phone: string;

		address: string;
		country: string;
		city: string;
		zip: string;

		note: string;
	};
	paymentMethod: 'cod' | 'paypal';
	/**
	 * pending - waiting for payment.
	 * processing - payment received / confirmed by Shop, waiting for shipping.
	 * shipping - product is on the way.
	 * delivered - product is delivered.
	 */
	status: 'pending' | 'processing' | 'shipping' | 'delivered';
	statusUpdatedAt: Date;
	/**
	 * If string is NOT empty string, then this cancel is reason.
	 */
	cancel: string;
	// Third party payment data.
	paypal: {
		paymentId: string;
		expireAt: Date;
		url: string;
	};
}
export interface IOrder
	extends OrderData,
		DocumentResult<OrderData>,
		Document {}
export interface IOrderMethods {}
export interface IOrderModel extends Model<IOrder, {}, IOrderMethods> {}
export type OrderHydratedDocument = HydratedDocument<IOrder, IOrderMethods>;
