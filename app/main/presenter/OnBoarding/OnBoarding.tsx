import styles from './OnBoarding.module.scss';
import { OnBoardingProps } from './OnBoarding.props';
import cn from 'classnames';
import P from '@/core/presenter/ui/P/P';
import { useMain } from '../useMain';
import Button from '@/core/presenter/ui/Button/Button';
import { AnimatePresence, motion } from 'framer-motion';

const OnBoarding = ({
  state,
  onBoarding,
  onBoardingText,
  onBoardingText3,
  handleClick,
  className,
  ...props
}: OnBoardingProps): JSX.Element => {
  const variants = {
    visible: {
      opacity: 1,
      // y: 0,
    },
    hidden: {
      opacity: 0,
      // y: '-100vh',
    },
    exit: {
      opacity: 0,
      // y: '-100vh',
    },
  };

  return (
    <AnimatePresence mode='wait'>
      {state && (
        <motion.div
          initial='hidden'
          animate='visible'
          exit='exit'
          variants={variants}
          transition={{ duration: 0.4 }}
          className={cn(styles.layout, className)}
          {...props}
        >
          <div className={styles.layoutContent}>
            <P size='xs' color='gray'>
              {onBoarding} / 3
            </P>
            <P className={styles.onBoardingText}>
              {onBoardingText} <br /> {onBoardingText3}
            </P>
            <Button appearance='blackWhite' size='m' onClick={handleClick}>
              {onBoarding < 3 ? 'Дальше' : 'Закрыть'}
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OnBoarding;
