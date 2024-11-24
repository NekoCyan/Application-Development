'use client';

import { ProductData } from '@/database/interfaces';
import { RehypeMarkdown } from '@/utils';
import { Container } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';
import RemarkGfm from 'remark-gfm';

export default function ProductDetailsInfo({
	props,
}: Readonly<{
	props: ProductData;
}>) {
	const { details } = props;

	return (
		<div className='pt-10'>
			<h3 className='text-2xl text-gray-800 mb-2'>
				Product details
			</h3>
			<ReactMarkdown
				remarkPlugins={[RemarkGfm, remarkBreaks]}
				components={{
					a: (props) => {
						return (
							<a href={props.href} target='_blank'>
								{props.children}
							</a>
						);
					},
				}}
				className='text-gray-600'
			>
				{RehypeMarkdown(details)}
			</ReactMarkdown>
		</div>
	);
}
