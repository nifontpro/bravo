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
                Добавить участника
              </Htag>
              <ChoiceUsers
                users={users}
                arrChoiceUser={arrChoiceUser}
                setArrChoiceUser={setArrChoiceUser}
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

ModalWindowWithAddUsers.displayName = 'ModalWindowWithAddUsers';
export default ModalWindowWithAddUsers;
