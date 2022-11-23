
import styles from './SortButton.module.scss'
import cn from 'classnames';
import { SortButtonProps } from './UserListprops';
import SortIcon from './sort.svg'

const SortButton = ({
  className,
  children,
  ...props
}: SortButtonProps): JSX.Element => {

  return (
    <div
    className={cn(className, styles.container)}
      {...props}
    >
      <SortIcon />
      <span className={styles.title}>{children}</span>
    </div>
  );
};
export default SortButton;
