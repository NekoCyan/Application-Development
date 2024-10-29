import HeaderAccount from './headerMiscs/HeaderAccount';
import HeaderCart from './headerMiscs/HeaderCart';
import HeaderWishlist from './headerMiscs/HeaderWishlist';

export default function HeaderMisc() {
	return (
		<div className='flex col-md-12 col-lg-3 gap-5 self-end md:self-center'>
			<HeaderWishlist />
			<HeaderCart />
			<HeaderAccount />
		</div>
	);
}
