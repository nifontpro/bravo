import { awardApi } from '@/award/data/award.api';
import { galleryApi } from 'gallery/data/gallery.api';
import { IGalleryObject } from 'gallery/model/gallery.types';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction, useState } from 'react';
import { toast } from 'react-toastify';

export const useModalWindowGalleryAwards = (
  create: boolean,
  setVisibleModal: Dispatch<SetStateAction<boolean>>,
  setImg?: Dispatch<SetStateAction<IGalleryObject | undefined>>
) => {
  const { query } = useRouter();
  const awardId = String(query.id);

  const { data: awardsGallery } = galleryApi.useGetGalleryObjectsQuery({
    folderId: '63c52aacf615255dd0f15d75',
  });

  const [imagesPreview, setImagesPreview] = useState<
    IGalleryObject | undefined
  >(undefined);

  const [setImage] = awardApi.useSetImageFromGalleryMutation();

  const onSubmit = async () => {
    if (imagesPreview) {
      if (!create && setImg) {
        setImg(imagesPreview);
        setVisibleModal(false);
      } else {
        let isError = false;
        await setImage({
          awardId: awardId,
          galleryItemId: imagesPreview.id,
        })
          .unwrap()
          .catch(() => {
            isError = true;
            toast.error('Ошибка добавления фото награды');
          });
        if (!isError) {
          toast.success('Фото успешно обновлено');
          setVisibleModal(false);
        }
      }
    }
  };
  return {awardsGallery, imagesPreview, setImagesPreview, onSubmit};
};
