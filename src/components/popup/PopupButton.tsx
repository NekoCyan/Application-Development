import style from './style.module.css';

export interface PopupButtonProps {
	children: React.ReactNode;
}

export default function PopupButton({ children }: Readonly<PopupButtonProps>) {
    return <div className={style['chat-buttons']}>{children}</div>;
}
