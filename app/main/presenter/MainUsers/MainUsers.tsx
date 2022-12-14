import styles from './MainUsers.module.scss';
import Meta from '@/core/utils/meta/Meta';
import { MainUsersProps } from './MainUsers.props';
import cn from 'classnames';

const MainUsers = ({ className, ...props }: MainUsersProps): JSX.Element => {
  return <div {...props} className={cn(styles.wrapper, className)}>MainUsers</div>;
};

export default MainUsers;
