import styles from './AwardNominee.module.scss';
import { AwardNomineeProps } from './AwardNominee.props';
import cn from 'classnames';
import ButtonCircleIcon from '@/core/presenter/ui/ButtonCircleIcon/ButtonCircleIcon';
import Htag from '@/core/presenter/ui/Htag/Htag';
import CardUserAwarded from '@/core/presenter/ui/CardUserAwarded/CardUserAwarded';
import P from '@/core/presenter/ui/P/P';
import uniqid from 'uniqid';
import CardNominee from 'award/presenter/Award/AwardNominee/CardNominee/CardNominee';
import { awardApi } from 'award/data/award.api';
import { useState } from 'react';
import { useMyUser } from '@/user/presenter/useMyUsers';
import ModalWindowWithAddUsers from '@/core/presenter/ui/ModalWindowWithAddUsers/ModalWindowWithAddUsers';
import { IUser } from '@/user/model/user.types';

const AwardNominee = ({
  award,
  className,
  ...props
}: AwardNomineeProps): JSX.Element => {
  // console.log(award)
  const [visibleModal, setVisibleModal] = useState<boolean>(false);

  const { users } = useMyUser('');

  //Фильтр тех кто еще не участвует в номинации
  let arrIdUserNominee: string[] = [];
  award.relateUsers.forEach((user) => arrIdUserNominee.push(user.user.id));
  let arrUserNotNominee: IUser[] = [];
  users.forEach((user) => {
    if (arrIdUserNominee.find((item) => item == user.id) == undefined) {
      arrUserNotNominee.push(user);
    }
  });

  return (
    <div className={cn(styles.wrapper, className)} {...props}>
      <div className={styles.content}>
        <div className={styles.header}>
          <Htag tag='h3'>Кто участвует</Htag>
          <ButtonCircleIcon
            onClick={() => setVisibleModal(true)}
            appearance='black'
            icon='plus'
            className='font-bold'
          >
            Добавить участников
          </ButtonCircleIcon>
        </div>

        <div className={styles.usersAwarded}>
          {award.relateUsers.map((item) => {
            if (item.state === 'NOMINEE' || item.state === 'AWARD') {
              return (
                <CardNominee awardId={award.id} user={item} key={uniqid()} />
              );
            }
          })}
        </div>
      </div>

      <ModalWindowWithAddUsers
        awardState='NOMINEE'
        awardId={award.id}
        users={arrUserNotNominee}
        visibleModal={visibleModal}
        setVisibleModal={setVisibleModal}
        textBtn='Номинировать'
      />
    </div>
  );
};

export default AwardNominee;
