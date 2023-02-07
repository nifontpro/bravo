import styles from './ButtonScrollUp.module.scss';
import cn from 'classnames';
import UpIcon from '@/core/presenter/images/up.svg';
import { ButtonScrollUp } from './ButtonScrollUp.props';
import Button from '../Button/Button';
import { useScrollY } from '@/core/hooks/useScrollY';

const ButtonScrollUp = ({
  className,
  ...props
}: ButtonScrollUp): JSX.Element => {
  const y = useScrollY()

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <div className={cn(styles.wrapper, className)} {...props} onClick={scrollToTop}>
      <Button className={styles.buttons} size='m' appearance='blackWhite'>
        Наверх <UpIcon className={styles.icon}/>
      </Button>
    </div>
  );
};

export default ButtonScrollUp;
