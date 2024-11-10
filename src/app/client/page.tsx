import HomeBanner from '@/components/banner/HomeBanner';
import HomeCategories from '@/components/categories/HomeCategories';
import Features from '@/components/features/Features';

export default function Page() {
	return (
		<div>
			<HomeBanner />
			<Features />
			<HomeCategories />
		</div>
	);
}
