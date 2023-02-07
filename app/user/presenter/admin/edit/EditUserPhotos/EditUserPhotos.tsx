import styles from './EditUserPhotos.module.scss';
import cn from 'classnames';
import { EditUserPhotosProps } from './EditUserPhotos.props';
import {ImageDefault} from "@/core/presenter/ui/icons/ImageDefault";
import { ChangeEvent, useState } from 'react';
import styleses from '@/core/presenter/ui/form/form.module.scss';
import { userApi } from '@/user/data/user.api';
import { useRouter } from 'next/router';
import ArrowNextPrev from '@/core/presenter/ui/arrowNextPrev/ArrowNextPrev';

const EditUserPhotos = ({
  imagesArtem,
  setImageArtem,
  image,
  className,
  ...props
}: EditUserPhotosProps): JSX.Element => {
  const { query } = useRouter();
  const userId = String(query.id);

  const [numberUrl, setNumberUrl] = useState<number>(0);
  const [addImage] = userApi.useImageAddMutation();
  const [removeImage] = userApi.useImageDeleteMutation();

  const handleNext = () => {
    if (imagesArtem !== undefined) {
      if (numberUrl < imagesArtem.length - 1) {
        setNumberUrl((prev) => prev + 1);
      }
      if (numberUrl == imagesArtem.length - 1) {
        setNumberUrl(0);
      }
    }
  };

  const handlePrev = () => {
    if (imagesArtem !== undefined) {
      if (numberUrl > 0) {
        setNumberUrl((prev) => prev - 1);
      }
      if (numberUrl == 0) {
        setNumberUrl(imagesArtem.length - 1);
      }
    }
  };

  const handleRemove = async () => {
    if (imagesArtem !== undefined) {
      let imageKey = imagesArtem[numberUrl].imageKey;
      setNumberUrl(0);
      await removeImage({
        userId: userId,
        imageKey: imageKey,
      }).unwrap();
    }
  };

  const onImageAdd = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files != undefined && imagesArtem !== undefined) {
      const formData = new FormData();
      let description: string = event.target.files[0]!.type;
      formData.append('imageUrl', event.target.files[0]);
      formData.append('userId', userId);
      formData.append('description', description);
      await addImage(formData).unwrap()
      ;
    }
  }

  return (
    <div className={cn(className, styles.editPhoto)} {...props}>
      <div className={styles.photos}>
        {imagesArtem && imagesArtem.length > 0 ? (
          <>
            <ImageDefault
              src={imagesArtem[numberUrl].imageUrl}
              width={300}
              height={300}
              alt='preview image'
              objectFit='cover'
              className='rounded-[10px]'
              // priority={true}
            />
            <ArrowNextPrev
              className='absolute right-[10px] top-[45%]'
              onClick={handleNext}
              size='l'
              direction='right'
            />
            <ArrowNextPrev
              className='absolute left-[10px] top-[45%]'
              onClick={handlePrev}
              size='l'
              direction='left'
            />
            <div
              onClick={handleRemove}
              className='absolute right-0 top-0 cursor-pointer bg-black text-white'
            >
              Remove
            </div>
          </>
        ) : (
          <ImageDefault
            src={image}
            width={300}
            height={300}
            alt='preview image'
            objectFit='cover'
            className='rounded-[10px]'
            // priority={true}
          />
        )}
      </div>
      <div className={styles.input}>
        <div className={cn(styleses.field, styleses.uploadField)}>
          <div className={styleses.uploadFlex}>
            <label>
              <div>
                <span>Добавить изображение</span>
                <input type='file' onChange={onImageAdd} />
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUserPhotos;
