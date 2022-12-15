import styles from './ButtonMenuIcon.module.scss';
import cn from 'classnames';
import { ButtonMenuIconProps, icons } from './ButtonMenuIcon.props';

const ButtonMenuIcon = ({
  // appearance,
  icon,
  className,
  children,
  ...props
}: ButtonMenuIconProps): JSX.Element => {
  const IconComp = icons[icon];

  return (
    <div className={cn(styles.wrapper ,className)} {...props}>
      <button
        className={cn(styles.button, {
          // [styles.black]: appearance == 'black',
          // [styles.transparent]: appearance == 'transparent',
        })}

      >
        <IconComp />
      </button>
      {children}
    </div>
  );
};

export default ButtonMenuIcon;
