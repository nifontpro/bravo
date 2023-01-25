import styles from './CurrentUser.module.scss';
import { CurrentUserProps } from './CurrentUser.props';
import cn from 'classnames';
import { ImageDefault } from '@/core/presenter/ui/icons/ImageDefault';
import uniqid from 'uniqid';
import Htag from '@/core/presenter/ui/Htag/Htag';
import ButtonIcon from '@/core/presenter/ui/ButtonIcon/ButtonIcon';
import AwardIcon from '@/core/presenter/images/union.svg';
import { getUserUrl } from '@/core/config/api.config';
import P from '@/core/presenter/ui/P/P';
import ArrowRightIcon from '@/core/presenter/images/arrowRight.svg';
import Link from 'next/link';

const CurrentUser = ({
  currentUser,
  currentUserIndex,
  className,
  ...props
}: CurrentUserProps): JSX.Element => {

  return (
    <div {...props} className={cn(styles.wrapper, className)}>
      <Link href={getUserUrl(`/${currentUser?.id}`)}>
        <a>
          <div
            key={uniqid()}
            className={styles.userWrapper}
            // onClick={() => push(getUserUrl(`/${currentUser?.id}`))}
          >
            <P
              size='s'
              fontstyle='thin'
              className={styles.numberOfRating}
              color='white'
            >
              #{currentUserIndex + 1}
            </P>
            <div className={styles.img}>
              <ImageDefault
                src={currentUser?.imageUrl}
                width={100}
                height={100}
                alt='preview image'
                objectFit='cover'
                className='rounded-[10px]'
                // priority={true}
              />
            </div>
            <div className={styles.user}>
              <P size='m' color='white'>
                {currentUser?.lastname} {currentUser?.name}
              </P>
              <div className={styles.userTag}>
                {currentUser?.post && (
                  <P size='s' fontstyle='thin' color='gray96'>
                    {currentUser?.post}
                  </P>
                )}
              </div>
            </div>
            {currentUser?.departmentName ? (
              <ButtonIcon className={styles.depart} appearance='graySilver'>
                {currentUser?.departmentName}
              </ButtonIcon>
            ) : (
              <ButtonIcon className={styles.depart} appearance='graySilver'>
                Нет отдела
              </ButtonIcon>
            )}
            {currentUser &&
            currentUser.awards.filter((item) => item.state == 'AWARD').length >=
              1 ? (
              <div className={styles.countAwards}>
                <Htag tag='h2' color='white'>
                  {
                    currentUser.awards.filter((item) => item.state == 'AWARD')
                      .length
                  }
                </Htag>
                <AwardIcon className={styles.union} />
              </div>
            ) : (
              <div className={styles.countAwardsDisable}>
                <Htag className={styles.disabled} tag='h2'>
                  {currentUser &&
                    currentUser.awards.filter((item) => item.state == 'AWARD')
                      .length}
                </Htag>
                <AwardIcon className={styles.union} />
              </div>
            )}
            <div className={styles.viewerAward}>
              {currentUser &&
                currentUser.awards
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
              {currentUser &&
              currentUser.awards.filter((item) => item.state == 'AWARD')
                .length > 3 ? (
                <ButtonIcon appearance='black' className={styles.countPreview}>
                  +
                  {currentUser.awards.filter((item) => item.state == 'AWARD')
                    .length - 3}
                </ButtonIcon>
              ) : (
                <div className={styles.countIconDisabled}></div>
              )}
            </div>
            <div className={styles.arrowRight}>
              <ArrowRightIcon />
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
};

export default CurrentUser;
