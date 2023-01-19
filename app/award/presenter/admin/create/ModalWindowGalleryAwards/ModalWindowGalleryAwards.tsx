import styles from './ModalWindowGalleryAwards.module.scss';
import cn from 'classnames';
import ExitIcon from '@/core/presenter/images/close.svg';
import { ForwardedRef, forwardRef } from 'react';
import { ModalWindowGalleryAwardsProps } from './ModalWindowGalleryAwards.props';
import Button from '@/core/presenter/ui/Button/Button';
import Htag from '@/core/presenter/ui/Htag/Htag';
import ChoiceItemImg from './ChoiceItemImg/ChoiceItemImg';
import { useModalWindowGalleryAwards } from './useModalWindowGalleryAwards';

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
    const { awardsGallery, imagesPreview, setImagesPreview, onSubmit } =
      useModalWindowGalleryAwards(create, setVisibleModal, setImg);

    return (
      <div
        className={cn(
          styles.modalWindow,
          {
            [styles.active]: visibleModal,
            [styles.hidden]: !visibleModal,
          },
          className
        )}
        {...props}
      >
        <div className={styles.module} ref={ref}>
          <ExitIcon
            onClick={() => setVisibleModal(false)}
            className={styles.exit}
          />
          <Htag tag='h2' className={styles.title}>
            Выберите медаль
          </Htag>

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
              onClick={() => setVisibleModal(false)}
              appearance='whiteBlack'
              size='l'
              className='w-[50%]'
            >
              Отменить
            </Button>
            <Button
              onClick={onSubmit}
              appearance='blackWhite'
              size='l'
              className='w-[50%] ml-[20px]'
            >
              {textBtn}
            </Button>
          </div>
        </div>
      </div>
    );
  }
);

ModalWindowGalleryAwards.displayName = 'ModalWindowGalleryAwards';
export default ModalWindowGalleryAwards;
