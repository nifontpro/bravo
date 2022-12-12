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
import P from '@/core/presenter/ui/P/P';

const UserListRating = ({
  setSearchValue,
  users,
  className,
  ...props
}: UserListRatingProps): JSX.Element => {
  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    setSearchValue(event.currentTarget.value);
  };
  console.log(users);
  const { push } = useRouter();

  return (
    <div {...props} className={styles.wrapper}>
      <Search
        onChange={handleChange}
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
              <P size='l'>
                {user.lastname} {user.name}
              </P>
              <div className={styles.userTag}>
                {user.post && (
                  <P size='s' fontstyle='thin' color='gray'>
                    {user.post}
                  </P>
                )}
              </div>
            </div>
            {user.departmentName ? (
              <ButtonIcon className={styles.depart} appearance='lightGray'>
                {user.departmentName}
              </ButtonIcon>
            ) : (
              <ButtonIcon className={styles.depart} appearance='lightGray'>
                Нет отдела
              </ButtonIcon>
            )}
            {user.awards.length >= 1 ? (
              <div className={styles.countAwards}>
                <Htag tag='h2'>{user.awards.length}</Htag>
                <AwardIcon className='ml-[10px]' />
              </div>
            ) : (
              <div className={styles.countAwardsDisable}>
                <Htag className={styles.disabled} tag='h2'>
                  {user.awards.length}
                </Htag>
                <AwardIcon className='ml-[10px]' />
              </div>
            )}
            <div className={styles.viewerAward}>
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
            </div>
            {user.awards.length > 4 ? (
              <ButtonIcon className={styles.countIcon} appearance={'white'}>
                +{user.awards.length - 4}
              </ButtonIcon>
            ) : (
              <div className={styles.countIcon}></div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default UserListRating;
