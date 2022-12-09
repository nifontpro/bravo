import styles from './ButtonToggle.module.scss';
import cn from 'classnames';
import { ButtonToggleProps } from './ButtonToggle.props';
import { useState } from 'react';

const ButtonToggle = ({
  setSortAward,
  children,
  className,
  ...props
}: ButtonToggleProps): JSX.Element => {
  const [ active, setActive ] = useState<boolean>(false)

  const handleON = () => {
    setActive(false)
    setSortAward(false)
  }

  const handleOFF = () => {
    setActive(true)
    setSortAward(true)
  }

  return (
    <div
      className={cn(styles.wrapper, className)}
      {...props}
    >
      <div className={styles.toogle}>
        <div onClick={handleON} className={cn(styles.dot, {
          [styles.active]: active
        })}>С наградами</div>
        <div onClick={handleOFF} className={cn(styles.dot, {
          [styles.active]: !active
        })}>Все</div>
      </div>
      {/* {children} */}
    </div>
  );
};

export default ButtonToggle;
