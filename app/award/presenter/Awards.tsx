import styles from './Awards.module.scss';
import Meta from '@/core/utils/meta/Meta';
import Htag from '@/core/presenter/ui/Htag/Htag';
import { AwardsProps } from './Awards.props';
import SingleAward from './SingleAward/SingleAward';
import Link from 'next/link';
import { getAwardCreateUrl } from '@/core/config/api.config';
import { useRouter } from 'next/router';
import AuthComponent from '@/core/providers/AuthProvider/AuthComponent';
import ButtonCircleIcon from '@/core/presenter/ui/ButtonCircleIcon/ButtonCircleIcon';
import TabTitle from '@/core/presenter/ui/TabTitle/TabTitle';
import SortButton from '@/core/presenter/ui/SortButton/SortButton';
import { useAwardsFull } from './useAwardsFull';
import uniqid from 'uniqid';
import ButtonScrollUp from '@/core/presenter/ui/ButtonScrollUp/ButtonScrollUp';
import FilterAwards from './FilterAwards/FilterAwards';
import SpinnerSmallBtnPagination from '@/core/presenter/ui/SpinnerSmallBtnPagination/SpinnerSmallBtnPagination';

const Awards = ({ company, className, ...props }: AwardsProps): JSX.Element => {
  const { push } = useRouter();
  const {
    awardsFull,
    isFetching,
    allAwards,
    allNominee,
    active,
    setActive,
    state,
    setState,
    arr,
    filteredValue,
    handleNextPage,
  } = useAwardsFull();

  return (
    <Meta title='Медали'>
      <div {...props} className={styles.wrapper}>
        <div className={styles.headerTitle}>
          <Htag tag='h2' className={styles.headTitle}>{`Награды`}</Htag>
          <AuthComponent minRole={'director'}>
            <div className={styles.createAwardAdaptive}>
              <ButtonCircleIcon
                onClick={() => push(getAwardCreateUrl())}
                appearance='black'
                icon='plus'
              >
                Создать
              </ButtonCircleIcon>
            </div>
          </AuthComponent>
        </div>

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
              <div className={styles.createAward}>
                <ButtonCircleIcon
                  onClick={() => push(getAwardCreateUrl())}
                  appearance='black'
                  icon='plus'
                >
                  Создать награду
                </ButtonCircleIcon>
              </div>
            </AuthComponent>
          </div>
        )}

        <FilterAwards
          state={state}
          setState={setState}
          active={active}
          setActive={setActive}
          allNominee={allNominee}
          allAwards={allAwards}
          awardsFull={arr}
        />

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
        <SpinnerSmallBtnPagination
          isFetching={isFetching}
          handleNextPage={handleNextPage}
          content={awardsFull}
          searchValue={''}
          btnSubmitTitle={'Показать еще'}
          btnEndTitle={'Показаны все награды'}
          className={styles.spinnerSmallBtnPagination}
        />

        <ButtonScrollUp />
      </div>
    </Meta>
  );
};

export default Awards;
