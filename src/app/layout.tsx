import WarningEducational from '@/components/educational/WarningEducational';
import store from '@/redux/store';
import NextAuthProvider from '@/utils/nextAuth/NextAuthProvider';
import ReduxProvider from '@/utils/redux/ReduxProvider';
import '@fortawesome/fontawesome-free/css/all.min.css';
import type { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { Montserrat } from 'next/font/google';
import React from 'react';
import { Bounce, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './globals.css';
import LinkClickPreventer from './LinkClickPreventer';
import PopupButton from '@/components/popup/PopupButton';
import FacebookButton from '@/components/popup/Buttons/Facebook';

export const metadata: Metadata = {
	title: 'Ocean Interior',
	description:
		'An eCommerce website (template) is used for educational purposes',
	keywords:
		'ecommerce, interior commercial, template, shop, educational, educational purpose, dntu, ocean, assignment, interior',
};

const montserrat = Montserrat({
	subsets: ['latin'],
	weight: ['400', '500', '700'],
});

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const session = await getServerSession();

	return (
		<html lang='en'>
			<head>
				<meta httpEquiv='X-UA-Compatible' content='IE=edge' />
				<meta charSet='UTF-8' />
				<meta
					name='viewport'
					content='width=device-width, initial-scale=1.0'
				/>
				<link
					rel='shortcut icon'
					href='assets/img/favicon.ico'
					type='image/x-icon'
				/>

				<link
					href='https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Roboto:wght@400;500;700&display=swap'
					rel='stylesheet'
				/>
				<link rel='stylesheet' href='/assets/css/main.css' />

				<script src='/assets/js/jquery.min.js'></script>
				<script src='/assets/js/jquery.zoom.min.js'></script>
				<script src='/assets/js/nouislider.min.js'></script>
				<script src='/assets/js/bootstrap.min.js'></script>
				<script src='/assets/js/main.js'></script>
			</head>

			<body className={montserrat.className}>
				<ReduxProvider store={store}>
					<NextAuthProvider session={session}>
						<WarningEducational />
						{children}
						<WarningEducational />
					</NextAuthProvider>
					<ToastContainer
						position='top-right'
						autoClose={4000}
						hideProgressBar={false}
						theme='light'
						transition={Bounce}
						className='w-[200px] sm:w-[250px] lg:w-[300px] left-auto right-0 z-30'
						stacked={true}
					/>
					<PopupButton>
						<FacebookButton />
					</PopupButton>
				</ReduxProvider>
				<LinkClickPreventer />
			</body>
		</html>
	);
}
