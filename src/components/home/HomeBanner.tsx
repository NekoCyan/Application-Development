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
					Lorem, ipsum dolor sit amet consectetur adipisicing elit.
					Aperiam <br />
					accusantium perspiciatis, sapiente magni eos dolorum ex quos
					dolores odio
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
