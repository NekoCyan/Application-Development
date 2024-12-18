import { CommaAnd, CreateEnum, Truncate } from './Utilities';

export const PAYMENT_METHOD = ['cod', 'paypal'];
export const ORDER_STATUS = ['pending', 'processing', 'shipping', 'delivered'];

export const REVALIDATE = {
	Product: 10,
	Category: 10,
	ProductSearch: 10,
	OrderSucceed: 2,
	OrderDetails: 2,
};

export const WEBSITE = {
	titleName: `Ocean Interior`,
	title: (sub_name: string) =>
		Truncate(`Ocean Interior | ${sub_name}`, LIMITER.HTML.title),
};

export const ROUTES = {
	// Home.
	Home: '/',
	Auth: '/auth',
	Educational: '/educational',

	// #region Profile.
	// Profile.
	Profile: '/profile',
	// Wishlist.
	Wishlist: '/profile/wishlist',
	// Orders.
	Orders: '/profile/orders',
	OrderDetails: (id: string) => `/profile/orders/details/${id}`,
	// #endregion

	// Cart.
	Cart: '/cart',
	// Checkout.
	Checkout: '/checkout',
	CheckoutPaypalId: (id: string) => `/checkout/paypal/${id}`,
	CheckoutPaypalIdSucceed: (id: string) => `/checkout/paypal/${id}/succeed`,
	CheckoutPaypalIdCancelled: (id: string) =>
		`/checkout/paypal/${id}/cancelled`,
	ThankYou: '/checkout/succeed',
	// Produts.
	Products: '/products',
	/**
	 * @param id Product ID
	 * @param withBreakcrumb Default is true
	 * @returns
	 */
	ProductDetails: (id: string | number) => `/product-details/${id}`,
	ProductFindByCategories: (category: string[]) => `/products?filterByCategories=${category.join(',')}`,
	// Admin.
	Admin: '/admin',
	AdminOrders: '/admin',
	AdminUsers: '/admin/users',
	AdminCategories: '/admin/categories',
	AdminProducts: '/admin/products',
	AdminProductsNew: '/admin/products/new',
	AdminProductsEdit: (id: string | number) => `/admin/products/${id}/edit`,
	AdminProductsPreview: (id: string | number) =>
		`/admin/products/${id}/preview`,
};

export const API = {
	// Categories.
	CategoriesList: '/api/categories',
	CategoriesNew: '/api/categories',
	CategoriesEdit: (id: string | number) => `/api/categories/${id}`,
	CategoriesDelete: (id: string | number) => `/api/categories/${id}`,
	// Products.
	ProductsList: '/api/products',
	ProductListIds: '/api/products/wishlist',
	ProductsNew: '/api/products',
	ProductsGet: (id: string | number) => `/api/products/${id}`,
	ProductsEdit: (id: string | number) => `/api/products/${id}`,
	ProductsDelete: (id: string | number) => `/api/products/${id}`,
	// Carts.
	CartList: '/api/cart',
	CartInsert: '/api/cart',
	CartUpdate: '/api/cart',
	CartPreview: '/api/cart/preview',
	CartCount: '/api/cart/count',
	// Checkout.
	Checkout: '/api/checkout',
	// Order.
	OrdersList: '/api/orders',
	OrderSucceed: '/api/orders/succeed',
	OrderDetails: (id: string) => `/api/orders/${id}`,
	OrderPaypalGenerate: `/api/orders/paypal-generate`,
	OrderPaypalCapture: `/api/orders/paypal-capture`,
	// Wishlist.
	Wishlist: '/api/wishlist',
};

export const TAGS = {
	Cart: 'cart',
};

export const LIMITER = {
	HTML: {
		title: 63, // Less than 64.
	},
	Cart: {
		ProductName: 50,
	},
};

export const HTTPStatusCode = {
	OK: 200,
	BAD_REQUEST: 400,
	UNAUTHORIZED: 401,
	FORBIDDEN: 403,
	NOT_FOUND: 404,
	CONFLICT: 409,
	GONE: 410,
	UNPROCESSABLE_ENTITY: 422,
	INTERNAL_SERVER_ERROR: 500,
	SERVICE_UNAVAILABLE: 503,
};

