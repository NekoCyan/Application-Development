import { ROUTES } from '@/utils';
import Image from 'next/image';
import Link from 'next/link';
import { Container } from 'react-bootstrap';

export default function HomeAds() {
	return (
		<Container className='pb-8'>
			<Link href={ROUTES.Products}>
				<Image
					src='/assets/img/offer.jpg'
					alt='ads'
					className='w-full cursor-pointer'
					width={1920}
					height={400}
				/>
			</Link>
		</Container>
	);
}
