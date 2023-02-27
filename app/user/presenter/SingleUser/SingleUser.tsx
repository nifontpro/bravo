import styles from './SingleUser.module.scss';
import cn from 'classnames';
import Meta from '@/core/utils/meta/Meta';
import { SingleUserProps } from './SingleUser.props';
import ButtonCircleIcon from '@/core/presenter/ui/ButtonCircleIcon/ButtonCircleIcon';
import { useRouter } from 'next/router';
import { ImageDefault } from '@/core/presenter/ui/icons/ImageDefault';
import SingleUserTitle from './SingleUserTitle/SingleUserTitle';
import SingleUserAwards from './SingleUserAwards/SingleUserAwards';
import SingleUserNominee from './SingleUserNominee/SingleUserNominee';
import ButtonScrollUp from '@/core/presenter/ui/ButtonScrollUp/ButtonScrollUp';
import ModalWindowWithAddAwards from '@/core/presenter/ui/ModalWindowWithAddAwards/ModalWindowWithAddAwards';
import { useRef, useState } from 'react';
import useOutsideClick from '@/core/hooks/useOutsideClick';
import { IAward } from '@/award/model/award.types';
import { awardApi } from '@/award/data/award.api';

const SingleUser = ({
  user,
  className,
  children,
  ...props
}: SingleUserProps): JSX.Element => {
  const { back } = useRouter();

  //Фильтр тех медалей, которыми не награжден еще
  const { data: awards } = awardApi.useGetAwardsByCompanyQuery(
    { companyId: user.companyId || '' },
    { skip: !user.companyId }
  );
  let arrAwardRewarded: string[] = [];
  user.awards.forEach((award) => {
    if (award.awardState == 'AWARD') {
      arrAwardRewarded.push(award.id);
    }
  });
  let arrAwardNotRewarded: IAward[] = [];
  awards?.forEach((award) => {
    if (award.state == 'AWARD') {
      if (arrAwardRewarded.find((item) => item == award.id) == undefined) {
        arrAwardNotRewarded.push(award);
      }
    }
  });

  //Закрытие модального окна нажатием вне его
  const [visibleModal, setVisibleModal] = useState<boolean>(false);
  const ref = useRef(null);
  const refOpen = useRef(null);
  const handleClickOutside = () => {
    setVisibleModal(false);
  };
  useOutsideClick(ref, refOpen, handleClickOutside, visibleModal);

  return (
    <Meta title={user.name} description={`Профиль сотрудника ${user.name}`}>
      <div className={cn(className)} {...props}>
        <ButtonCircleIcon onClick={() => back()} appearance='black' icon='down'>
          Вернуться назад
        </ButtonCircleIcon>
        <div className={styles.wrapper}>
          <div className={styles.img}>
            <ImageDefault
              src={user.imageUrl}
              width={400}
              height={400}
              alt='award img'
              objectFit='cover'
              className='rounded-[27px]'
              // priority={true}
            />
          </div>
          <div className={styles.content}>
            <SingleUserTitle
              user={user}
              setVisibleModal={setVisibleModal}
              refOpen={refOpen}
            />
            <SingleUserAwards user={user} />
            <SingleUserNominee user={user} />
          </div>
        </div>
        <ButtonScrollUp />
      </div>
      <ModalWindowWithAddAwards
        awardState='AWARD'
        userId={user.id}
        awards={arrAwardNotRewarded}
        visibleModal={visibleModal}
        setVisibleModal={setVisibleModal}
        textBtn='Наградить'
        ref={ref}
      />
    </Meta>
  );
};

export default SingleUser;
