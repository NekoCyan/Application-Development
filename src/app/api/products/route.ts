import Product from '@/database/Product';
import { ProductData } from '@/database/interfaces';
import {
	CategoriesValidationFailedResponse,
	ErrorResponse,
	InvalidResponse,
	IsNullOrUndefined,
	ProductIdsValidationFailedResponse,
	RequiredResponse,
	Response,
	SearchParamsToObject,
	betweenResolveable,
} from '@/utils';
import { BEHandler, isAdmin } from '@/utils/BackendUtils';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
	try {
		let {
			name,
			price,
			inStock,
			newest,
			shuffle,
			limit,
			page,
			filterByCategories,
			filterByCategoriesType,
			excludeProductIds,
			status,
		} = SearchParamsToObject<{
			// Product name
			name: string;
			// Price range (from-to format)
			price: string;
			// Is stock in stock (Just pass any value to enable this filter)
			inStock: string;
			// Filter to get newest products (Just pass any value to enable this filter)
			newest: string;
			// Random/Shuffle products (Just pass any value to enable this filter)
			shuffle: string;
			// Limit of products to get (Pass -1 to get all products)
			limit: string;
			// Page number
			page: string;
			// Filter by categories (Comma separated category ids)
			filterByCategories: string;
			// Filter by categories type (like AND for included or OR)
			filterByCategoriesType: string;
			// Exclude product ids (Comma separated product ids)
			excludeProductIds: string;
			status: string;
		}>(req.nextUrl.searchParams);

		const session = await BEHandler({ req, sessionRequired: false });
		if (!isAdmin(session) && limit === '-1') {
			limit = undefined;
		}

		let filter: any = {};

		if (name) filter.name = name;
		if (price) {
			const { from, to } = betweenResolveable(price);
			if (from <= 0 || !to || to <= 0 || from > to)
				return InvalidResponse('price');
			filter.price = {
				from: Number(from.toFixed(2)),
				to: Number(to.toFixed(2)),
			};
		}
		if (!IsNullOrUndefined(inStock)) {
			filter.inStock = true;
		}
		if (!IsNullOrUndefined(newest)) {
			filter.newest = true;
		}
		if (!IsNullOrUndefined(shuffle)) {
			if (shuffle === 'after') filter.shuffle = 'after';
			else filter.shuffle = '';
		}
		if (filterByCategories) {
			const validateCategoriesNumber = filterByCategories
				?.split(',')
				.map((v) => v.trim())
				.every(
					(v) =>
						!isNaN(parseInt(v)) && // Check if the value is a number.
						!v.includes('.'), // Check if the value is not a float number.
				);
			if (!validateCategoriesNumber)
				return CategoriesValidationFailedResponse();

			if (!filterByCategoriesType) filterByCategoriesType = 'AND';

			filter.category = {
				Ids: filterByCategories
					.split(',')
					.map((v) => parseInt(v.trim())),
				Type: filterByCategoriesType as 'AND' | 'OR',
			};
		}

		if (excludeProductIds) {
			const validateProductIdsNumber = excludeProductIds
				?.split(',')
				.map((v) => v.trim())
				.every(
					(v) =>
						!isNaN(parseInt(v)) && // Check if the value is a number.
						!v.includes('.'), // Check if the value is not a float number.
				);
			if (!validateProductIdsNumber)
				return ProductIdsValidationFailedResponse();

			filter.excludeProductIds = excludeProductIds
				.split(',')
				.map((v) => parseInt(v.trim()));
		}
		if (status) {
			// Block user to get inactive products.
			if (!isAdmin(session)) filter.status = 1;
			else if (status === '0') filter.status = 0;
			else if (status === '1') filter.status = 1;
			else filter.status = -1;
		} else {
			filter.status = 1;
		}

		const productList = await Product.getProductList(limit, page, filter);
		const { list, currentPage, totalPage } = productList;

		return Response({
			list: list.map((x) => ({
				productId: x.productId,
				categoryIds: x.categoryIds,
				name: x.name,
				description: x.description,
				details: x.details,
				price: x.price,
				stock: x.stock,
				sold: x.sold,
				salePercentage: x.salePercentage,
				imageUrls: x.imageUrls,
				status: x.status,
			})),
			currentPage,
			totalPage,
		});
	} catch (e: any) {
		return ErrorResponse(e);
	}
}

export async function POST(req: NextRequest) {
	try {
		await BEHandler({ req, adminRequired: true });

		const body: Partial<
			Pick<
				ProductData,
				| 'name'
				| 'description'
				| 'details'
				| 'price'
				| 'stock'
				| 'sold'
				| 'salePercentage'
				| 'imageUrls'
				| 'categoryIds'
				| 'status'
			>
		> = await req.json();
		let {
			name,
			description,
			details,
			price,
			stock,
			sold,
			salePercentage,
			imageUrls,
			categoryIds,
			status,
		} = body;

		let obj: any = {};

		if (IsNullOrUndefined(name)) return RequiredResponse('name');
		if (!IsNullOrUndefined(description)) {
			obj.description = description?.toString().trim();
		}
		if (!IsNullOrUndefined(details)) {
			obj.details = details?.toString().trim();
		}
		if (!IsNullOrUndefined(price)) {
			obj.price = price;
		}
		if (!IsNullOrUndefined(stock)) {
			obj.stock = stock;
		}
		if (!IsNullOrUndefined(sold)) {
			obj.sold = sold;
		}
		if (!IsNullOrUndefined(salePercentage)) {
			obj.salePercentage = salePercentage;
		}
		if (!IsNullOrUndefined(imageUrls)) {
			if (!Array.isArray(imageUrls)) return InvalidResponse('imageUrls');
			obj.imageUrls = imageUrls;
		}
		if (!IsNullOrUndefined(categoryIds)) {
			if (!Array.isArray(categoryIds))
				return InvalidResponse('categoryIds');
			obj.categoryIds = categoryIds;
		}
		if (!IsNullOrUndefined(status)) {
			obj.status = status;
		}

		const product = await Product.createProduct({
			name: name?.trim() as string,
			...obj,
		});
		let { productId } = product;

		return Response({ productId });
	} catch (e: any) {
		return ErrorResponse(e);
	}
}
