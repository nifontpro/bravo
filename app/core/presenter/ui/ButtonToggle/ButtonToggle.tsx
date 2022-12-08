import styles from './ButtonToggle.module.scss';
import cn from 'classnames';
import { ButtonToggleProps } from './ButtonToggle.props';
import { useState } from 'react';

const ButtonToggle = ({
  children,
  className,
  ...props
}: ButtonToggleProps): JSX.Element => {
  const [ active, setActive ] = useState<boolean>(false)
  return (
    <div
      className={cn(styles.wrapper, className)}
      {...props}
    >
      <div className={styles.toogle}>
        <div onClick={() => setActive(!active)} className={cn(styles.dot, {
          [styles.active]: active
        })}></div>
        <div onClick={() => setActive(!active)} className={cn(styles.dot, {
          [styles.active]: !active
        })}></div>
      </div>
      {children}
    </div>
  );
};

export default ButtonToggle;
