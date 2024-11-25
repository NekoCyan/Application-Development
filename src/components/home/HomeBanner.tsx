import Link from 'next/link';
import { Container } from 'react-bootstrap';

export default function HomeBanner() {
	return (
		<div
			className='bg-cover bg-no-repeat bg-center py-20'
			style={{
				backgroundImage: `url('/assets/img/banner-bg.jpg')`,
			}}
		>
			<Container className='container'>
				<h2 className='text-4xl text-gray-700 font-bold mb-4 capitalize'>
					best collection for <br /> home decoration
				</h2>
				<p>
					Discover furniture that redefines comfort and sophistication
					<br />
					Create the perfect home with timeless designs, crafted for modern living
				</p>
				<div className='mt-12'>
					<Link
						href='/products'
						className='bg-primary border border-primary text-white px-8 py-3 font-medium 
                    rounded-md hover:bg-transparent hover:text-primary'
					>
						Shop Now
					</Link>
				</div>
			</Container>
		</div>
	);
}
