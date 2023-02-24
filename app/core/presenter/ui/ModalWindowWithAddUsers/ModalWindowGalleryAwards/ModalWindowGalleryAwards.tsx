import styles from './ModalWindowGalleryAwards.module.scss';
import cn from 'classnames';
import ExitIcon from '@/core/presenter/images/close.svg';
import { ForwardedRef, forwardRef, MouseEvent } from 'react';
import { ModalWindowGalleryAwardsProps } from './ModalWindowGalleryAwards.props';
import Button from '@/core/presenter/ui/Button/Button';
import Htag from '@/core/presenter/ui/Htag/Htag';
import ChoiceItemImg from './ChoiceItemImg/ChoiceItemImg';
import { useModalWindowGalleryAwards } from './useModalWindowGalleryAwards';
import Select, { OnChangeValue } from 'react-select';
import { IOption } from '@/core/presenter/ui/SelectArtem/SelectArtem.interface';
import makeAnimated from 'react-select/animated';
import { AnimatePresence, motion } from 'framer-motion';
import { useWindowSize } from '@/core/hooks/useWindowSize';
const animatedComponents = makeAnimated();

const ModalWindowGalleryAwards = forwardRef(
  (
    {
      img,
      setImg,
      textBtn,
      visibleModal,
      setVisibleModal,
      create,
      className,
      ...props
    }: ModalWindowGalleryAwardsProps,
    ref: ForwardedRef<HTMLDivElement>
  ): JSX.Element => {
    const {
      awardsGallery,
      imagesPreview,
      setImagesPreview,
      onSubmit,
      folders,
      setIdFolder,
    } = useModalWindowGalleryAwards(create, setVisibleModal, setImg);

    const { windowSize } = useWindowSize();

    const variants = {
      visible: {
        opacity: 1,
        // y: 0,
      },
      hidden: {
        opacity: 0,
        // y: '460px',
      },
      exit: {
        opacity: 0,
        // y: '460px',
      },
    };

    const variantsMedia = {
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

    let arrFolders: IOption[] = [];
    folders &&
      folders.forEach((item) => {
        arrFolders.push({
          label: item.name,
          value: item.id,
        });
      });
    const onChange = (newValue: unknown | OnChangeValue<IOption, boolean>) => {
      setIdFolder((newValue as IOption).value);
    };

    const handleCancel = (
      e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
    ) => {
      e.preventDefault();
      setVisibleModal(false);
    };

    return (
      <AnimatePresence mode='wait'>
        {visibleModal && (
          <motion.div
            className={styles.modalWindow}
            initial='hidden'
            animate='visible'
            exit='exit'
            variants={windowSize.winWidth > 768 ? variants : variantsMedia}
            transition={{ duration: 0.4 }}
          >
            <div
              className={styles.slash}
              onClick={() => setVisibleModal(false)}
            />
            <div className={styles.module} ref={ref}>
              <ExitIcon
                onClick={() => setVisibleModal(false)}
                className={styles.exit}
              />
              <Htag tag='h2' className={styles.title}>
                Выберите медаль
              </Htag>

              <Select
                classNamePrefix='custom-select-rating'
                placeholder={'Выберите папку с изображениями'}
                options={arrFolders}
                onChange={onChange}
                components={animatedComponents}
              />

              {
                <div className={cn(styles.wrapperChoiceImg)}>
                  {awardsGallery?.map((item) => {
                    return (
                      <ChoiceItemImg
                        itemImg={item}
                        key={item.id}
                        imagesPreview={imagesPreview}
                        setImagesPreview={setImagesPreview}
                      />
                    );
                  })}
                </div>
              }

              <div className={styles.buttons}>
                <Button
                  onClick={(e) => handleCancel(e)}
                  appearance='whiteBlack'
                  size='l'
                  className={styles.cancelBtn}
                >
                  Отменить
                </Button>
                <Button
                  onClick={(e) => onSubmit(e)}
                  appearance='blackWhite'
                  size='l'
                  className={styles.confirmBtn}
                >
                  {textBtn}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }
);

ModalWindowGalleryAwards.displayName = 'ModalWindowGalleryAwards';
export default ModalWindowGalleryAwards;