export const PATTERN = {
	USERNAME: /[a-zA-Z0-9_.]+/, // DEPRECATED.
	EMAIL: /^[a-zA-Z0-9_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	PASSWORD: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
};

export const SYMBOLS = {
	EMAIL: '@',
	EN_DASH: '–',
	EM_DASH: '—',
};

export const ROLES = CreateEnum({
	USER: 0,
	TRAINER: 1,
	ADMIN: 2,
});

export const GENDER = CreateEnum({ UNKNOWN: -1, FEMALE: 0, MALE: 1 });

export const TRANSACTION_STATUS = CreateEnum({
	PENDING: 0,
	SUCCEED: 1,
	FAILED: 2,
	CANCELLED: 3,
});

export const TRANSACTION_TYPE = CreateEnum({
	MEMBERSHIP: 0,
	PRODUCT: 1,
});

export const ResponseText = {
	// API Response.
	InvalidAPIRequest: `Invalid API request.`,

	// System Response.
	Invalid: (variable: string) => {
		return `${variable} is invalid.`;
	},
	InvalidDeduction: (
		variable: string,
		min: number,
		currentNumber: number,
		inputNumber: number,
	) => {
		return `Invalid deduction for ${variable} (Min is ${min}, but given input was ${inputNumber}, while current is ${currentNumber}).`;
	},
	InvalidType: (variable: string, ...allowTypes: string[]) => {
		let errorMessage = `Invalid type of ${variable}`;
		if (allowTypes) {
			errorMessage += ` (Only accept(s) ${CommaAnd(allowTypes)})`;
		}
		errorMessage += '.';

		return errorMessage;
	},
	InvalidPageNumber: (page: number) => {
		return `Invalid page number ${page}.`;
	},
	Min: (variable: string, min: number) => {
		return `${variable} cannot be less than ${min}.`;
	},
	MinOrEqual: (variable: string, min: number) => {
		return `${variable} cannot be less than or equal to ${min}.`;
	},
	Max: (variable: string, max: number) => {
		return `${variable} cannot be more than ${max}.`;
	},
	MaxOrEqual: (variable: string, max: number) => {
		return `${variable} cannot be more than or equal to ${max}.`;
	},
	MinLength: (variable: string, minLength: number) => {
		return `${variable} cannot be less than ${minLength} characters.`;
	},
	MaxLength: (variable: string, maxLength: number) => {
		return `${variable} cannot be more than ${maxLength} characters.`;
	},
	DecimalNotAllowed: (variable: string) => {
		return `${variable} does not allow decimal.`;
	},
	OutOfRange: (variable: string, from: number, to: number) => {
		return `Invalid range of ${variable} (Only accept from ${from} to ${to}).`;
	},
	AlreadyExists: (variable: string) => {
		return `${variable} is already exists.`;
	},
	NotExists: (variable: string) => {
		return `${variable} does not exists.`;
	},
	NotMatch: (variable: string) => {
		return `${variable} does not match.`;
	},
	NotFound: (variable: string) => {
		return `${variable} is not found.`;
	},
	Required: (variable: string) => {
		return `${variable} is required.`;
	},
	TooWeak: (variable: string) => {
		return `${variable} is too weak.`;
	},
	BadRequest: `Bad Request.`,
	NoPermission: `You do not have permission to access this resource.`,
	Unauthorized: `Unauthorized.`,
	InsufficientBalance: `Insufficient balance.`,
	InvalidEmailOrPassword: `Invalid email or password.`,
	DataIsMissing: `Data is missing.`,

	// Custom
	CategoriesValidationFailed: `Categories validation failed, please refresh categories for new data.`,
	ProductIdsValidationFailed: `Product ids validation failed, please refresh products for new data.`,
	SomethingWentWrong: `Something went wrong... Please try again or contact website owner for more informations.`,
};
