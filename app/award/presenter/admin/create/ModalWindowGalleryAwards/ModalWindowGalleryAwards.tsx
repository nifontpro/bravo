import styles from './ModalWindowGalleryAwards.module.scss';
import cn from 'classnames';
import ExitIcon from '@/core/presenter/images/close.svg';
import { ForwardedRef, forwardRef } from 'react';
import { ModalWindowGalleryAwardsProps } from './ModalWindowGalleryAwards.props';
import Button from '@/core/presenter/ui/Button/Button';
import Htag from '@/core/presenter/ui/Htag/Htag';
import ChoiceItemImg from './ChoiceItemImg/ChoiceItemImg';
import { useModalWindowGalleryAwards } from './useModalWindowGalleryAwards';
import Select, { OnChangeValue } from 'react-select';
import { IOption } from '@/core/presenter/ui/SelectArtem/SelectArtem.interface';
import makeAnimated from 'react-select/animated';
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
