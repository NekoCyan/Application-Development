'use client';

import { ROUTES } from '@/utils';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Container } from 'react-bootstrap';

export default function Navbar() {
	const { data, status } = useSession();
	const path = usePathname();

	return (
		<nav className='bg-gray-800'>
			<Container className='flex md:flex-row flex-col justify-between items-center'>
				<div className='flex flex-row gap-6 capitalize md:justify-start justify-around items-center'>
					<Link
						href={ROUTES.Home}
						className='text-gray-200 hover:text-white transition py-5 block'
					>
						Home
					</Link>
					<Link
						href={ROUTES.Products}
						className='text-gray-200 hover:text-white transition py-5 block'
					>
						Shop
					</Link>
					<Link
						href={ROUTES.Educational}
						className='text-gray-200 hover:text-white transition py-5 block'
					>
						About us
					</Link>
					<Link
						href='#'
						className='text-gray-200 hover:text-white transition py-5 block'
					>
						Contact us
					</Link>
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
