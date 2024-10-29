import { Container } from 'react-bootstrap';
import HeaderLogo from './headerComponents/HeaderLogo';
import HeaderSearch from './headerComponents/HeaderSearch';
import HeaderMisc from './headerComponents/HeaderMisc';

type HeaderProps = {
	excluded?: Array<'logo' | 'search' | 'misc'>;
	miscExcluded?: Array<'wishlist' | 'cart' | 'menu'>;
	logoNavHref?: string;
};

export default function Header(
	{ excluded, logoNavHref, miscExcluded }: Readonly<HeaderProps> = {
		excluded: [],
	},
) {
	return (
		<header className='py-4 shadow-sm bg-white'>
			<Container className='flex justify-around flex-col md:flex-row gap-4'>
				<HeaderLogo />
				<HeaderSearch />
				<HeaderMisc />
			</Container>
		</header>
	);
}
