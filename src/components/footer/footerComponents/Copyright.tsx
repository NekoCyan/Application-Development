import Image from 'next/image';
import { Container } from 'react-bootstrap';

export default function Copyright() {
	return (
		<div className='bg-gray-800 py-4'>
			<Container className='flex items-center justify-between'>
				<p className='text-white'>
					&copy; TailCommerce - All Right Reserved
				</p>
				<div>
					<Image
						src='/assets/img/methods.png'
						alt='methods'
						className='h-5'
						width={220}
						height={100}
					/>
				</div>
			</Container>
		</div>
	);
}
