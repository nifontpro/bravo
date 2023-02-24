import styles from './SingleUserTitle.module.scss';
import { SingleUserTitleProps } from './SingleUserTitle.props';
import cn from 'classnames';
import {
  getUserEditPasswordUrl,
  getUserEditUrl,
} from '@/core/config/api.config';
import { useUserAdmin } from '../../admin/useUserAdmin';
import { useRouter } from 'next/router';
import Htag from '@/core/presenter/ui/Htag/Htag';
import ButtonIcon from '@/core/presenter/ui/ButtonIcon/ButtonIcon';
import P from '@/core/presenter/ui/P/P';
import { ImageDefault } from '@/core/presenter/ui/icons/ImageDefault';
import uniqid from 'uniqid';
import Button from '@/core/presenter/ui/Button/Button';
import AuthComponent from '@/core/providers/AuthProvider/AuthComponent';
import { useAuthState } from '@/auth/data/auth.slice';
import EditPanelAuthBtn from '@/core/presenter/ui/EditPanelAuthBtn/EditPanelAuthBtn';

const SingleUserTitle = ({
  user,
  setVisibleModal,
  refOpen,
  className,
  ...props
}: SingleUserTitleProps): JSX.Element => {
  const { user: currentUser } = useAuthState();

  const { push } = useRouter();
  const { deleteAsync } = useUserAdmin();

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
      </div>

      <EditPanelAuthBtn
        onlyRemove={false}
        handleRemove={handleRemove}
        id={user.id}
        getUrl={getUserEditUrl}
      />

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
                      // priority={true}
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
              className={styles.awardedBtn}
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
    </div>
  );
};

export default SingleUserTitle;
