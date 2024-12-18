import { NextRequest, NextResponse } from 'next/server';
import { BadRequestResponse, MiddlewareSession, ROUTES } from './utils';

const routePrefix = '/client';
const loginToAccess = ['/profile', '/checkout'];
const adminRoutePrefix = '/admin';
const adminAccess = [''];

const originsToAppend = [
	...new Set([
		'http://localhost:3000',
		'http://interior.nekoharu.com',
		'https://ocean-interior.vercel.app',
	]),
];

export async function middleware(req: NextRequest) {
	try {
		if (
			['POST', 'PUT', 'PATCH'].some((x) => x === req.method) &&
			!req.nextUrl.pathname.startsWith('/api/auth/')
		) {
			const reqText = await req.text();
			if (reqText.trim()) JSON.parse(reqText.trim());
			else throw new Error(`${req.method} must have body.`);
		}
	} catch (e) {
		return BadRequestResponse();
	}

	const pathName = req.nextUrl.pathname.toLowerCase();
	// Idk why this is not working
	// const session = await getSession();

	const session = await MiddlewareSession(req);
	if (
		// In case no session.
		!session &&
		// Group all routes that require login.
		(loginToAccess.some((x) => pathName.startsWith(routePrefix + x)) ||
			// Group all admin routes.
			pathName === adminRoutePrefix ||
			adminAccess.some((x) => pathName.startsWith(adminRoutePrefix + x)))
	) {
		const callbacks = new URL(ROUTES.Auth, req.nextUrl.origin);
		callbacks.searchParams.set('callbackUrl', req.nextUrl.href);
		callbacks.searchParams.set('refresh', 'true');

		return NextResponse.redirect(callbacks);
	}

	if (
		// In case trying to access admin routes without admin role.
		session?.user?.role !== 'ADMIN' &&
		// Group all admin routes.
		(pathName === adminRoutePrefix ||
			adminAccess.some((x) => pathName.startsWith(adminRoutePrefix + x)))
	) {
		return NextResponse.redirect(new URL('', req.nextUrl.origin));
	}

	let headers: any = {};

	const origin = req.headers.get('origin');
	if (origin && originsToAppend.includes(origin)) {
		headers['Access-Control-Allow-Origin'] = origin;
	}

	return NextResponse.next({ headers });
}

export const config = {
	matcher: [
		/* https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
		 * Match all request paths except for the ones starting with:
		 * - api (API routes)
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 */
		'/((?!_next/static|_next/image|favicon.ico|img/*|assets/*).*)',
		'/client/profile/:path*',
		'/admin/:path*',
		'/api/:path*',
	],
};
