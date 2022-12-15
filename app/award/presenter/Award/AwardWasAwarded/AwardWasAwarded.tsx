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
import { useState } from 'react';
import { IUser } from '@/user/model/user.types';


const AwardWasAwarded = ({
  award,
  className,
  ...props
}: AwardWasAwardedProps): JSX.Element => {

  const [visibleModal, setVisibleModal] = useState<boolean>(false);

  const { users } = useMyUser('');

  //Фильтр тех кто еще не участвует в номинации
  let arrIdUserRewarded: string[] = [];
  award.relateUsers.forEach((user) => arrIdUserRewarded.push(user.user.id));
  let arrUserNotAwarded: IUser[] = [];
  users.forEach((user) => {
    if (arrIdUserRewarded.find((item) => item == user.id) == undefined) {
      arrUserNotAwarded.push(user);
    }
  });

  return (
    <div className={cn(styles.wrapper, className)} {...props}>
      <div className={styles.content}>
        <div className={styles.header}>
          <Htag tag='h3'>Награжденные</Htag>
          <ButtonCircleIcon
            onClick={() => setVisibleModal(true)}
            appearance='black'
            icon='plus'
            className='font-bold'
          >
            Наградить еще
          </ButtonCircleIcon>
        </div>
        {award.relateUsers.findIndex((item) => item.state === 'AWARD') >= 0 ? (
          <div className={styles.usersAwarded}>
            {award.relateUsers.map((item) => {
              if (item.state === 'AWARD') {
                return <CardUserAwarded award={award} user={item} key={uniqid()}/>;
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
        textBtn='Наградить'
      />
    </div>
  );
};

export default AwardWasAwarded;
