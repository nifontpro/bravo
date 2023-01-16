import { IGalleryObject } from 'gallery/model/gallery.types';
import { ButtonHTMLAttributes, DetailedHTMLProps, Dispatch, SetStateAction } from 'react';

export type ChoiceItemImgProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  itemImg: IGalleryObject,
  imagesPreview: IGalleryObject | undefined
  setImagesPreview: Dispatch<SetStateAction<IGalleryObject | undefined>>
};
