import styles from './Awards.module.scss';
import Meta from '@/core/utils/meta/Meta';
import Htag from '@/core/presenter/ui/Htag/Htag';
import { AwardsProps } from './Awards.props';
import { useState } from 'react';
import SingleAward from './SingleAward/SingleAward';
import Link from 'next/link';
import { getAwardCreateUrl } from '@/core/config/api.config';
import { useRouter } from 'next/router';
import { useAward } from './useAward';
import AuthComponent from '@/core/providers/AuthProvider/AuthComponent';
import ButtonCircleIcon from '@/core/presenter/ui/ButtonCircleIcon/ButtonCircleIcon';
import TabTitle from '@/core/presenter/ui/TabTitle/TabTitle';
import SortButton from '@/core/presenter/ui/SortButton/SortButton';

const Awards = ({ company, className, ...props }: AwardsProps): JSX.Element => {
  const { awardsFull } = useAward('');

  let allAwards = awardsFull.filter((award) => award.state == 'AWARD');
  let allNominee = awardsFull.filter((award) => award.state == 'NOMINEE');

  const { push } = useRouter();

  const [active, setActive] = useState<'' | 'NOMINEE' | 'AWARD' | 'DELETE_USER'>('');

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
          <TabTitle
            active={active}
            setActive={setActive}
            count={awardsFull.length}
            onClickActive={''}
            className={styles.all}
          >
            Все
          </TabTitle>
          <TabTitle
            active={active}
            setActive={setActive}
            count={allAwards.length}
            onClickActive={'AWARD'}
            className={styles.award}
          >
            Награды
          </TabTitle>
          <TabTitle
            active={active}
            setActive={setActive}
            count={allNominee.length}
            onClickActive={'NOMINEE'}
            className={styles.nominee}
          >
            Номинации
          </TabTitle>
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
