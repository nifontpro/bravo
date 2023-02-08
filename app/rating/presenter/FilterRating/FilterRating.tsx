import styles from './FilterRating.module.scss';
import cn from 'classnames';
import uniqid from 'uniqid';
import { FilterRatingProps } from './FilterRating.props';
import Button from '@/core/presenter/ui/Button/Button';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import P from '@/core/presenter/ui/P/P';
import CheckedIcon from '@/core/presenter/images/checked.svg';

const FilterRating = ({
  departments,
  departSort,
  setDepartSort,
  state,
  setState,
  sortAward,
  setSortAward,
  className,
  ...props
}: FilterRatingProps): JSX.Element => {
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

  return (
    <div {...props} className={cn(styles.wrapper, className)}>
      <Button
        size='m'
        appearance='whiteBlack'
        className={styles.button}
        onClick={() => setVisibleFilter(!visibleFilter)}
      >
        Фильтры
      </Button>
      <AnimatePresence mode='wait'>
        {visibleFilter && (
          <motion.div
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
              {/* Сортировка по отделу */}
              <div className={styles.departs}>
                <P
                  size='xs'
                  fontstyle='thin'
                  color='gray'
                  className={styles.title}
                >
                  Отдел
                </P>
                <ul className={styles.list}>
                  <li
                    className={styles.listItem}
                    onClick={() => setDepartSort('')}
                  >
                    <div className={styles.circle}></div>
                    <CheckedIcon
                      className={cn(styles.checked, {
                        [styles.visible]: departSort == '',
                        [styles.hidden]: departSort != '',
                      })}
                    />
                    <P
                      size='s'
                      fontstyle='thin'
                      className={cn({
                        [styles.disabled]: departSort != '',
                      })}
                    >
                      Все отделы
                    </P>
                  </li>
                  {departments?.map((d) => {
                    return (
                      <li
                        key={uniqid()}
                        className={styles.listItem}
                        onClick={() => setDepartSort(d.id)}
                      >
                        <div className={styles.circle}></div>
                        <CheckedIcon
                          className={cn(styles.checked, {
                            [styles.visible]: departSort == d.id,
                            [styles.hidden]: departSort != d.id,
                          })}
                        />
                        <P
                          size='s'
                          fontstyle='thin'
                          className={cn({
                            [styles.disabled]: departSort != d.id,
                          })}
                        >
                          {d.name}
                        </P>
                      </li>
                    );
                  })}
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

              {/* Сортировка по наградам */}
              <div className={styles.sortAwards}>
                <P
                  size='xs'
                  fontstyle='thin'
                  color='gray'
                  className={styles.title}
                >
                  Показать
                </P>
                <ul className={styles.list}>
                  <li className={styles.listItem} onClick={() => setSortAward(false)}>
                    <div className={styles.circle}></div>
                    <CheckedIcon
                      className={cn(styles.checked, {
                        [styles.visible]: !sortAward,
                        [styles.hidden]: sortAward
                      })}
                    />
                    <P
                      size='s'
                      fontstyle='thin'
                      className={cn({
                        [styles.disabled]: sortAward,
                      })}
                    >
                      С наградами
                    </P>
                  </li>
                  <li className={styles.listItem} onClick={() => setSortAward(true)}>
                    <div className={styles.circle}></div>
                    <CheckedIcon
                      className={cn(styles.checked, {
                        [styles.visible]: sortAward,
                        [styles.hidden]: !sortAward,
                      })}
                    />
                    <P
                      size='s'
                      fontstyle='thin'
                      className={cn({
                        [styles.disabled]: !sortAward,
                      })}
                    >
                      Все
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

export default FilterRating;
