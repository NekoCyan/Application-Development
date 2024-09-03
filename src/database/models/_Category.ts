import { Document, HydratedDocument } from 'mongoose';
import { DocumentResult } from './ExternalDocument';

export interface CategoryData {
	categoryId: number;
	name: string;
	description: string;
	image: string;
}
export interface ICategory
	extends CategoryData,
		DocumentResult<CategoryData>,
		Document {}
export interface ICategoryMethods {}
export type CategoryHydratedDocument = HydratedDocument<
	ICategory,
	ICategoryMethods
>;
