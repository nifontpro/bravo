import styles from './UserListRating.module.scss';

import { UserListRatingProps } from './UserListRating.props';
import cn from 'classnames';
import Search from '@/core/presenter/ui/Search/Search';
import { ImageDefault } from '@/core/presenter/ui/icons/ImageDefault';
import uniqid from 'uniqid';
import Htag from '@/core/presenter/ui/Htag/Htag';
import ButtonIcon from '@/core/presenter/ui/ButtonIcon/ButtonIcon';
import AwardIcon from './award.svg';
import { awardApi } from 'award/data/award.api';
import { getUserUrl } from '@/core/config/api.config';
import { useRouter } from 'next/router';

const UserListRating = ({
  users,
  className,
  ...props
}: UserListRatingProps): JSX.Element => {
  console.log(users);
  const { push } = useRouter();
  return (
    <div {...props} className={styles.wrapper}>
      <Search
        // onChange={handleChange}
        color='white'
        search={true}
        button={false}
        placeholder='Сотрудник сотрудника ...'
        className={styles.search}
      />
      {users?.map((user) => {
        return (
          <div key={uniqid()} className={styles.userWrapper}>
            <div className={styles.img}>
              <ImageDefault
                src={user.imageUrl}
                width={100}
                height={100}
                alt='preview image'
                objectFit='cover'
                className='rounded-[10px]'
              />
            </div>
            <div
              onClick={() => push(getUserUrl(`/${user.id}`))}
              className={styles.user}
            >
              <Htag tag='h3'>
                {user.lastname} {user.name}
              </Htag>
              <div className={styles.userTag}>
                {user.post && (
                  <ButtonIcon appearance='gray'>{user.post}</ButtonIcon>
                )}
                {user.departmentName && (
                  <ButtonIcon className='ml-[10px]' appearance='gray'>
                    {user.departmentName}
                  </ButtonIcon>
                )}
              </div>
            </div>
            {user.awards.length >= 1 ? (
              <div className={styles.countAwards}>
                <Htag tag='h2'>{user.awards.length}</Htag>
                <AwardIcon className='ml-[10px]' />
              </div>
            ) : (
              <div className={styles.countAwardsDisable}>
                <Htag className={styles.disabled} tag='h2'>{user.awards.length}</Htag>
                <AwardIcon className='ml-[10px]' />
              </div>
            )}
            <div className={styles.viewerAward}>
              {[...Array(user.awards.length)].map((item, index) => {
                if (index < 4) {
                  return (
                    <div className={styles.circle} key={uniqid()}></div>
                    // <div className={styles.imgAward} key={uniqid()}>
                    //   <ImageDefault
                    //     src={user.imageUrl}
                    //     width={50}
                    //     height={50}
                    //     alt='preview image'
                    //     objectFit='cover'
                    //     className='rounded-full'
                    //   />
                    // </div>
                  );
                }
              })}
              {user.awards.length > 4 && (
                <ButtonIcon className={styles.countIcon} appearance={'white'}>
                  +{user.awards.length - 4}
                </ButtonIcon>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default UserListRating;
