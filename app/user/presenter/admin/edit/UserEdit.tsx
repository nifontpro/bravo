import { ChangeEvent, FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Meta from '@/core/utils/meta/Meta';
import AdminNavigation from '@/admin/presenter/admin-navigation/AdminNavigation';
import Heading from '@/core/presenter/ui/heading/Heading';
import SkeletonLoader from '@/core/presenter/ui/sceleton-loader/SkeletonLoader';
import formStyles from '@/core/presenter/ui/form/admin-form.module.scss';
import styles from '@/core/presenter/ui/form/form.module.scss';
import Field from '@/core/presenter/ui/form/Field';
import Button from '@/core/presenter/ui/form/Button';
import cn from 'classnames';
import { useUserEdit } from '@/user/presenter/admin/edit/useUserEdit';
import { IUserEditInput } from '@/user/presenter/admin/edit/user-edit.type';
import { ImageDefault } from '@/core/presenter/ui/icons/ImageDefault';
import { ImageRef } from '@/core/model/image.types';
import uniqid from 'uniqid';

const UserEdit: FC = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm<IUserEditInput>({
    mode: 'onChange',
  });

  const [imagesArtem, setImageArtem] = useState<ImageRef[] | undefined>(
    undefined
  );
  const [numberUrl, setNumberUrl] = useState<number>(0);

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

  const handleRemove = () => {
    if (imagesArtem !== undefined) {
      if (imagesArtem.length == 1) {
        console.log('Нельзя удалить последнее изображение');
      } else {
        imagesArtem.splice(numberUrl, 1);
        setImageArtem(imagesArtem);
        setNumberUrl(0);
      }
    }
  };

  const onImageAdd = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      let obj: ImageRef = {
        imageUrl: URL.createObjectURL(event.target.files[0]),
        imageKey: uniqid(),
      };
      if (imagesArtem !== undefined) {
        let arr = [...imagesArtem];
        arr?.unshift(obj);
        setImageArtem(arr);
        setNumberUrl(0);
      }
    }
  };

  const { user, isLoading, onSubmit } = useUserEdit(setValue);

  useEffect(() => {
    setImageArtem(user?.images);
  }, [user]);

  console.log(user)

  return (
    <Meta title='Редактирование профиля сотрудника'>
      <AdminNavigation />
      <Heading title='Редактирование профиля сотрудника' />

      <form onSubmit={handleSubmit(onSubmit)} className={formStyles.form}>
        {isLoading ? (
          <SkeletonLoader count={3} />
        ) : (
          <>
            <div className='flex justify-center items-center my-10'>
              <div className='mr-10 relative'>
                {imagesArtem && <ImageDefault
                  src={imagesArtem[numberUrl].imageUrl}
                  width={150}
                  height={150}
                  alt='preview image'
                  objectFit='cover'
                  className='rounded-[10px]'
                /> }

                <div
                  onClick={handleNext}
                  className='absolute right-0 top-[45%] cursor-pointer bg-black text-white'
                >
                  Next
                </div>
                <div
                  onClick={handlePrev}
                  className='absolute left-0 top-[45%] cursor-pointer bg-black text-white'
                >
                  Prev
                </div>
                <div
                  onClick={handleRemove}
                  className='absolute right-0 top-0 cursor-pointer bg-black text-white'
                >
                  Remove
                </div>
              </div>

              <div className={cn(styles.field, styles.uploadField)}>
                <div className={styles.uploadFlex}>
                  <label>
                    <div>
                      <span>Добавить изображение</span>
                      <input type="file" {...register("file")} onChange={onImageAdd} />
                    </div>
                  </label>
                </div>
              </div>
            </div>

            <div className={formStyles.fields}>
              <Field
                {...register('lastname', { required: 'Фамилия необходима!' })}
                placeholder='Фамилия'
                error={errors.lastname}
                style={{ width: '31%' }}
              />

              <Field
                {...register('name', { required: 'Имя необходимо!' })}
                placeholder='Имя'
                error={errors.name}
                style={{ width: '31%' }}
              />

              <Field
                {...register('patronymic')}
                placeholder='Отчество'
                error={errors.patronymic}
                style={{ width: '31%' }}
              />

              <Field
                {...register('login')}
                placeholder='Логин (Уникальный)'
                error={errors.login}
                style={{ width: '31%' }}
              />

              <Field
                {...register('password')}
                placeholder='Пароль'
                error={errors.password}
                style={{ width: '31%' }}
              />

              <Field
                {...register('email')}
                placeholder='Email'
                error={errors.email}
                style={{ width: '31%' }}
              />

              <div className={formStyles.checkbox}>
                Член номинационной комиссии
                <input type='checkbox' {...register('isMNC')} />
              </div>
            </div>
            <Button className=''>Обновить</Button>
          </>
        )}
      </form>
    </Meta>
  );
};

export default UserEdit;
