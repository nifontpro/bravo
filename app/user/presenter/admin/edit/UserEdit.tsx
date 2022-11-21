import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Meta from '@/core/utils/meta/Meta';
import AdminNavigation from '@/admin/presenter/admin-navigation/AdminNavigation';
import Heading from '@/core/presenter/ui/heading/Heading';
import SkeletonLoader from '@/core/presenter/ui/sceleton-loader/SkeletonLoader';
import formStyles from '@/core/presenter/ui/form/admin-form.module.scss';
import Field from '@/core/presenter/ui/form/Field/Field';
import Button from '@/core/presenter/ui/form/Button';
import { useUserEdit } from '@/user/presenter/admin/edit/useUserEdit';
import { IUserEditInput } from '@/user/presenter/admin/edit/user-edit.type';
import { ImageRef } from '@/core/model/image.types';

import EditUserPhotos from './EditUserPhotos/EditUserPhotos';

const UserEdit: FC = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm<IUserEditInput>({
    mode: 'onChange',
  });

  const [image, setImage] = useState<string | undefined>(undefined);
  const [imagesArtem, setImageArtem] = useState<ImageRef[] | undefined>(
    undefined
  );

  const { user, isLoading, onSubmit } = useUserEdit(setValue);

  useEffect(() => {
    setImageArtem(user?.images);
    setImage(user?.imageUrl);
  }, [user]);

  return (
    <Meta title='Редактирование профиля сотрудника'>
      <AdminNavigation />
      <Heading title='Редактирование профиля сотрудника' />

      <EditUserPhotos imagesArtem={imagesArtem} image={image} setImageArtem={setImageArtem}/>

      <form onSubmit={handleSubmit(onSubmit)} className={formStyles.form}>
        {isLoading ? (
          <SkeletonLoader count={3} />
        ) : (
          <>
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
