import HomeAds from '@/components/home/HomeAds';
import HomeBanner from '@/components/home/HomeBanner';
import HomeCategories from '@/components/home/HomeCategories';
import HomeFeatures from '@/components/home/HomeFeatures';
import HomeTopArrival from '@/components/home/HomeTopArrival';

export default function Page() {
	return (
		<div>
			<HomeBanner />
			<HomeFeatures />
			<HomeTopArrival />
			<HomeCategories />
			<HomeAds />
		</div>
	);
}
