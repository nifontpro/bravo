import styles from './ChoiceItemImg.module.scss';
import { ChoiceItemImgProps } from './ChoiceItemImg.props';
import cn from 'classnames';
import { ImageDefault } from '@/core/presenter/ui/icons/ImageDefault';
import CheckedIcon from '@/core/presenter/images/checked.svg';
import { useState } from 'react';

const ChoiceItemImg = ({
  itemImg,
  imagesPreview,
  setImagesPreview,
  className,
  ...props
}: ChoiceItemImgProps): JSX.Element => {

  const handleClick = () => {
    setImagesPreview(itemImg)
  }

  return (
    <div
      className={cn(styles.wrapper, className)}
      onClick={handleClick}
      {...props}
    >
      <div className={styles.img}>
        <ImageDefault
          src={itemImg.imageUrl}
          width={150}
          height={150}
          alt={itemImg.name}
          objectFit='cover'
          // priority={true}
        />
      </div>
      <CheckedIcon
        className={cn(styles.searchIcon, {
          [styles.visible]: imagesPreview?.id == itemImg.id,
          [styles.hidden]: imagesPreview?.id !== itemImg.id,
        })}
      />
    </div>
  );
};

export default ChoiceItemImg;
