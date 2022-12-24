import styles from './SingleUserTitle.module.scss';
import { SingleUserTitleProps } from './SingleUserTitle.props';
import cn from 'classnames';
import EditPanel from '@/core/presenter/ui/EditPanel/EditPanel';
import { useRef, useState } from 'react';
import {
  getUserEditPasswordUrl,
  getUserEditUrl,
} from '@/core/config/api.config';
import { useUserAdmin } from '../../admin/useUserAdmin';
import ButtonCircleIcon from '@/core/presenter/ui/ButtonCircleIcon/ButtonCircleIcon';
import { useRouter } from 'next/router';
import Htag from '@/core/presenter/ui/Htag/Htag';
import ButtonIcon from '@/core/presenter/ui/ButtonIcon/ButtonIcon';
import P from '@/core/presenter/ui/P/P';
import { ImageDefault } from '@/core/presenter/ui/icons/ImageDefault';
import uniqid from 'uniqid';
import Button from '@/core/presenter/ui/Button/Button';
import ModalWindowWithAddAwards from '@/core/presenter/ui/ModalWindowWithAddAwards/ModalWindowWithAddAwards';
import { awardApi } from 'award/data/award.api';
// import { useCompanyState } from '@/company/data/company.slice';
import { IAward } from 'award/model/award.types';
import AuthComponent from '@/core/providers/AuthProvider/AuthComponent';
import { useAuthState } from '@/auth/data/auth.slice';
import useOutsideClick from '@/core/hooks/useOutsideClick';

const SingleUserTitle = ({
  user,
  className,
  ...props
}: SingleUserTitleProps): JSX.Element => {
  const { user: currentUser } = useAuthState();
  const { data: awards } = awardApi.useGetAwardsByCompanyQuery(
    { companyId: user.companyId || '' },
    { skip: !user.companyId }
  );

  //Фильтр тех медалей, которыми не награжден еще
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
  // console.log(arrAwardNotRewarded)

  const { push } = useRouter();
  const [visible, setVisible] = useState<boolean>(false);
  const { deleteAsync } = useUserAdmin();
  const [visibleModal, setVisibleModal] = useState<boolean>(false);

  //Закрытие модального окна нажатием вне его
  const ref = useRef(null);
  const refOpen = useRef(null);
  const handleClickOutside = () => {
    setVisibleModal(false);
  };
  useOutsideClick(ref, refOpen, handleClickOutside, visibleModal);

  const handleRemove = () => {
    deleteAsync(user.id);
    push('/rating');
  };

  return (
    <div className={cn(styles.wrapper, className)} {...props}>
      <div className={styles.title}>
        <Htag tag='h2'>
          {user.lastname} {user.name}
        </Htag>
        <AuthComponent minRole={'director'}>
          <ButtonCircleIcon
            onClick={() => setVisible(!visible)}
            icon='dots'
            appearance='transparent'
            className={styles.dots}
          />
          <EditPanel
            getUrl={getUserEditUrl}
            onMouseLeave={() => setVisible(!visible)}
            id={user.id}
            deleteAsync={handleRemove}
            visible={visible}
          />
        </AuthComponent>
      </div>

      <div className={styles.position}>
        {user.departmentName ? (
          <P
            size='xs'
            fontstyle='thin'
            type='silverBtn'
            className={styles.depart}
          >
            {user.departmentName}
          </P>
        ) : (
          <P
            size='xs'
            fontstyle='thin'
            type='silverBtn'
            className={styles.depart}
          >
            Нет отдела
          </P>
        )}
        {user.post ? (
          <P
            size='xs'
            fontstyle='thin'
            type='silverBtn'
            className={styles.post}
          >
            {user.post}
          </P>
        ) : (
          <P
            size='xs'
            fontstyle='thin'
            type='silverBtn'
            className={styles.post}
          >
            Нет отдела
          </P>
        )}
      </div>

      <div className={styles.contacts}>
        <P size='m' fontstyle='thin'>
          {user.email}
        </P>
        <P size='m' fontstyle='thin'>
          {user.phone}
        </P>
      </div>

      <div className={styles.awards}>
        <div className={styles.imagesAward}>
          {user.awards
            .filter((item) => item.awardState == 'AWARD')
            .map((award, index) => {
              if (index < 4) {
                return (
                  // <div className={styles.circle} key={uniqid()}></div>
                  <div className={styles.imgAward} key={uniqid()}>
                    <ImageDefault
                      src={award.imageUrl}
                      width={50}
                      height={50}
                      alt='preview image'
                      objectFit='cover'
                      className='rounded-full'
                    />
                  </div>
                );
              }
            })}
          {user.awards.filter((item) => item.awardState == 'AWARD').length >
          4 ? (
            <ButtonIcon className={styles.countIcon} appearance={'black'}>
              +
              {user.awards.filter((item) => item.awardState == 'AWARD').length -
                4}
            </ButtonIcon>
          ) : (
            <div className={styles.countIcon}></div>
          )}
        </div>
        {currentUser?.id == user.id ? (
          <div>
            <Button
              onClick={() => push(getUserEditUrl(`/${user.id}`))}
              size='m'
              appearance='blackWhite'
            >
              Редактировать
            </Button>
            <Button
              onClick={() => push(getUserEditPasswordUrl(`/${user.id}`))}
              size='m'
              appearance='whiteBlack'
              className='@apply ml-[10px]'
            >
              Сменить пароль
            </Button>
          </div>
        ) : (
          <AuthComponent minRole={'director'}>
            <Button
              onClick={() => setVisibleModal(true)}
              size='l'
              appearance='blackWhite'
              ref={refOpen}
            >
              Наградить
            </Button>
          </AuthComponent>
        )}
      </div>

      <P size='l' className={styles.aboutUser}>
        О сотруднике
      </P>
      <P size='m' fontstyle='thin'>
        {user.description}
      </P>

      <ModalWindowWithAddAwards
        awardState='AWARD'
        userId={user.id}
        awards={arrAwardNotRewarded}
        visibleModal={visibleModal}
        setVisibleModal={setVisibleModal}
        textBtn='Наградить'
        ref={ref}
      />
    </div>
  );
};

export default SingleUserTitle;
