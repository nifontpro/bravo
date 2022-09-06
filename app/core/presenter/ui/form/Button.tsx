import {FC, PropsWithChildren} from 'react';
import cn from 'classnames'
import styles from '@/core/presenter/ui/form/form.module.scss';
import {IButton} from "@/core/presenter/ui/form/form.interface";

const Button: FC<PropsWithChildren<IButton>> =
	({children, className, disabled, ...rest}) => {
		return (
			<button disabled={disabled} className={cn(styles.button, className)} {...rest}>
				{children}
			</button>
		);
	};

export default Button;