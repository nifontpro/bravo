import styles from './SingleUserTitle.module.scss';
import { SingleUserTitleProps } from './SingleUserTitle.props';
import cn from 'classnames';
import EditPanel from '@/core/presenter/ui/EditPanel/EditPanel';
import { useState } from 'react';
import { getUserEditUrl } from '@/core/config/api.config';
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

const SingleUserTitle = ({
  user,
  className,
  ...props
}: SingleUserTitleProps): JSX.Element => {
  const { push } = useRouter();
  const [visible, setVisible] = useState<boolean>(false);
  const { deleteAsync } = useUserAdmin();
  const [visibleModal, setVisibleModal] = useState<boolean>(false);

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
        <ButtonCircleIcon
          onClick={() => setVisible(!visible)}
          icon='dots'
          appearance='transparent'
          className={styles.dots}
        />
      </div>

      <div className={styles.position}>
        {user.departmentName ? (
          <ButtonIcon className={styles.depart} appearance='gray'>
            {user.departmentName}
          </ButtonIcon>
        ) : (
          <ButtonIcon className={styles.depart} appearance='gray'>
            Нет отдела
          </ButtonIcon>
        )}
        {user.post ? (
          <ButtonIcon className={styles.post} appearance='gray'>
            {user.post}
          </ButtonIcon>
        ) : (
          <ButtonIcon className={styles.post} appearance='gray'>
            Нет отдела
          </ButtonIcon>
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
          {user.awards.map((award, index) => {
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
          {user.awards.length > 4 ? (
            <ButtonIcon className={styles.countIcon} appearance={'white'}>
              +{user.awards.length - 4}
            </ButtonIcon>
          ) : (
            <div className={styles.countIcon}></div>
          )}
        </div>
        <Button size='m' appearance='blackWhite'>
          Выдать награду
        </Button>
      </div>

      <P size='l'>О сотруднике</P>
      <P size='m' fontstyle='thin'>{user.description}</P>

      <EditPanel
        getUrl={getUserEditUrl}
        onMouseLeave={() => setVisible(!visible)}
        id={user.id}
        deleteAsync={handleRemove}
        visible={visible}
      />
      {/* <ModalWindowWithAddAwards
        awardState='AWARD'
        awardId={award.id}
        users={arrUserNotAwarded}
        visibleModal={visibleModal}
        setVisibleModal={setVisibleModal}
        textBtn='Наградить'
      /> */}
    </div>
  );
};

export default SingleUserTitle;
