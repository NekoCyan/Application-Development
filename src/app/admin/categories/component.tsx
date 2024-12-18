'use client';

import Modal from '@/components/modal/Modal';
import { CategoryData } from '@/database/interfaces';
import { PageList } from '@/database/interfaces/ExternalDocument';
import { APIResponse, PageProps } from '@/types';
import { API } from '@/utils';
import { DELETE, POST, PUT } from '@/utils/Request';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Fragment, useEffect, useState } from 'react';
import { Container, Row, Table } from 'react-bootstrap';
import styles from './categories.module.css';

export default function Component({
	props,
	categories,
}: Readonly<{
	props: PageProps<{}, { action?: string; categoryId?: string }>;
	categories: PageList<CategoryData>;
}>) {
	const router = useRouter();

	const [nameInput, setNameInput] = useState('');
	const [descriptionInput, setDescriptionInput] = useState('');

	const [isRequesting, setIsRequesting] = useState(false);
	const [errorMsg, setErrorMsg] = useState('');
	const { searchParams } = props;
	let isAbleToOpenModal = false;
	const action = searchParams?.action;
	const categoryId = searchParams?.categoryId;
	let title = '';
	let actionButton = '';
	if (action === 'new') {
		isAbleToOpenModal = true;
		title = 'New Category';
		actionButton = 'Save';
	} else if (action === 'edit') {
		title = 'Edit Category';
		actionButton = 'Update';
		if (categoryId) isAbleToOpenModal = true;
	} else if (action === 'delete') {
		title = 'Delete Category';
		actionButton = 'Delete';
		if (categoryId) isAbleToOpenModal = true;
	}

	useEffect(() => {
		if (!isRequesting) return;
		let allToHandle: any;

		if (nameInput === '' && action !== 'delete') {
			setErrorMsg('Category Name is required.');
			setIsRequesting(false);
		} else if (action === 'new') {
			allToHandle = POST(
				API.CategoriesNew,
				{
					name: nameInput,
					description: descriptionInput,
				},
				{},
			);
		} else if (action === 'edit') {
			allToHandle = PUT(
				API.CategoriesEdit(categoryId!),
				{
					name: nameInput,
					description: descriptionInput,
				},
				{},
			);
		} else if (action === 'delete') {
			allToHandle = DELETE(API.CategoriesDelete(categoryId!), {});
		} else {
			setErrorMsg('Invalid action.');
			setIsRequesting(false);
		}

		allToHandle
			?.then(async (x: any) => {
				const data = x.data as APIResponse;
				if (!data.success) throw new Error(data.message);

				handleCloseModal();
				router.refresh();
			})
			.catch((err: any) => {
				setErrorMsg(err.message);
			})
			.finally(() => {
				setIsRequesting(false);
			});
	}, [isRequesting]);

	useEffect(() => {
		if (['edit', 'delete'].some((x) => x === action)) {
			const specificCategory = categories.list.find(
				(x) => x.categoryId === parseInt(categoryId ?? '0'),
			);
			setNameInput(specificCategory?.name ?? '');
			setDescriptionInput(specificCategory?.description ?? '');
		}
	}, [action]);

	const handleCloseModal = () => {
		router.back();
		setErrorMsg('');
		setNameInput('');
		setDescriptionInput('');
	};

	return (
		<Fragment>
			<Container>
				<Row className={styles.row}>
					<div className='col-sm-6'>
						<h3>Categories Management</h3>
					</div>
					<div className='col-sm-6'>
						<Link
							href='#'
							className='btn btn-primary'
							onClick={(e) => {
								e.preventDefault();
								router.push('?action=new');
							}}
						>
							Add Category
						</Link>
					</div>
				</Row>

				<div className='overflow-x-auto'>
					<Table className={styles.table}>
						<thead>
							<tr>
								<th>#</th>
								<th className='text-left'>Category Name</th>
								<th className='text-left'>Description</th>
								<th className='text-left'>Action</th>
							</tr>
						</thead>
						<tbody>
							{categories.list.map((data, index) => (
								<tr
									key={data.categoryId}
								>
									<td className='text-center'>{index + 1}</td>
									<td>{data.name}</td>
									<td>{data.description}</td>
									<td>
										<Link
											href='#'
											onClick={(e) => {
												e.preventDefault();
												router.push(
													`?action=edit&categoryId=${data.categoryId}`,
												);
											}}
										>
											<i className='fa fa-edit'></i>
										</Link>
										<Link
											href='#'
											onClick={(e) => {
												e.preventDefault();
												router.push(
													`?action=delete&categoryId=${data.categoryId}`,
												);
											}}
										>
											<i className='fa fa-solid fa-trash'></i>
										</Link>
									</td>
								</tr>
							))}
						</tbody>
					</Table>
				</div>
				{categories.list.length === 0 && (
					<h3 className='text-center py-10'>
						No category available, go add first.
					</h3>
				)}
			</Container>

			{isAbleToOpenModal && (
				<Modal
					onClose={() => {
						if (!isRequesting) handleCloseModal();
					}}
					title={title}
					errorMsg={errorMsg}
					actionButton={{
						text: actionButton,
						isLoading: isRequesting,
						onClick: () => setIsRequesting(true),
					}}
				>
					{action === 'new' && (
						<div className='flex flex-col gap-3'>
							<p className='text-3xl'>Name</p>
							<input
								className='border border-gray-800 rounded w-full p-2 text-2xl'
								placeholder='Type category name'
								onChange={(e) => setNameInput(e.target.value)}
							/>
							<p className='text-3xl'>Description</p>
							<input
								className='border border-gray-800 rounded w-full p-2 text-2xl'
								placeholder='Type category name'
								onChange={(e) =>
									setDescriptionInput(e.target.value)
								}
							/>
						</div>
					)}
					{action === 'edit' && (
						<div className='flex flex-col gap-3'>
							<p className='text-3xl'>Name</p>
							<input
								className='border border-gray-800 rounded w-full p-2 text-2xl'
								placeholder='Type category name'
								value={nameInput}
								onChange={(e) => setNameInput(e.target.value)}
							/>
							<p className='text-3xl'>Description</p>
							<input
								className='border border-gray-800 rounded w-full p-2 text-2xl'
								placeholder='Type category name'
								value={descriptionInput}
								onChange={(e) =>
									setDescriptionInput(e.target.value)
								}
							/>
						</div>
					)}
					{action === 'delete' && (
						<div className='flex flex-col gap-3'>
							<p className='text-3xl'>
								Are you sure to delete category{' '}
								<strong>{nameInput}</strong>.
							</p>
						</div>
					)}
				</Modal>
			)}
		</Fragment>
	);
}
