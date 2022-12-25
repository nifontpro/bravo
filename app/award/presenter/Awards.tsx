import styles from './Awards.module.scss';
import Meta from '@/core/utils/meta/Meta';
import Htag from '@/core/presenter/ui/Htag/Htag';
import { AwardsProps } from './Awards.props';
import { useState } from 'react';
import cn from 'classnames';
import SortButton from '@/core/presenter/ui/SortButton/EditPanel/SortButton';
import SingleAward from './SingleAward/SingleAward';
import Link from 'next/link';
import { getAwardCreateUrl } from '@/core/config/api.config';
import { useRouter } from 'next/router';
import { useAward } from './useAward';
import { useAuthState } from '@/auth/data/auth.slice';
import AuthComponent from '@/core/providers/AuthProvider/AuthComponent';
import P from '@/core/presenter/ui/P/P';
import ButtonCircleIcon from '@/core/presenter/ui/ButtonCircleIcon/ButtonCircleIcon';

const Awards = ({ company, className, ...props }: AwardsProps): JSX.Element => {
  const { awardsFull } = useAward('');

  let allAwards = awardsFull.filter((award) => award.state == 'AWARD');
  let allNominee = awardsFull.filter((award) => award.state == 'NOMINEE');

  const { push } = useRouter();

  const [active, setActive] = useState<'' | 'AWARD' | 'NOMINEE'>('');

  const [state, setState] = useState<1 | -1>(1);

  const filteredValue = awardsFull?.filter((item) =>
    item.state?.includes(active)
  );

  // Сотртировка по startDate
  if (filteredValue !== undefined) {
    filteredValue.sort((prev, next): number => {
      if (prev.startDate !== undefined && next.startDate !== undefined) {
        if (prev?.startDate > next?.startDate) return state; //(-1)
      }
      return 1;
    });
  }

  return (
    <Meta title='Медали'>
      <div {...props} className={styles.wrapper}>
        <Htag tag='h2' className={styles.headTitle}>{`Награды`}</Htag>

        <div className={styles.header}>
          <Htag
            tag='h3'
            color='gray'
            onClick={() => setActive('')}
            className={cn(styles.all, {
              [styles.active]: active == '',
            })}
          >
            Все
            <P
              size='s'
              color={active == '' ? 'black' : 'gray96'}
              className={styles.awardsCount}
            >
              {awardsFull.length}
            </P>
          </Htag>
          <Htag
            tag='h3'
            color='gray'
            onClick={() => setActive('AWARD')}
            className={cn(styles.award, {
              [styles.active]: active == 'AWARD',
            })}
          >
            Награды
            <P
              size='s'
              color={active == 'AWARD' ? 'black' : 'gray96'}
              className={styles.awardsCount}
            >
              {allAwards.length}
            </P>
          </Htag>
          <Htag
            tag='h3'
            color='gray'
            onClick={() => setActive('NOMINEE')}
            className={cn(styles.nominee, {
              [styles.active]: active == 'NOMINEE',
            })}
          >
            Номинации
            <P
              size='s'
              color={active == 'NOMINEE' ? 'black' : 'gray96'}
              className={styles.awardsCount}
            >
              {allNominee.length}
            </P>
          </Htag>
          <SortButton
            state={state}
            onClick={() => (state == 1 ? setState(-1) : setState(1))}
            className={styles.sort}
          >
            Сначала новые
          </SortButton>

          <AuthComponent minRole={'director'}>
            <ButtonCircleIcon
              onClick={() => push(getAwardCreateUrl())}
              appearance='black'
              icon='plus'
              className='font-bold'
            >
              Создать награду
            </ButtonCircleIcon>
          </AuthComponent>
        </div>

        <div className={styles.cards}>
          {filteredValue?.map((item) => {
            return (
              <Link key={item.id} href={'/award/' + item.id}>
                <a>
                  <SingleAward award={item} />
                </a>
              </Link>
            );
          })}
        </div>
      </div>
    </Meta>
  );
};

export default Awards;
