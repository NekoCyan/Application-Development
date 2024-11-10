import Image from 'next/image';
import Link from 'next/link';
import { Container } from 'react-bootstrap';

export default function HomeCategories() {
	return (
		<Container className='container pb-8'>
			<h2 className='text-2xl font-medium text-gray-800 uppercase mb-2'>
				shop by category
			</h2>
			<div className='grid grid-cols-3 gap-3'>
				<div className='relative rounded-sm overflow-hidden group'>
					<Image
						src='/assets/img/category/category-1.jpg'
						alt='category 1'
						className='w-full'
						width={400}
						height={400}
					/>
					<Link
						href='#'
						className='absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-xl text-white font-roboto font-medium group-hover:bg-opacity-60 transition'
					>
						Bedroom
					</Link>
				</div>
				<div className='relative rounded-sm overflow-hidden group'>
					<Image
						src='/assets/img/category/category-2.jpg'
						alt='category 1'
						className='w-full'
						width={400}
						height={400}
					/>
					<Link
						href='#'
						className='absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-xl text-white font-roboto font-medium group-hover:bg-opacity-60 transition'
					>
						Mattrass
					</Link>
				</div>
				<div className='relative rounded-sm overflow-hidden group'>
					<Image
						src='/assets/img/category/category-3.jpg'
						alt='category 1'
						className='w-full'
						width={400}
						height={400}
					/>
					<Link
						href='#'
						className='absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-xl text-white font-roboto font-medium group-hover:bg-opacity-60 transition'
					>
						Outdoor
					</Link>
				</div>
				<div className='relative rounded-sm overflow-hidden group'>
					<Image
						src='/assets/img/category/category-4.jpg'
						alt='category 1'
						className='w-full'
						width={400}
						height={400}
					/>
					<Link
						href='#'
						className='absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-xl text-white font-roboto font-medium group-hover:bg-opacity-60 transition'
					>
						Sofa
					</Link>
				</div>
				<div className='relative rounded-sm overflow-hidden group'>
					<Image
						src='/assets/img/category/category-5.jpg'
						alt='category 1'
						className='w-full'
						width={400}
						height={400}
					/>
					<Link
						href='#'
						className='absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-xl text-white font-roboto font-medium group-hover:bg-opacity-60 transition'
					>
						Living Room
					</Link>
				</div>
				<div className='relative rounded-sm overflow-hidden group'>
					<Image
						src='/assets/img/category/category-6.jpg'
						alt='category 1'
						className='w-full'
						width={400}
						height={400}
					/>
					<Link
						href='#'
						className='absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-xl text-white font-roboto font-medium group-hover:bg-opacity-60 transition'
					>
						Kitchen
					</Link>
				</div>
			</div>
		</Container>
	);
}
