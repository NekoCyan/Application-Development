import { ICartModel } from './_Cart';
import { ICategoryModel } from './_Category';
import { ICounterModel } from './_Counter';
import { IProductModel } from './_Product';
import { IUserModel } from './_User';
import { IWishlistModel } from './_Wishlist';

export type IModels =
	| ICounterModel
	| IUserModel
	| ICartModel
	| IWishlistModel
	| ICategoryModel
	| IProductModel;

export * from './_Cart';
export * from './_Category';
export * from './_Counter';
export * from './_Product';
export * from './_User';
export * from './_Wishlist';
