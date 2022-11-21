import styles from './ButtonCircleIcon.module.scss';
import cn from 'classnames';
import { ButtonCircleIconProps, icons } from './ButtonCircleIcon.props';

const ButtonIcon = ({ appearance, icon, className, ...props }: ButtonCircleIconProps): JSX.Element => {
  const IconComp = icons[icon]

  return (
    <button
      className={cn(styles.button, className, {
        [styles.black]: appearance == 'black',
        [styles.transparent]: appearance == 'transparent',
      })}
      {...props}
    >
      <IconComp />
    </button>
  );
};

export default ButtonIcon;
