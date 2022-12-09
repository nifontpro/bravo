import styles from './SingleUserNominee.module.scss';
import { SingleUserNomineeProps } from './SingleUserNominee.props';
import cn from 'classnames';

const SingleUserNominee = ({
  user,
  className,
  ...props
}: SingleUserNomineeProps): JSX.Element => {

  return (
    <div className={cn(styles.wrapper, className)} {...props}>
      SingleUserNominee
    </div>
  );
};

export default SingleUserNominee;
