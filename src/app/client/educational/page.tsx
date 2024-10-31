import { WEBSITE } from '@/utils';
import { Metadata } from 'next';
import Link from 'next/link';
import { Container } from 'react-bootstrap';

export const metadata: Metadata = {
	title: WEBSITE.title('Educational'),
};

export default function Page() {
	return (
		<Container className='py-7 px-10'>
			<h1>Interior Commercial</h1>
			<i>
				End-of-course assignment of Application Development in DNTU (
				<Link
					href='https://canvas.dntu.edu.vn/courses/2867'
					target='_blank'
					className='link'
				>
					0370206 - K17
				</Link>
				).
			</i>
			<br />
			<br />
			<strong>Lecturer:</strong> Phạm Đình Sắc
			<br />
			<strong>Ocean's members:</strong>
			<ul>
				<li>
					• 1721030861 | Vũ Quốc Bảo (Front-End, Back-End, Database).
				</li>
				<li>• 1721030593 | Nguyễn Thanh Hải (Database less, Word, PPtx).</li>
				<li>• 1721030651 | Vũ Đình Lâm (Back-End).</li>
			</ul>
			<hr />
			<div className='py-5'>
				<Link
					href='https://github.com/NekoCyan/Application-Development'
					target='_blank'
					className='link'
				>
					CLICK HERE TO OPEN NEW TAB TO WEBSITE'S GITHUB PAGE.
				</Link>
			</div>
			<hr />
			<h3 className='pt-2'>Template Credits</h3>
			<div>
				<Link
					href='https://github.com/fajar7xx/ecommerce-template-tailwind-1'
					target='_blank'
					className='link'
				>
					Ecommerce template using tailwindcss 3 in 2022
				</Link>{' '}
				(template for this project).
			</div>
			<div>
				<Link
					href='https://github.com/anhsirk0/slider-login-signup'
					target='_blank'
					className='link'
				>
					Login Signup form with slider animation
				</Link>{' '}
				(login / register form).
			</div>
		</Container>
	);
}
