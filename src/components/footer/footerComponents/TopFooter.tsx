import Image from 'next/image';
import Link from 'next/link';
import { Container } from 'react-bootstrap';

export default function TopFooter() {
	return (
		<footer className='bg-white pt-4 pb-4 border-t border-gray-100'>
			<Container className='grid grid-cols-1'>
				<div className='col-span-1 space-y-1 pb-3'>
					<Image
						src='assets/img/logo.svg'
						alt='logo'
						className='w-30'
						width={169}
						height={70}
					/>
					<div className='mr-2'>
						<p className='text-gray-500'>
							Lorem ipsum dolor sit amet consectetur adipisicing
							elit. Quia, hic?
						</p>
					</div>
					<div className='flex space-x-3'>
						<Link
							href='#'
							className='text-gray-400 hover:text-gray-500'
						>
							<i className='fa-brands fa-facebook-square'></i>
						</Link>
						<Link
							href='#'
							className='text-gray-400 hover:text-gray-500'
						>
							<i className='fa-brands fa-instagram-square'></i>
						</Link>
						<Link
							href='#'
							className='text-gray-400 hover:text-gray-500'
						>
							<i className='fa-brands fa-twitter-square'></i>
						</Link>
						<Link
							href='#'
							className='text-gray-400 hover:text-gray-500'
						>
							<i className='fa-brands fa-github-square'></i>
						</Link>
					</div>
				</div>

				<div className='col-span-2 grid grid-cols-2 gap-1'>
					<div className='grid grid-cols-2 gap-4 md:gap-8'>
						<div>
							<h3 className='text-sm font-semibold text-gray-400 uppercase tracking-wider'>
								Solutions
							</h3>
							<div className='mt-3 space-y-3'>
								<Link
									href='#'
									className='text-base text-gray-500 hover:text-gray-900 block'
								>
									Marketing
								</Link>
								<Link
									href='#'
									className='text-base text-gray-500 hover:text-gray-900 block'
								>
									Analitycs
								</Link>
								<Link
									href='#'
									className='text-base text-gray-500 hover:text-gray-900 block'
								>
									Commerce
								</Link>
								<Link
									href='#'
									className='text-base text-gray-500 hover:text-gray-900 block'
								>
									Insights
								</Link>
							</div>
						</div>

						<div>
							<h3 className='text-sm font-semibold text-gray-400 uppercase tracking-wider'>
								Support
							</h3>
							<div className='mt-3 space-y-3'>
								<Link
									href='#'
									className='text-base text-gray-500 hover:text-gray-900 block'
								>
									Pricing
								</Link>
								<Link
									href='#'
									className='text-base text-gray-500 hover:text-gray-900 block'
								>
									Guides
								</Link>
								<Link
									href='#'
									className='text-base text-gray-500 hover:text-gray-900 block'
								>
									API Status
								</Link>
							</div>
						</div>
					</div>
					<div className='grid grid-cols-2 gap-8'>
						<div>
							<h3 className='text-sm font-semibold text-gray-400 uppercase tracking-wider'>
								Solutions
							</h3>
							<div className='mt-3 space-y-3'>
								<Link
									href='#'
									className='text-base text-gray-500 hover:text-gray-900 block'
								>
									Marketing
								</Link>
								<Link
									href='#'
									className='text-base text-gray-500 hover:text-gray-900 block'
								>
									Analitycs
								</Link>
								<Link
									href='#'
									className='text-base text-gray-500 hover:text-gray-900 block'
								>
									Commerce
								</Link>
								<Link
									href='#'
									className='text-base text-gray-500 hover:text-gray-900 block'
								>
									Insights
								</Link>
							</div>
						</div>

						<div>
							<h3 className='text-sm font-semibold text-gray-400 uppercase tracking-wider'>
								Support
							</h3>
							<div className='mt-3 space-y-3'>
								<Link
									href='#'
									className='text-base text-gray-500 hover:text-gray-900 block'
								>
									Pricing
								</Link>
								<Link
									href='#'
									className='text-base text-gray-500 hover:text-gray-900 block'
								>
									Guides
								</Link>
								<Link
									href='#'
									className='text-base text-gray-500 hover:text-gray-900 block'
								>
									API Status
								</Link>
							</div>
						</div>
					</div>
				</div>
			</Container>
		</footer>
	);
}
