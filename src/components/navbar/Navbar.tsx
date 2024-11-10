'use client';

import { ROUTES } from '@/utils';
import Link from 'next/link';
import { Container } from 'react-bootstrap';

export default function Navbar() {
	return (
		<nav className='bg-gray-800'>
			<Container className='flex flex-row space-x-6 capitalize py-5 md:justify-start justify-around'>
				<Link
					href={ROUTES.Home}
					className='text-gray-200 hover:text-white transition'
				>
					Home
				</Link>
				<Link
					href={ROUTES.Products}
					className='text-gray-200 hover:text-white transition'
				>
					Shop
				</Link>
				<Link
					href='#'
					className='text-gray-200 hover:text-white transition'
				>
					About us
				</Link>
				<Link
					href='#'
					className='text-gray-200 hover:text-white transition'
				>
					Contact us
				</Link>
			</Container>
		</nav>
	);
}
