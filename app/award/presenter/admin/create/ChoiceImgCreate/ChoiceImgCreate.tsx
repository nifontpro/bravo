import styles from './ChoiceImgCreate.module.scss';
import { ChoiceImgCreateProps } from './ChoiceImgCreate.props';
import cn from 'classnames';
import { ImageDefault } from '@/core/presenter/ui/icons/ImageDefault';
import FilterModalGallery from '../ModalWindowGalleryAwards/FilterModalGallery/FilterModalGallery';
import Button from '@/core/presenter/ui/Button/Button';
import { MouseEvent } from 'react';

const ChoiceImgCreate = ({
  setVisibleModal,
  images,
  setImg,
  className,
  ...props
}: ChoiceImgCreateProps): JSX.Element => {
  const handleClick = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();
    setVisibleModal(true);
  };

  return (
    <div
      className={cn(styles.uploadField, styles.mediaVisible, className)}
      {...props}
    >
      <div className={styles.images}>
        <ImageDefault
          src={images?.imageUrl}
          width={400}
          height={400}
          alt='preview image'
          objectFit='cover'
          // priority={true}
        />
      </div>

      <div className={styles.choiceImg}>
        <Button
          // ref={refOpen}
          size='m'
          appearance='blackWhite'
          onClick={(e) => handleClick(e)}
          className={styles.button}
        >
          Загрузить изображение
        </Button>
      </div>

      {/* <FilterModalGallery images={images} setImg={setImg} /> */}
    </div>
  );
};

export default ChoiceImgCreate;
