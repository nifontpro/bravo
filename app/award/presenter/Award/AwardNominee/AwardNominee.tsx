import styles from './AwardNominee.module.scss';
import { AwardNomineeProps } from './AwardNominee.props';
import cn from 'classnames';
import ButtonCircleIcon from '@/core/presenter/ui/ButtonCircleIcon/ButtonCircleIcon';
import Htag from '@/core/presenter/ui/Htag/Htag';
import uniqid from 'uniqid';
import CardNominee from 'award/presenter/Award/AwardNominee/CardNominee/CardNominee';
import { useRef, useState } from 'react';
import { useMyUser } from '@/user/presenter/useMyUsers';
import ModalWindowWithAddUsers from '@/core/presenter/ui/ModalWindowWithAddUsers/ModalWindowWithAddUsers';
import { IUser, IUserAwards } from '@/user/model/user.types';
import { useAuthState } from '@/auth/data/auth.slice';
import CardNomineeUser from './CardNomineeUser/CardNomineeUser';
import P from '@/core/presenter/ui/P/P';
import useOutsideClick from '@/core/hooks/useOutsideClick';

const AwardNominee = ({
  award,
  className,
  ...props
}: AwardNomineeProps): JSX.Element => {
  const { user: currentUser } = useAuthState();
  const [visibleModal, setVisibleModal] = useState<boolean>(false);
  console.log(award)

  //Закрытие модального окна нажатием вне его
  const ref = useRef(null);
  const refOpen = useRef(null);
  const handleClickOutside = () => {
    setVisibleModal(false);
  };
  useOutsideClick(ref, refOpen, handleClickOutside, visibleModal);

  const { usersWithAwards: users } = useMyUser('');

  //Фильтр тех кто еще не участвует в номинации
  let arrIdUserNominee: string[] = [];
  award.relateUsers.forEach((user) => arrIdUserNominee.push(user.user.id));
  let arrUserNotNominee: IUser[] = [];
  users.forEach((user) => {
    if (arrIdUserNominee.find((item) => item == user.id) == undefined) {
      arrUserNotNominee.push(user);
    }
  });
  let arrUserNominee: IUserAwards[] = [];
  users.forEach((user) => {
    if (arrIdUserNominee.find((item) => item == user.id) != undefined) {
      arrUserNominee.push(user);
    }
  });
  // console.log(arrUserNominee)

  return (
    <div className={cn(styles.wrapper, className)} {...props}>
      <div className={styles.content}>
        <div className={styles.header}>
          <Htag tag='h3' className='@apply flex'>
            Кто участвует
            <P className={styles.rewardedLength}>{arrIdUserNominee.length}</P>
          </Htag>
          {currentUser?.role == 'user' ? (
            <ButtonCircleIcon
              onClick={() => console.log('Рекомендовать')}
              appearance='black'
              icon='plus'
              className='font-bold'
            >
              Рекомендовать
            </ButtonCircleIcon>
          ) : (
            <ButtonCircleIcon
              onClick={() => setVisibleModal(true)}
              appearance='black'
              icon='plus'
              className='font-bold'
              ref={refOpen}
            >
              Добавить участников
            </ButtonCircleIcon>
          )}
        </div>

        {currentUser?.role == 'user' ? (
          <div className={styles.usersAwarded}>
            {arrUserNominee.map((user) => {
              return <CardNomineeUser user={user} key={uniqid()} />;
            })}
          </div>
        ) : (
          <div className={styles.usersAwarded}>
            {award.relateUsers.map((item) => {
              if (item.state === 'NOMINEE' || item.state === 'AWARD') {
                return (
                  <CardNominee awardId={award.id} user={item} key={uniqid()} />
                );
              }
            })}
          </div>
        )}
      </div>

      <ModalWindowWithAddUsers
        awardState='NOMINEE'
        awardId={award.id}
        users={arrUserNotNominee}
        visibleModal={visibleModal}
        setVisibleModal={setVisibleModal}
        textBtn='Номинировать'
        ref={ref}
      />
    </div>
  );
};

export default AwardNominee;
