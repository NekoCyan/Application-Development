'use client';

import { MultiStyles } from '@/utils';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Slider, { Settings } from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

type ProductDetailsPreviewProps = {
	images: string[];
};

export default function ProductDetailsPreview({
	images,
}: Readonly<ProductDetailsPreviewProps>) {
	const [imagesState, setImagesState] = useState<string[]>([]);
	const [selectedImage, setSelectedImage] = useState(imagesState[0]);

	useEffect(() => {
		const newImages = new Array<string>();
		newImages.push(...images);

		setImagesState(newImages);
		setSelectedImage(newImages[0]);
	}, []);

	const thumbnailSettings: Readonly<Settings> = {
		slidesToScroll: 1,
		infinite: false,
		arrows: true,
		focusOnSelect: true,
		// afterChange: (index: number) => setSelectedImage(imagesState[index]), // Update main image
	};

	return (
		<div>
			{/* Main Image */}
			<div className='mb-4'>
				<Image
					src={selectedImage}
					alt='Selected Product'
					width={500}
					height={500}
					className='w-full border border-gray-300'
				/>
			</div>

			{/* Thumbnail Slider */}
			<Slider
				{...thumbnailSettings}
				slidesToShow={
					imagesState.length > 4 || imagesState.length === 1
						? 4
						: imagesState.length
				}
				className='w-full'
			>
				{imagesState.map((image, index) => (
					<div key={index} className='px-2'>
						<Image
							src={image}
							alt={`Thumbnail ${index}`}
							width={100}
							height={100}
							className={MultiStyles(
								'w-full h-full object-cover cursor-pointer border rounded-md hover:border-red-600',
								selectedImage === image && 'border-red-300',
							)}
							onClick={() => setSelectedImage(image)} // Update state on click
						/>
					</div>
				))}
			</Slider>
		</div>
	);
}
