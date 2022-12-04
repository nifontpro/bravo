import styles from './Award.module.scss';
import { AwardProps } from './Award.props';
import cn from 'classnames';
import { ImageDefault } from '@/core/presenter/ui/icons/ImageDefault';
import { timeConverter } from '@/core/utils/timeConverter';
import P from '@/core/presenter/ui/P/P';
import CountUsersPreview from '@/core/presenter/ui/CountUsersPreview/CountUsersPreview';

const Award = ({
  award,
  className,
  ...props
}: AwardProps): JSX.Element => {

  console.log(award);

  return (
    <div {...props} className={cn(styles.wrapper, className)}>
     привет
    </div>
  );
};

export default Award;
