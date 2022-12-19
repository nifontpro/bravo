import styles from './UserListRating.module.scss';

import { UserListRatingProps } from './UserListRating.props';
import cn from 'classnames';
import Search from '@/core/presenter/ui/Search/Search';
import { ImageDefault } from '@/core/presenter/ui/icons/ImageDefault';
import uniqid from 'uniqid';
import Htag from '@/core/presenter/ui/Htag/Htag';
import ButtonIcon from '@/core/presenter/ui/ButtonIcon/ButtonIcon';
import AwardIcon from '@/core/presenter/images/union.svg';
import { getUserUrl } from '@/core/config/api.config';
import { useRouter } from 'next/router';
import P from '@/core/presenter/ui/P/P';

const UserListRating = ({
  users,
  className,
  ...props
}: UserListRatingProps): JSX.Element => {
  // console.log(users);
  const { push } = useRouter();

  return (
    <div {...props} className={cn(styles.wrapper, className)}>
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
              <P size='m'>
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
            {user.awards.filter((item) => item.state == 'AWARD').length >= 1 ? (
              <div className={styles.countAwards}>
                <Htag tag='h2'>
                  {user.awards.filter((item) => item.state == 'AWARD').length}
                </Htag>
                <AwardIcon className={styles.union} />
              </div>
            ) : (
              <div className={styles.countAwardsDisable}>
                <Htag className={styles.disabled} tag='h2'>
                  {user.awards.filter((item) => item.state == 'AWARD').length}
                </Htag>
                <AwardIcon className={styles.union} />
              </div>
            )}
            <div className={styles.viewerAward}>
              {user.awards
                .filter((item) => item.state == 'AWARD')
                .map((award, index) => {
                  if (index < 4) {
                    return (
                      <div className={cn(styles.imgAward, {
                        [styles.one]: index == 0,
                        [styles.two]: index == 1,
                        [styles.three]: index == 2,
                        [styles.four]: index == 3,
                      })} key={uniqid()}>
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
              {user.awards.filter((item) => item.state == 'AWARD').length >
              4 ? (
                <div className={styles.countIcon}>
                  +
                  {user.awards.filter((item) => item.state == 'AWARD').length -
                    4}
                </div>
              ) : (
                <div className={styles.countIconDisabled}></div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default UserListRating;
