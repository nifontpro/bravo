import styles from './ModalWindowWithAddUsers.module.scss';
import { ModalWindowWithAddUsersProps } from './ModalWindowWithAddUsers.props';
import cn from 'classnames';
import Htag from '../Htag/Htag';
import ExitIcon from '@/core/presenter/images/close.svg';
import ChoiceUsers from 'award/presenter/admin/create/ChoiceUsers/ChoiceUsers';
import { ForwardedRef, forwardRef } from 'react';
import Button from '../Button/Button';
import { useModalWindowWithAddUsers } from './useModalWindowWithAddUsers';
import { AnimatePresence, motion } from 'framer-motion';
import { useWindowSize } from '@/core/hooks/useWindowSize';

const ModalWindowWithAddUsers = forwardRef(
  (
    {
      textBtn,
      awardState,
      awardId,
      users,
      visibleModal,
      setVisibleModal,
      className,
      ...props
    }: ModalWindowWithAddUsersProps,
    ref: ForwardedRef<HTMLDivElement>
  ): JSX.Element => {
    const { arrChoiceUser, setArrChoiceUser, onSubmitNominee, handleCancel } =
      useModalWindowWithAddUsers(setVisibleModal, awardId, awardState);

      const {windowSize} = useWindowSize()

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
            <div className={styles.module} ref={ref}>
              <div
                className={styles.slash}
                onClick={handleCancel}
              />
              <ExitIcon onClick={handleCancel} className={styles.exit} />
              <Htag tag='h2' className={styles.title}>
                Добавить участника
              </Htag>
              <Htag className={styles.titleMedia} tag='h2'>
                Выбрано сотрудников{' '}
                <span className={styles.count}>{arrChoiceUser.length}</span>
              </Htag>
              <ChoiceUsers
                users={users}
                arrChoiceUser={arrChoiceUser}
                setArrChoiceUser={setArrChoiceUser}
                className={styles.mediaVisible}
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

ModalWindowWithAddUsers.displayName = 'ModalWindowWithAddUsers';
export default ModalWindowWithAddUsers;
