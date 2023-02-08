import styles from './Activity.module.scss';
import Meta from '@/core/utils/meta/Meta';
import { ActivityProps } from './Activity.props';
import Htag from '@/core/presenter/ui/Htag/Htag';
import SortButton from '@/core/presenter/ui/SortButton/SortButton';
import TabTitle from '@/core/presenter/ui/TabTitle/TabTitle';
import { useActivity } from './useActivity';
import SingleActivity from './SingleActivity/SingleActivity';
import Search from '@/core/presenter/ui/Search/Search';
import RangeCalendar from '@/core/presenter/ui/RangeCalendar/RangeCalendar';
import { useWindowSize } from '@/core/hooks/useWindowSize';
import FilterActivity from './FilterActivity/FilterActivity';

const Activity = ({
  company,
  className,
  ...props
}: ActivityProps): JSX.Element => {
  const {
    active,
    setActive,
    allActivityLength,
    awardsLength,
    nomineeLength,
    otherLength,
    state,
    setState,
    setStartDate,
    setEndDate,
    handleChange,
    filteredValue,
  } = useActivity();

  const { windowSize } = useWindowSize();

  return (
    <Meta title='Активность'>
      <div {...props} className={styles.wrapper}>
        <Htag tag='h2' className={styles.headTitle}>
          Активность
        </Htag>

        <FilterActivity
          active={active}
          setActive={setActive}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          state={state}
          setState={setState}
        />

        <div className={styles.header}>
          <TabTitle
            active={active}
            setActive={setActive}
            count={allActivityLength}
            onClickActive={''}
            className={styles.all}
          >
            Все
          </TabTitle>
          <TabTitle
            active={active}
            setActive={setActive}
            count={awardsLength}
            onClickActive={'AWARD'}
            className={styles.award}
          >
            Медали
          </TabTitle>
          <TabTitle
            active={active}
            setActive={setActive}
            count={nomineeLength}
            onClickActive={'NOMINEE'}
            className={styles.nominee}
          >
            Номинации
          </TabTitle>
          <TabTitle
            active={active}
            setActive={setActive}
            count={otherLength}
            onClickActive={'DELETE_USER'}
            className={styles.other}
          >
            Прочее
          </TabTitle>

          <SortButton
            state={state}
            onClick={() => (state == 1 ? setState(-1) : setState(1))}
            className={styles.sort}
          >
            Сначала новые
          </SortButton>

          <RangeCalendar placement='bottomLeft' setStartDate={setStartDate} setEndDate={setEndDate} />
        </div>

        <div className={styles.cards}>
          <Search
            onChange={handleChange}
            placeholder={
              windowSize.winWidth < 768 ? 'Поиск...' : 'Фамилия, Имя, Отдел...'
            }
            color='white'
            button={false}
            search={true}
            className={styles.search}
          />
          {filteredValue?.map((item) => {
            return (
              <SingleActivity
                activity={item}
                key={item.id}
                className={styles.activity}
              />
            );
          })}
        </div>
      </div>
    </Meta>
  );
};

export default Activity;
