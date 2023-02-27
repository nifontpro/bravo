import { ChangeEvent, FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Meta from '@/core/utils/meta/Meta';
import SkeletonLoader from '@/core/presenter/ui/sceleton-loader/SkeletonLoader';
import styles from './DepartmentEdit.module.scss';
import Field from '@/core/presenter/ui/form/Field/Field';
import { IDepartmentEditInput } from '@/department/presenter/admin/edit/department-edit.type';
import { useDepartmentEdit } from '@/department/presenter/admin/edit/useDepartmentEdit';
import { ImageDefault } from '@/core/presenter/ui/icons/ImageDefault';
import Htag from '@/core/presenter/ui/Htag/Htag';
import Button from '@/core/presenter/ui/Button/Button';
import { useRouter } from 'next/router';
import ButtonCircleIcon from '@/core/presenter/ui/ButtonCircleIcon/ButtonCircleIcon';

const DepartmentEdit: FC = () => {
  const { back } = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm<IDepartmentEditInput>({
    mode: 'onChange',
  });

  const { department, isLoading, onSubmit } = useDepartmentEdit(setValue);

  // console.log(department)

  const [image, setImage] = useState<string | undefined>(undefined);

  const onImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  useEffect(() => {
    setImage(department?.imageUrl);
  }, [department]);

  const handleClick = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    back();
  };

  return (
    <Meta title='Редактирование отдела'>
      <ButtonCircleIcon onClick={() => back()} appearance='black' icon='down'>
        Вернуться назад
      </ButtonCircleIcon>
      <form className={styles.form}>
        {isLoading ? (
          <SkeletonLoader count={3} />
        ) : (
          <>
            {/* Скрыто так как нет фото в редактирование */}
            <div className='hidden'>
              <div className={styles.uploadFlex}>
                <label>
                  <ImageDefault
                    src={image}
                    width={150}
                    height={150}
                    alt='preview image'
                    objectFit='cover'
                    className='rounded-xl'
                    // priority={true}
                  />
                  <div>
                    <span>Выберите новое изображение</span>
                    <input
                      type='file'
                      {...register('file')}
                      onChange={onImageChange}
                    />
                  </div>
                </label>
              </div>
            </div>
            {/* Скрыто так как нет фото в редактирование */}

            <Htag tag='h2' className={styles.title}>
              Отдел
            </Htag>

            <Field
              {...register('name', { required: 'Название необходимо!' })}
              title='Название отдела'
              placeholder={department?.name}
              error={errors.name}
              className={styles.field}
            />

            <Field
              {...register('description', {
                required: 'Описание необходимо!',
              })}
              title='Чем занимается'
              placeholder={department?.description}
              error={errors.description}
            />

            <div className={styles.btn}>
              <Button
                onClick={handleClick}
                size='l'
                appearance='whiteBlack'
                className={styles.cancel}
              >
                Отменить
              </Button>
              <Button
                onClick={handleSubmit(onSubmit)}
                size='l'
                appearance='blackWhite'
                className={styles.confirm}
              >
                Сохранить
              </Button>
            </div>
          </>
        )}
      </form>
    </Meta>
  );
};

export default DepartmentEdit;
