import styles from './ButtonCircleIcon.module.scss';
import cn from 'classnames';
import { ButtonCircleIconProps, icons } from './ButtonCircleIcon.props';

const ButtonIcon = ({
  appearance,
  icon,
  className,
  children,
  ...props
}: ButtonCircleIconProps): JSX.Element => {
  const IconComp = icons[icon];

  return (
    <div className={cn(styles.wrapper ,className)}         {...props}>
      <button
        className={cn(styles.button, {
          [styles.black]: appearance == 'black',
          [styles.transparent]: appearance == 'transparent',
        })}

      >
        <IconComp />
      </button>
      {children}
    </div>
  );
};

export default ButtonIcon;
