import styles from './ChoiceImgEdit.module.scss';
import { ChoiceImgEditProps } from './ChoiceImgEdit.props';
import cn from 'classnames';
import { ImageDefault } from '@/core/presenter/ui/icons/ImageDefault';
import Button from '@/core/presenter/ui/Button/Button';
import { MouseEvent } from 'react';
import FilterModalGallery from '../../create/ModalWindowGalleryAwards/FilterModalGallery/FilterModalGallery';
import ButtonEdit from '@/core/presenter/ui/ButtonEdit/ButtonEdit';

const ChoiceImgEdit = ({
  img,
  removePhoto,
  setVisibleModal,
  className,
  ...props
}: ChoiceImgEditProps): JSX.Element => {

  const handleClick = (
    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>
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
          src={img}
          width={400}
          height={400}
          alt='preview image'
          objectFit='cover'
          className={styles.img}
          // priority={true}
        />
      </div>

      <div className={styles.editPanel}>
        <ButtonEdit
          icon='refresh'
          className='mr-[10px]'
          // ref={refOpen}
          onClick={(e) => handleClick(e)}
        />
        <ButtonEdit icon='remove' onClick={(e) => removePhoto(e)} />
      </div>
      {/* <FilterModalGallery images={images} setImg={setImg} /> */}
    </div>
  );
};

export default ChoiceImgEdit;
