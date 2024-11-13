import Footer from '@/components/footer/Footer';
import Header from '@/components/header/Header';
import Navbar from '@/components/navbar/Navbar';
import { ROUTES, WEBSITE } from '@/utils';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Container } from 'react-bootstrap';

export const metadata: Metadata = {
	title: WEBSITE.title(`Not found`),
};

export default function NotFound() {
	return (
		<div>
			<Header />
			<Navbar />
			<Container className='flex flex-col text-center items-center gap-2 py-5'>
				<h2>404 - Not Found</h2>
				<Image
					src='/assets/img/404.jpg'
					alt='404'
					width={300}
					height={300}
				/>
				<p>Sorry, the resource does not exist</p>
				<h3>
					<Link href={ROUTES.Admin} className='link'>
						Back to Admin
					</Link>
				</h3>
			</Container>
			<Footer />
		</div>
	);
}
