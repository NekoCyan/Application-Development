import Image from 'next/image';
import Link from 'next/link';

type HeaderLogoProps = {
	isDisabled?: boolean;
	logoNavHref?: string;
};

export default function HeaderLogo(
	{ isDisabled, logoNavHref }: Readonly<HeaderLogoProps> = {
		logoNavHref: '/',
	},
) {
	logoNavHref = logoNavHref ?? '/';

	return (
		<div className='col-md-12 col-lg-3 self-center'>
			{!isDisabled && (
				<Link href={logoNavHref}>
					<Image
						src='/assets/img/logo.svg'
						alt='logo'
						width={169}
						height={70}
					/>
				</Link>
			)}
		</div>
	);
}
