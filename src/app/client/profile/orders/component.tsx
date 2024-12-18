'use client';

import { IOrderModel } from '@/database/interfaces';
import Modal from '@/components/modal/Modal';
import { OrderIdToDate, ROUTES } from '@/utils';
import Link from 'next/link';
import { Fragment, useState } from 'react';
import { Container, Table } from 'react-bootstrap';

const breadcrumbNav = [
	{
		name: 'Profile',
		url: ROUTES.Profile,
	},
	{
		name: 'Orders',
		url: '#',
	},
];
export interface OrdersProps {
	orders: Awaited<ReturnType<IOrderModel['getOrdersIdFromUser']>>['list'];
	currentPage: number;
	totalPage: number;
}

export default function Component({
	orders,
	currentPage,
	totalPage,
}: Readonly<OrdersProps>) {
	const [cancel, setCancel] = useState({
		orderId: '',
		reason: '',
	});

	const handleCancel = (orderId: string, reason: string) => {
		setCancel({
			orderId,
			reason,
		});
	};
	const clearCancel = () => {
		handleCancel('', '');
	};

	return (
		<Fragment>
			<Container className='my-5'>
				<div className='py-5'>
					<h2 className='uppercase bold m-0'>Orders</h2>
				</div>

				<div className='overflow-x-auto mb-2 sm:mb-0'>
					<Table className='table-auto'>
						<thead>
							<tr>
								<th className='text-center'>#</th>
								<th className='text-center min-w-[250px]'>
									Order ID
								</th>
								<th className='text-left min-w-[350px] sm:w-full flex flex-col gap-2'>
									Quantity & Products Name
								</th>
								<th className='text-center'>Status</th>
							</tr>
						</thead>
						<tbody>
							{orders.map((data, index) => {
								return (
									<tr key={data.orderId}>
										<td
											width={'1%'}
											className='align-middle'
										>
											<div className='flex flex-col justify-center items-center'>
												{index + 1}
											</div>
										</td>
										<td
											width={'16%'}
											className='text-center'
										>
											<Link
												className='underline text-xl'
												href={ROUTES.OrderDetails(
													data.orderId,
												)}
											>
												{data.orderId}
											</Link>
											<br />
											<p className='mt-2 text-xs w-full'>
												{OrderIdToDate(data.orderId)}
											</p>
										</td>
										<td className='min-w-[250px] sm:w-full flex flex-col gap-2'>
											{data.products.map((product) => (
												<p
													key={product.productId}
													className='line-clamp-1'
												>
													<span className='font-bold'>
														x{product.quantity}
													</span>{' '}
													{product.name}
												</p>
											))}
										</td>
										<td className='text-center'>
											{!data.cancel ? (
												<div className='flex flex-col'>
													<span className='uppercase'>
														{data.status}
													</span>
													{data.status ===
														'pending' &&
														data.paymentMethod ===
															'paypal' && (
															<Link
																href={ROUTES.CheckoutPaypalId(
																	data.orderId,
																)}
																className='text-blue-500 uppercase hover:cursor-pointer underline'
															>
																Pay Now
															</Link>
														)}
												</div>
											) : (
												<Link
													href='#'
													className='text-red-500 uppercase hover:cursor-pointer underline'
													onClick={(e) => {
														e.preventDefault();
														handleCancel(
															data.orderId,
															data.cancel,
														);
													}}
												>
													Cancelled
												</Link>
											)}
										</td>
									</tr>
								);
							})}
						</tbody>
					</Table>
				</div>
			</Container>
			{!!cancel.orderId && (
				<Modal title='Product Cancelled' onClose={() => clearCancel()}>
					<h5>
						Your Order #{cancel.orderId} has been cancelled due to:
					</h5>
					<p>{cancel.reason}</p>
				</Modal>
			)}
		</Fragment>
	);
}
