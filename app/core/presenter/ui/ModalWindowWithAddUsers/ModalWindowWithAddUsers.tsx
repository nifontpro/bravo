import styles from './ModalWindowWithAddUsers.module.scss';
import { ModalWindowWithAddUsersProps } from './ModalWindowWithAddUsers.props';
import cn from 'classnames';
import Htag from '../Htag/Htag';
import ExitIcon from '@/core/presenter/images/close.svg';
import ChoiceUsers from 'award/presenter/admin/create/ChoiceUsers/ChoiceUsers';
import { ForwardedRef, forwardRef, useEffect, useState } from 'react';
import Button from '../Button/Button';
import { toast } from 'react-toastify';
import { awardApi } from 'award/data/award.api';

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
    const [arrChoiceUser, setArrChoiceUser] = useState<string[]>([]);
    const [reward] = awardApi.useAwardUserMutation();

    const onSubmitNominee = async () => {
      let isError = false;
      // console.log(arrChoiceUser);

      if (arrChoiceUser.length == 0) {
        // setVisibleModal(false);
        toast.error(`Выберите сотрудников для номинации`);
      }

      if (arrChoiceUser != undefined && arrChoiceUser?.length > 0) {
        arrChoiceUser.forEach((user) => {
          reward({
            awardId: awardId,
            userId: user,
            awardState: awardState,
          })
            .unwrap()
            .catch(() => {
              isError = true;
              toast.error(`Ошибка награждения 123 ${user}`);
            });
        });
        setArrChoiceUser([]);
        setVisibleModal(false);
        if (!isError) {
          toast.success('Номинирование успешно');
        }
      }
      // if (!isError) {
      //   toast.success('Номинирование успешно');
      // }
    };

    return (
      <div
        className={cn(
          styles.modalWindow,
          {
            [styles.active]: visibleModal,
            [styles.hidden]: !visibleModal,
          },
          className
        )}
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
            {/* <Button
              onClick={() => setVisibleModal(false)}
              appearance='whiteBlack'
              size='l'
            >
              Отменить
            </Button> */}
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
      </div>
    );
  }
);

ModalWindowWithAddUsers.displayName = 'ModalWindowWithAddUsers';
export default ModalWindowWithAddUsers;
