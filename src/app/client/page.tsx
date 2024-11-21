import HomeAds from '@/components/home/HomeAds';
import HomeBanner from '@/components/home/HomeBanner';
import HomeCategories from '@/components/home/HomeCategories';
import HomeFeatures from '@/components/home/HomeFeatures';
import HomeRecommended from '@/components/home/HomeRecommend';
import HomeTopArrival from '@/components/home/HomeTopArrival';
import { Fragment } from 'react';

export default function Page() {
	return (
		<Fragment>
			<HomeBanner />
			<HomeFeatures />
			<HomeTopArrival />
			<HomeCategories />
			<HomeAds />
			<HomeRecommended />
		</Fragment>
	);
}
