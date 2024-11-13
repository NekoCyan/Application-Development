'use client';

import { IsAdminPath, ROUTES } from '@/utils';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Container } from 'react-bootstrap';

export default function Navbar() {
	const { data, status } = useSession();
	const path = usePathname();
	const arr: { name: string; href: string }[] = [];
	if (IsAdminPath(path)) {
		arr.push(
			{
				name: 'Orders',
				href: '/',
			},
			{
				name: 'Users',
				href: ROUTES.AdminUsers,
			},
			{
				name: 'Categories',
				href: ROUTES.AdminCategories,
			},
			{
				name: 'Products',
				href: ROUTES.AdminProducts,
			},
		);
	} else {
		// if not Admin Path.
		arr.push(
			{
				name: 'Home',
				href: ROUTES.Home,
			},
			{
				name: 'Shop',
				href: ROUTES.Products,
			},
			{
				name: 'About us',
				href: ROUTES.Educational,
			},
			{
				name: 'Contact us',
				href: '#',
			},
		);
	}

	return (
		<nav className='bg-gray-800'>
			<Container className='flex md:flex-row flex-col justify-between items-center'>
				<div className='flex flex-row gap-6 capitalize md:justify-start justify-around items-center'>
					{arr.map((x) => (
						<Link
							key={x.name}
							href={x.href}
							className='text-gray-200 hover:text-white transition py-5 block'
						>
							{x.name}
						</Link>
					))}
				</div>
				{status === 'authenticated' && (
					<div className='text-gray-200 hover:text-white transition-all md:py-5 pb-5'>
						Welcome, {data?.user?.fullName}!
					</div>
				)}
			</Container>
		</nav>
	);
}
