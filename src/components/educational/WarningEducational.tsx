import { MultiStyles, ROUTES } from '@/utils';
import Link from 'next/link';
import styles from './WarningEducational.module.css';

export default function WarningEducational() {
	return (
		<h6
			className={MultiStyles(
				styles.warning,
				styles.rainbow,
				'text-center text-black font-bold',
			)}
		>
			Frequently reminder: This website is just using for{' '}
			<u>
				<Link className='link' href={ROUTES.Educational}>EDUCATIONAL PURPOSE</Link>
			</u>
			, not for Commercial.
		</h6>
	);
}
