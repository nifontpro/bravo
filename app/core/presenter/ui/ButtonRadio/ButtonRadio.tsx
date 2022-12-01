import styles from './ButtonRadio.module.scss';
import cn from 'classnames';
import { ButtonRadioProps } from './ButtonRadio.props';

const ButtonRadio = ({
  children,
  className,
  ...props
}: ButtonRadioProps): JSX.Element => {
  return (
    <button
      className={cn(styles.btn, className)}
      {...props}
    >
      {children}
    </button>
  );
};

export default ButtonRadio;
