export interface Payment_CODProps {
	id: string;
	onChange?: () => void;
	checked?: boolean;
	disabled?: boolean;
}

export default function COD({
	id,
	onChange,
	checked,
	disabled,
}: Readonly<Payment_CODProps>) {
	return (
		<div className='input-radio flex flex-row items-center gap-2'>
			<input
				type='radio'
				name='payment'
				id={id}
				onChange={onChange}
				checked={checked}
				disabled={disabled}
			/>
			<label htmlFor={id}>
				Cash on Delivery (COD)
			</label>
			<div className='caption'></div>
		</div>
	);
}
