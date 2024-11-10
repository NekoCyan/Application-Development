import Footer from '@/components/footer/Footer';
import Header from '@/components/header/Header';
import Navbar from '@/components/navbar/Navbar';

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div>
			<Header />
			<Navbar />
			{children}
			<Footer />
		</div>
	);
}
