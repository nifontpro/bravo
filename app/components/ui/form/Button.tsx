import {FC, PropsWithChildren} from 'react';
import cn from 'classnames'
import styles from './form.module.scss';
import {IButton} from "@/ui/form/form.interface";

const Button: FC<PropsWithChildren<IButton>> = ({children, className, ...rest}) => {
	return (
		<button className={cn(styles.button, className)} {...rest}>
			{children}
		</button>
	);
};

export default Button;