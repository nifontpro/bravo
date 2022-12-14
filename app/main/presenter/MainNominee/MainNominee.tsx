import styles from './MainNominee.module.scss';
import Meta from '@/core/utils/meta/Meta';
import { MainNomineeProps } from './MainNominee.props';
import cn from 'classnames';

const MainNominee = ({ className, ...props }: MainNomineeProps): JSX.Element => {
  return <div {...props} className={cn(styles.wrapper, className)}>MainNominee</div>;
};

export default MainNominee;
