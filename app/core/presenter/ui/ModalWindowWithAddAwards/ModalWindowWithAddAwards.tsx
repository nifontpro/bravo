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
import { useWindowSize } from '@/core/hooks/useWindowSize';

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

    const { windowSize } = useWindowSize();

    const variants = {
      visible: {
        opacity: 1,
      },
      hidden: {
        opacity: 0,
      },
      exit: {
        opacity: 0,
      },
    };

    const variantsMedia = {
      visible: {
        opacity: 1,
        y: 0,
      },
      hidden: {
        opacity: 0,
        y: '460px',
      },
      exit: {
        opacity: 0,
        y: '460px',
      },
    };

    return (
      <AnimatePresence mode='wait'>
        {visibleModal && (
          <motion.div
            initial='hidden'
            animate='visible'
            exit='exit'
            variants={windowSize.winWidth <= 768 ? variantsMedia : variants}
            transition={{ duration: 0.4 }}
            className={cn(styles.modalWindow, className)}
            {...props}
          >
            <div className={styles.slash} onClick={handleCancel} />
            <div className={styles.module} ref={ref}>
              <ExitIcon onClick={handleCancel} className={styles.exit} />
              <Htag tag='h2' className={styles.title}>
                Добавить награду
              </Htag>
              {/* <Htag className={styles.titleMedia} tag='h2'>
                Выбрано сотрудников{' '}
                <span className={styles.count}>{arrChoiceAward.length}</span>
              </Htag> */}
              <ChoiceAwards
                awards={awards}
                arrChoiceAward={arrChoiceAward}
                setArrChoiceAward={setArrChoiceAward}
              />
              <div className={styles.buttons}>
                <Button
                  onClick={handleCancel}
                  appearance='whiteBlack'
                  size='l'
                  className={styles.cancel}
                >
                  Отменить
                </Button>
                <Button
                  onClick={onSubmitNominee}
                  appearance='blackWhite'
                  size='l'
                  className={styles.confirm}
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
