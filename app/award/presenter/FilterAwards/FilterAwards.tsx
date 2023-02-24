import styles from './FilterAwards.module.scss';
import cn from 'classnames';
import { FilterAwardsProps } from './FilterAwards.props';
import Button from '@/core/presenter/ui/Button/Button';
import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import P from '@/core/presenter/ui/P/P';
import CheckedIcon from '@/core/presenter/images/checked.svg';
import useOutsideClick from '@/core/hooks/useOutsideClick';
import SortIcon from '@/core/presenter/images/sort.svg';

const FilterAwards = ({
  state,
  setState,
  active,
  setActive,
  allNominee,
  allAwards,
  awardsFull,
  className,
  ...props
}: FilterAwardsProps): JSX.Element => {
  const [visibleFilter, setVisibleFilter] = useState<boolean>(false);

  const variants = {
    visible: {
      opacity: 1,
      y: 0,
    },
    hidden: {
      opacity: 0,
      y: '460px',
    },
    exit: {
      opacity: 0,
      y: '460px',
    },
  };

  //Закрытие модального окна уведомлений нажатием вне
  const refFilter = useRef(null);
  const refOpenFilter = useRef(null);
  const handleClickOutsideNotification = () => {
    setVisibleFilter(false);
  };
  useOutsideClick(
    refFilter,
    refOpenFilter,
    handleClickOutsideNotification,
    visibleFilter
  );

  return (
    <div {...props} className={cn(styles.wrapper, className)}>
      <Button
        ref={refFilter}
        size='m'
        appearance='whiteBlack'
        className={styles.button}
        onClick={() => setVisibleFilter(!visibleFilter)}
      >
        <SortIcon /> &emsp;Фильтры
      </Button>

      <AnimatePresence mode='wait'>
        {visibleFilter && (
          <motion.div
            ref={refOpenFilter}
            initial='hidden'
            animate='visible'
            exit='exit'
            variants={variants}
            transition={{ duration: 0.4 }}
            className={cn(styles.filterWrapper)}
          >
            <div
              className={styles.slash}
              onClick={() => setVisibleFilter(false)}
            />
            <div className={styles.filterContent}>
              {/* Сортировка по виду */}
              <div className={styles.departs}>
                <P
                  size='xs'
                  fontstyle='thin'
                  color='gray'
                  className={styles.title}
                >
                  Показать
                </P>
                <ul className={styles.list}>
                  <li className={styles.listItem} onClick={() => setActive('')}>
                    <div className={styles.circle}></div>
                    <CheckedIcon
                      className={cn(styles.checked, {
                        [styles.visible]: active == '',
                        [styles.hidden]: active != '',
                      })}
                    />
                    <P
                      size='s'
                      fontstyle='thin'
                      className={cn({
                        [styles.disabled]: active != '',
                      })}
                    >
                      Все награды
                      <span className={styles.count}>{awardsFull?.length}</span>
                    </P>
                  </li>
                  <li
                    className={styles.listItem}
                    onClick={() => setActive('AWARD')}
                  >
                    <div className={styles.circle}></div>
                    <CheckedIcon
                      className={cn(styles.checked, {
                        [styles.visible]: active == 'AWARD',
                        [styles.hidden]: active != 'AWARD',
                      })}
                    />
                    <P
                      size='s'
                      fontstyle='thin'
                      className={cn({
                        [styles.disabled]: active != 'AWARD',
                      })}
                    >
                      Медали
                      <span className={styles.count}>{allAwards?.length}</span>
                    </P>
                  </li>
                  <li
                    className={styles.listItem}
                    onClick={() => setActive('NOMINEE')}
                  >
                    <div className={styles.circle}></div>
                    <CheckedIcon
                      className={cn(styles.checked, {
                        [styles.visible]: active == 'NOMINEE',
                        [styles.hidden]: active != 'NOMINEE',
                      })}
                    />
                    <P
                      size='s'
                      fontstyle='thin'
                      className={cn({
                        [styles.disabled]: active != 'NOMINEE',
                      })}
                    >
                      Номинации
                      <span className={styles.count}>{allNominee?.length}</span>
                    </P>
                  </li>
                </ul>
              </div>

              {/* Сортировка по дате */}
              <div className={styles.sortDate}>
                <P
                  size='xs'
                  fontstyle='thin'
                  color='gray'
                  className={styles.title}
                >
                  Сортировать
                </P>
                <ul className={styles.list}>
                  <li className={styles.listItem} onClick={() => setState(1)}>
                    <div className={styles.circle}></div>
                    <CheckedIcon
                      className={cn(styles.checked, {
                        [styles.visible]: state == 1,
                        [styles.hidden]: state == -1,
                      })}
                    />
                    <P
                      size='s'
                      fontstyle='thin'
                      className={cn({
                        [styles.disabled]: state == -1,
                      })}
                    >
                      Cначала новые
                    </P>
                  </li>
                  <li className={styles.listItem} onClick={() => setState(-1)}>
                    <div className={styles.circle}></div>
                    <CheckedIcon
                      className={cn(styles.checked, {
                        [styles.visible]: state == -1,
                        [styles.hidden]: state == 1,
                      })}
                    />
                    <P
                      size='s'
                      fontstyle='thin'
                      className={cn({
                        [styles.disabled]: state == 1,
                      })}
                    >
                      Cначала старые
                    </P>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FilterAwards;
