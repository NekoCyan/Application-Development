'use client';

import { isAdmin, ROUTES } from '@/utils';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { Fragment } from 'react';

export default function HeaderAccount() {
	const { data, status } = useSession();
	const isAuthenticated = status === 'authenticated';

	return (
		<Fragment>
			<Link
				href={isAuthenticated ? ROUTES.Profile : ROUTES.Auth}
				className='text-center text-gray-700 hover:text-primary transition relative'
			>
				<div className='text-2xl'>
					<i className='fa-regular fa-user'></i>
				</div>
				<div className='text-xs leading-3'>
					{isAuthenticated ? 'Profile' : 'Auth'}
				</div>
			</Link>
			{isAdmin(data) && (
				<Link
					href={ROUTES.Admin}
					className='text-center text-gray-700 hover:text-primary transition relative'
				>
					<div className='text-2xl'>
						<i className='fa-regular fa-user'></i>
					</div>
					<div className='text-xs leading-3'>Admin</div>
				</Link>
			)}
		</Fragment>
	);
}
