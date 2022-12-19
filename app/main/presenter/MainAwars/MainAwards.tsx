import styles from './MainAwars.module.scss';
import { MainAwarsProps } from './MainAwars.props';
import cn from 'classnames';
import Htag from '@/core/presenter/ui/Htag/Htag';
import ArrowIcon from '@/core/presenter/images/arrowRight.svg';
import CupIcon from '@/core/presenter/images/cup.svg';
import PeopleIcon from '@/core/presenter/images/people.svg';
import UnionIcon from '@/core/presenter/images/union.svg';
import P from '@/core/presenter/ui/P/P';
import { useRouter } from 'next/router';
import { useAuthState } from '@/auth/data/auth.slice';

const MainAwars = ({
  awards,
  users,
  awardsOnCompanyGroupDep,
  className,
  ...props
}: MainAwarsProps): JSX.Element => {
  const { user } = useAuthState();
  // console.log(user);
  // console.log(users);
  const { push } = useRouter();
  let countAll = users.length;
  let countWithAward = users.filter((user) => user.awards.length > 0).length;
  let countWithAwardPercent = Math.ceil((countWithAward * 100) / countAll);

  let currentUser = users.find((item) => {
    if (item.id != undefined) {
      return item.id == user?.id;
    }
  });
  let positionRating = users.findIndex((item) => {
    if (item.id != undefined) {
      return item.id == user?.id;
    }
  });
  // console.log(currentUser);

  if (user?.role == 'user') {
    return (
      <div {...props} className={cn(styles.wrapper, className)}>
        <Htag tag='h2'>Медали</Htag>
        <div className={styles.content}>
          <div className={cn(styles.allAwards, styles.card)}>
            <div className='flex'>
              <CupIcon className={styles.img} />
              <div className={styles.description}>
                <P size='s'>Мои медали</P>
                <P size='xl'>{currentUser?.awards.length}</P>
              </div>
            </div>
            <ArrowIcon
              onClick={() => push('/statistic')}
              className={styles.arrow}
            />
          </div>
          <div className={cn(styles.countAwards, styles.card)}>
            <div className='flex'>
              <PeopleIcon className={styles.img} />
              <div className={styles.description}>
                <P size='s'>Место в рейтинге</P>
                <div className='flex items-start'>
                  <P size='xl'>{positionRating}</P>
                  <P size='l'>#</P>
                </div>
              </div>
            </div>
            <ArrowIcon
              onClick={() => push('/statistic')}
              className={styles.arrow}
            />
          </div>
          <div className={cn(styles.bestDepart, styles.card)}>
            <div className='flex'>
              <UnionIcon className={styles.img} />
              <div className={styles.description}>
                <P size='s'>Последняя медаль</P>
                <div>
                  <P size='xs' fontstyle='thin'>
                    {currentUser?.awards[0] && currentUser?.awards[0].name}
                  </P>
                </div>
              </div>
            </div>
            <ArrowIcon
              onClick={() => push('/statistic')}
              className={styles.arrow}
            />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div {...props} className={cn(styles.wrapper, className)}>
        <Htag tag='h2'>Медали</Htag>
        <div className={styles.content}>
          <div className={cn(styles.allAwards, styles.card)}>
            <div className='flex'>
              <CupIcon className={styles.img} />
              <div className={styles.description}>
                <P size='s'>Наград в компании</P>
                <P size='xl'>{awards.length}</P>
              </div>
            </div>
            <ArrowIcon
              onClick={() => push('/statistic')}
              className={styles.arrow}
            />
          </div>
          <div className={cn(styles.countAwards, styles.card)}>
            <div className='flex'>
              <PeopleIcon className={styles.img} />
              <div className={styles.description}>
                <P size='s'>Есть награды</P>
                <div className='flex items-end'>
                  <P size='xl'>{countWithAward}</P>
                  <P size='l' color='gray' className={styles.percent}>
                    {countWithAwardPercent} %
                  </P>
                </div>
              </div>
            </div>
            <ArrowIcon
              onClick={() => push('/statistic')}
              className={styles.arrow}
            />
          </div>
          <div className={cn(styles.bestDepart, styles.card)}>
            <div className='flex'>
              <UnionIcon className={styles.img} />
              <div className={styles.description}>
                <P size='s' fontstyle='thin'>
                  Лучший отдел
                </P>
                <P size='m' className={styles.countAwardsTitle}>
                  {awardsOnCompanyGroupDep[0] &&
                    awardsOnCompanyGroupDep[0].id.name}
                </P>
              </div>
            </div>
            <ArrowIcon
              onClick={() => push('/statistic')}
              className={styles.arrow}
            />
          </div>
        </div>
      </div>
    );
  }
};

export default MainAwars;
