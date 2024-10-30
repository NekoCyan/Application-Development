import Footer from '@/components/footer/Footer';
import Header from '@/components/header/Header';

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div>
			<Header />
			{children}
			<Footer />
		</div>
	);
}
