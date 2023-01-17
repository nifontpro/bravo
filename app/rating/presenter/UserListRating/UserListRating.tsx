import styles from './UserListRating.module.scss';

import { UserListRatingProps } from './UserListRating.props';
import cn from 'classnames';
import { ImageDefault } from '@/core/presenter/ui/icons/ImageDefault';
import uniqid from 'uniqid';
import Htag from '@/core/presenter/ui/Htag/Htag';
import ButtonIcon from '@/core/presenter/ui/ButtonIcon/ButtonIcon';
import AwardIcon from '@/core/presenter/images/union.svg';
import { getUserUrl } from '@/core/config/api.config';
import { useRouter } from 'next/router';
import P from '@/core/presenter/ui/P/P';
import ArrowRightIcon from '@/core/presenter/images/arrowRight.svg';

const UserListRating = ({
  users,
  withoutCountAwards,
  className,
  ...props
}: UserListRatingProps): JSX.Element => {
  const { push } = useRouter();

  return (
    <div
      {...props}
      className={cn(
        {
          [styles.wrapperWithoutCountAwards]: withoutCountAwards == false,
          [styles.wrapper]: withoutCountAwards == true,
        },
        className
      )}
    >
      {users?.map((user, index) => {
        return (
          <div
            key={uniqid()}
            className={styles.userWrapper}
            onClick={() => push(getUserUrl(`/${user.id}`))}
          >
            <P
              size='s'
              fontstyle='thin'
              className={styles.numberOfRating}
              color='gray'
            >
              #{index + 1}
            </P>
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
            <div className={styles.user}>
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
              <ButtonIcon className={styles.depart} appearance='graySilver'>
                {user.departmentName}
              </ButtonIcon>
            ) : (
              <ButtonIcon className={styles.depart} appearance='graySilver'>
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
            {withoutCountAwards == true ? (
              <div className={styles.viewerAward}>
                {user.awards
                  .filter((item) => item.state == 'AWARD')
                  .map((award, index) => {
                    if (index < 3) {
                      return (
                        <div className={cn(styles.imgAward)} key={uniqid()}>
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
                3 ? (
                  <ButtonIcon
                    appearance='black'
                    className={styles.countPreview}
                  >
                    +
                    {user.awards.filter((item) => item.state == 'AWARD')
                      .length - 3}
                  </ButtonIcon>
                ) : (
                  <div className={styles.countIconDisabled}></div>
                )}
              </div>
            ) : (
              ''
            )}
            <div className={styles.arrowRight}>
              <ArrowRightIcon />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default UserListRating;
