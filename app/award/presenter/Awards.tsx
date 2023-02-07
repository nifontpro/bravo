import styles from './Awards.module.scss';
import Meta from '@/core/utils/meta/Meta';
import Htag from '@/core/presenter/ui/Htag/Htag';
import { AwardsProps } from './Awards.props';
import { useEffect, useState } from 'react';
import SingleAward from './SingleAward/SingleAward';
import Link from 'next/link';
import { getAwardCreateUrl } from '@/core/config/api.config';
import { useRouter } from 'next/router';
import AuthComponent from '@/core/providers/AuthProvider/AuthComponent';
import ButtonCircleIcon from '@/core/presenter/ui/ButtonCircleIcon/ButtonCircleIcon';
import TabTitle from '@/core/presenter/ui/TabTitle/TabTitle';
import SortButton from '@/core/presenter/ui/SortButton/SortButton';
import { useAwardsFull } from './useAwardsFull';
import { IAwardUsers } from '../model/award.types';
import uniqid from 'uniqid';

const Awards = ({ company, className, ...props }: AwardsProps): JSX.Element => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const { awardsFull, direction, setDirection, isFetching } =
    useAwardsFull(currentPage);
  const [arr, setArr] = useState<IAwardUsers[]>([]);
  const [state, setState] = useState<1 | -1>(1);

  // useEffect(() => {
  //   if (awardsFull) setArr([...arr, ...awardsFull]);
  // }, [awardsFull]);

  let allAwards = arr?.filter((award) => award.state == 'AWARD');
  let allNominee = arr?.filter((award) => award.state == 'NOMINEE');

  const { push } = useRouter();

  const [active, setActive] = useState<
    '' | 'NOMINEE' | 'AWARD' | 'DELETE_USER'
  >('');

  // useEffect(() => {
  //   document.addEventListener('scroll', scrollHandler);
  //   return function () {
  //     document.removeEventListener('scroll', scrollHandler);
  //   };
  // }, []);

  // const scrollHandler = (e) => {
  //   if (
  //     e.target.documentElement.scrollHeight -
  //       (e.target.documentElement.scrollTop + window.innerHeight) <
  //       10 &&
  //     !isFetching
  //   ) {
  //     setCurrentPage((prev) => prev + 1);
  //   }
  // };

  // Сотртировка по startDate
    const filteredValue = (arr?.filter((item) => item.state?.includes(active)))

  if (filteredValue) {
    filteredValue.sort((prev, next): number => {
      if (prev.startDate !== undefined && next.startDate !== undefined) {
        if (prev?.startDate > next?.startDate) return state; //(-1)
      }
      return 1;
    });
  }



  console.log(filteredValue);
  console.log(state);
  // console.log(currentPage);
  // console.log(isFetching);

  return (
    <Meta title='Медали'>
      <div {...props} className={styles.wrapper}>
        <Htag tag='h2' className={styles.headTitle}>{`Награды`}</Htag>

        {awardsFull && allAwards && allNominee && (
          <div className={styles.header}>
            <TabTitle
              active={active}
              setActive={setActive}
              count={arr.length}
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
        )}

        <div className={styles.cards}>
          {filteredValue?.map((item) => {
            return (
              <Link key={uniqid()} href={'/award/' + item.id}>
                <a>
                  <SingleAward layout award={item} />
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
