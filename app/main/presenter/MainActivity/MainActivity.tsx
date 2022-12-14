import styles from './MainActivity.module.scss';
import Meta from '@/core/utils/meta/Meta';
import { MainActivityProps } from './MainActivity.props';
import cn from 'classnames';

const MainActivity = ({ className, ...props }: MainActivityProps): JSX.Element => {
  return <div {...props} className={cn(styles.wrapper, className)}>MainActivity</div>;
};

export default MainActivity;
