import styles from './SendUs.module.scss';
import { SendUsProps } from './SendUs.props';
import SendUsIcon from '@/core/presenter/images/sendUs.svg';
import P from '@/core/presenter/ui/P/P';

const SendUs = ({ className, ...props }: SendUsProps): JSX.Element => {
  return (
    <a href='mailto:example@htmlbook.ru' className={styles.sendUs} {...props}>
      <SendUsIcon className={styles.sendIcon} />
      <P className={styles.text}>Написать нам</P>
    </a>
  );
};

export default SendUs;
