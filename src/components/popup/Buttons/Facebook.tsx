'use client';

import Image from 'next/image';
import style from '../style.module.css';
import { MultiStyles } from '@/utils';

export default function FacebookButton() {
	return (
		<button
            className={MultiStyles(style['chat-button'], style['facebook-button'])}
            onClick={() => {
                window.open('https://m.me/100009569683989', '_blank');
            }}
		>
			<Image
				src='https://www.facebook.com/images/fb_icon_325x325.png'
                alt='Facebook Logo'
                width={30}
                height={30}
                className='w-full'
			/>
		</button>
	);
}
