import styles from './FilterModalGallery.module.scss';
import cn from 'classnames';
import { FilterModalGalleryProps } from './FilterModalGallery.props';
import Button from '@/core/presenter/ui/Button/Button';
import { MouseEvent, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import useOutsideClick from '@/core/hooks/useOutsideClick';
import ModalWindowGalleryAwards from '../ModalWindowGalleryAwards';
// import SortIcon from '@/core/presenter/images/sort.svg';
// import ChoiceUsers from '../ChoiceUsers/ChoiceUsers';
// import Htag from '@/core/presenter/ui/Htag/Htag';
// import P from '@/core/presenter/ui/P/P';
// import CheckedIcon from '@/core/presenter/images/checked.svg';

const FilterModalGallery = ({
  images,
  setImg,
  className,
  ...props
}: FilterModalGalleryProps): JSX.Element => {
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

  const handleClick = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();
    setVisibleFilter(!visibleFilter);
  };

  // //Закрытие модального окна уведомлений нажатием вне
  // const refFilter = useRef(null);
  // const refOpenFilter = useRef(null);
  // const handleClickOutsideNotification = () => {
  //   setVisibleFilter(false);
  // };
  // useOutsideClick(
  //   refFilter,
  //   refOpenFilter,
  //   handleClickOutsideNotification,
  //   visibleFilter
  // );

  return (
    <div {...props} className={cn(styles.wrapper, className)}>
      <Button
        // ref={refFilter}
        size='m'
        appearance='blackWhite'
        className={styles.button}
        onClick={(e) => handleClick(e)}
      >
        Загрузить изображение
      </Button>

      <AnimatePresence mode='wait'>
        {visibleFilter && (
          <motion.div
            // ref={refOpenFilter}
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
              <ModalWindowGalleryAwards
                img={images}
                setImg={setImg}
                visibleModal={visibleFilter}
                setVisibleModal={setVisibleFilter}
                textBtn='Подтвердить'
                // ref={ref}
                create={false}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FilterModalGallery;
