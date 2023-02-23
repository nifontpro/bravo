import styles from './AwardWasAwarded.module.scss';
import { AwardWasAwardedProps } from './AwardWasAwarded.props';
import cn from 'classnames';
import ButtonCircleIcon from '@/core/presenter/ui/ButtonCircleIcon/ButtonCircleIcon';
import Htag from '@/core/presenter/ui/Htag/Htag';
import CardUserAwarded from '@/core/presenter/ui/CardUserAwarded/CardUserAwarded';
import P from '@/core/presenter/ui/P/P';
import uniqid from 'uniqid';
import ModalWindowWithAddUsers from '@/core/presenter/ui/ModalWindowWithAddUsers/ModalWindowWithAddUsers';
import { useMyUser } from '@/user/presenter/useMyUsers';
import { useRef, useState } from 'react';
import { IUser } from '@/user/model/user.types';
import AuthComponent from '@/core/providers/AuthProvider/AuthComponent';
import useOutsideClick from '@/core/hooks/useOutsideClick';

const AwardWasAwarded = ({
  award,
  className,
  ...props
}: AwardWasAwardedProps): JSX.Element => {
  const { users } = useMyUser('');

  const [visibleModal, setVisibleModal] = useState<boolean>(false);
  //Закрытие модального окна нажатием вне его
  const ref = useRef(null);
  const refOpen = useRef(null);
  const handleClickOutside = () => {
    setVisibleModal(false);
  };
  useOutsideClick(ref, refOpen, handleClickOutside, visibleModal);

  //Фильтр тех кто еще не участвует в номинации
  let arrIdUserRewarded: string[] = [];
  award.relateUsers.forEach((user) => arrIdUserRewarded.push(user.user.id));
  let arrUserNotAwarded: IUser[] = [];
  users.forEach((user) => {
    if (arrIdUserRewarded.find((item) => item == user.id) == undefined) {
      arrUserNotAwarded.push(user);
    }
  });

  console.log(award.relateUsers)

  return (
    <div className={cn(styles.wrapper, className)} {...props}>
      <div className={styles.content}>
        <div className={styles.header}>
          <Htag tag='h3' className={styles.headerTitle}>
            Награжденные
            <P className={styles.rewardedLength}>{award.relateUsers.filter((user) => user.state == 'AWARD').length}</P>
          </Htag>
          <AuthComponent minRole={'director'}>
            <ButtonCircleIcon
              onClick={() => setVisibleModal(true)}
              appearance='black'
              icon='plus'
              className='font-bold'
              ref={refOpen}
            >
              Наградить еще
            </ButtonCircleIcon>
          </AuthComponent>
        </div>
        {award.relateUsers.findIndex((item) => item.state === 'AWARD') >= 0 ? (
          <div className={styles.usersAwarded}>
            {award.relateUsers.map((item) => {
              if (item.state === 'AWARD') {
                return (
                  <CardUserAwarded award={award} user={item} key={uniqid()} />
                );
              }
            })}
          </div>
        ) : (
          <P className={styles.none} fontstyle='thin' size='m'>
            Нет награжденных
          </P>
        )}
      </div>
      <ModalWindowWithAddUsers
        awardState='AWARD'
        awardId={award.id}
        users={arrUserNotAwarded}
        visibleModal={visibleModal}
        setVisibleModal={setVisibleModal}
        textBtn='Выдать награду'
        ref={ref}
      />
    </div>
  );
};

export default AwardWasAwarded;
