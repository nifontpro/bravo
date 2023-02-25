import { FC } from 'react';
import { useForm } from 'react-hook-form';
import Meta from '@/core/utils/meta/Meta';
import styles from './CompanyEdit.module.scss';
import Field from '@/core/presenter/ui/form/Field/Field';
import cn from 'classnames';
import { ImageDefault } from '@/core/presenter/ui/icons/ImageDefault';
import Htag from '@/core/presenter/ui/Htag/Htag';
import Button from '@/core/presenter/ui/Button/Button';
import { useRouter } from 'next/router';
import { useCompanyState } from '@/company/data/company.slice';
import ButtonCircleIcon from '@/core/presenter/ui/ButtonCircleIcon/ButtonCircleIcon';
import { useCompanyEdit } from './useCompanyEdit';
import { ICompanyUpdateRequest } from './company-edit.type';
import InputPhotoRefresh from '@/core/presenter/ui/InputPhotoRefresh/InputPhotoRefresh';
import ButtonEdit from '@/core/presenter/ui/ButtonEdit/ButtonEdit';

const UserEdit: FC = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    control,
  } = useForm<ICompanyUpdateRequest>({
    mode: 'onChange',
  });

  const { currentCompany } = useCompanyState();
  const { back } = useRouter();

  const { isLoading, onSubmit, changePhoto, removePhoto, img } =
    useCompanyEdit(setValue);

  const handleClick = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    back();
  };

  return (
    <Meta title='Редактирование компании'>
      <ButtonCircleIcon onClick={() => back()} appearance='black' icon='down'>
        Вернуться назад
      </ButtonCircleIcon>
      <form className={styles.form}>
        <div className={cn(styles.field, styles.uploadField)}>
          <div className={styles.images}>
            <ImageDefault
              src={img}
              width={400}
              height={400}
              alt='preview image'
              objectFit='cover'
              // priority={true}
              // className='rounded-[10px]'
            />
          </div>

          <div className={styles.editPanel}>
            <InputPhotoRefresh onChange={changePhoto} className={styles.input}>
              <ButtonEdit icon='refresh' />
            </InputPhotoRefresh>
            <ButtonEdit icon='remove' onClick={(e) => removePhoto(e)} />
          </div>
        </div>

        <div className={styles.fields}>
          <Htag tag='h2' className={styles.title}>
            Компания
          </Htag>

          <div
            className={cn(
              styles.field,
              styles.uploadField,
              styles.mediaVisible
            )}
          >
            <div className={styles.images}>
              <ImageDefault
                src={img}
                width={400}
                height={400}
                alt='preview image'
                objectFit='cover'
                // priority={true}
                // className='rounded-[10px]'
              />
            </div>

            <div className={styles.editPanel}>
              <InputPhotoRefresh
                onChange={changePhoto}
                className={styles.input}
              >
                <ButtonEdit icon='refresh' />
              </InputPhotoRefresh>
              <ButtonEdit icon='remove' onClick={removePhoto} />
            </div>
          </div>

          <Field
            {...register('name', { required: 'Название необходимо!' })}
            title='Название'
            placeholder={currentCompany?.name}
            error={errors.name}
            className={styles.field}
          />

          <div className={styles.group}>
            <Field
              {...register('phone', { required: 'Телефон обязательно!' })}
              title='Телефон'
              placeholder={currentCompany?.phone}
              error={errors.phone}
            />
            <Field
              {...register('email', {
                required: 'Почта обязательна!',
                minLength: 6,
              })}
              title='Почта'
              placeholder={currentCompany?.email}
              error={errors.email}
            />
          </div>

          <Field
            {...register('address', { required: 'Адрес обязательно!' })}
            title='Офис'
            placeholder={currentCompany?.address}
            error={errors.address}
            className={styles.field}
          />

          <div className={styles.buttons}>
            <Button
              onClick={handleClick}
              appearance='whiteBlack'
              size='l'
              className={styles.cancel}
            >
              Отменить
            </Button>
            <Button
              onClick={handleSubmit(onSubmit)}
              appearance='blackWhite'
              size='l'
              className={styles.confirm}
            >
              Изменить
            </Button>
          </div>
        </div>
      </form>
    </Meta>
  );
};

export default UserEdit;
