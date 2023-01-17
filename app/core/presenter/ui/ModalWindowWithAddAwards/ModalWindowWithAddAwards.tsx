import styles from './ModalWindowWithAddAwards.module.scss';
import { ModalWindowWithAddAwardsProps } from './ModalWindowWithAddAwards.props';
import cn from 'classnames';
import Htag from '../Htag/Htag';
import ExitIcon from '@/core/presenter/images/close.svg';
import { ForwardedRef, forwardRef } from 'react';
import Button from '../Button/Button';
import ChoiceAwards from '@/user/presenter/SingleUser/SingleUserTitle/ChoiceAwards/ChoiceAwards';
import { useModalWindowWithAddAwards } from './useModalWindowWithAddAwards';
import { AnimatePresence, motion } from 'framer-motion';

const ModalWindowWithAddAwards = forwardRef(
  (
    {
      textBtn,
      awardState,
      userId,
      awards,
      visibleModal,
      setVisibleModal,
      className,
      ...props
    }: ModalWindowWithAddAwardsProps,
    ref: ForwardedRef<HTMLDivElement>
  ): JSX.Element => {
    const { arrChoiceAward, setArrChoiceAward, handleCancel, onSubmitNominee } =
      useModalWindowWithAddAwards(setVisibleModal, userId, awardState);

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
      <AnimatePresence exitBeforeEnter>
        {visibleModal && (
          <motion.div
            initial='hidden'
            animate='visible'
            exit='exit'
            variants={variants}
            transition={{ duration: 0.4 }}
            className={cn(styles.modalWindow, className)}
            {...props}
          >
            <div className={styles.module} ref={ref}>
              <ExitIcon
                onClick={() => setVisibleModal(false)}
                className={styles.exit}
              />
              <Htag tag='h2' className={styles.title}>
                Добавить награду
              </Htag>
              <ChoiceAwards
                awards={awards}
                arrChoiceAward={arrChoiceAward}
                setArrChoiceAward={setArrChoiceAward}
              />
              <div className={styles.buttons}>
                <Button onClick={handleCancel} appearance='whiteBlack' size='l'>
                  Отменить
                </Button>
                <Button
                  onClick={onSubmitNominee}
                  appearance='blackWhite'
                  size='l'
                  className='ml-[15px]'
                >
                  {textBtn}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }
);

ModalWindowWithAddAwards.displayName = 'ModalWindowWithAddAwards';
export default ModalWindowWithAddAwards;
