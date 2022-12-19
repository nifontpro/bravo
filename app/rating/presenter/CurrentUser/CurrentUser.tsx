import styles from './CurrentUser.module.scss';
import { CurrentUserProps } from './CurrentUser.props';
import cn from 'classnames';
import { ImageDefault } from '@/core/presenter/ui/icons/ImageDefault';
import uniqid from 'uniqid';
import Htag from '@/core/presenter/ui/Htag/Htag';
import AwardIcon from '@/core/presenter/images/union.svg';
import { getUserUrl } from '@/core/config/api.config';
import { useRouter } from 'next/router';
import P from '@/core/presenter/ui/P/P';

const CurrentUser = ({
  currentUser,
  className,
  ...props
}: CurrentUserProps): JSX.Element => {
  // console.log(users);
  const { push } = useRouter();

  return (
    <div {...props} className={cn(styles.wrapper, className)}>
      <div key={uniqid()} className={styles.userWrapper}>
        <div className={styles.img}>
          <ImageDefault
            src={currentUser?.imageUrl}
            width={100}
            height={100}
            alt='preview image'
            objectFit='cover'
            className='rounded-[10px]'
          />
        </div>
        <div
          onClick={() => push(getUserUrl(`/${currentUser?.id}`))}
          className={styles.user}
        >
          <P size='m' color='white' fontstyle='thin'>
            {currentUser?.lastname} {currentUser?.name}
          </P>
        </div>

        <div className={styles.countAwards}>
          <Htag tag='h2' color='white'>
            {currentUser?.awards.filter((item) => item.state == 'AWARD').length}
          </Htag>
          <AwardIcon className={styles.union} />
        </div>

        <div className={styles.viewerAward}>
          {currentUser?.awards
            .filter((item) => item.state == 'AWARD')
            .map((award, index) => {
              if (index < 4) {
                return (
                  <div
                    className={cn(styles.imgAward, {
                      [styles.one]: index == 0,
                      [styles.two]: index == 1,
                      [styles.three]: index == 2,
                      [styles.four]: index == 3,
                    })}
                    key={uniqid()}
                  >
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
          {currentUser &&
          currentUser.awards.filter((item) => item.state == 'AWARD').length >
            4 ? (
            <div className={styles.countIcon}>
              +
              {currentUser &&
                currentUser.awards.filter((item) => item.state == 'AWARD')
                  .length - 4}
            </div>
          ) : (
            <div className={styles.countIconDisabled}></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CurrentUser;
