import styles from './SingleUserAwards.module.scss';
import { SingleUserAwardsProps } from './SingleUserAwards.props';
import cn from 'classnames';

const SingleUserAwards = ({
  user,
  className,
  ...props
}: SingleUserAwardsProps): JSX.Element => {

  return (
    <div className={cn(styles.wrapper, className)} {...props}>
      SingleUserAwards
    </div>
  );
};

export default SingleUserAwards;
