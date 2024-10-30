import { Fragment } from 'react';
import Copyright from './footerComponents/Copyright';
import TopFooter from './footerComponents/TopFooter';

export default function Footer() {
	return (
		<Fragment>
			<TopFooter />
			<Copyright />
		</Fragment>
	);
}
