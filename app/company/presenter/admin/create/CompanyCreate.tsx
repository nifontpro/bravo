import { useForm } from 'react-hook-form';
import Meta from '@/core/utils/meta/Meta';
import styles from './CompanyCreate.module.scss';
import Field from '@/core/presenter/ui/form/Field/Field';
import cn from 'classnames';
import { useRouter } from 'next/router';
import Button from '@/core/presenter/ui/Button/Button';
import Htag from '@/core/presenter/ui/Htag/Htag';
import { CompanyCreateProps } from './CompanyCreate.props';
import { useCompanyCreate } from './useCompanyCreate';
import { ICompanyCreate } from '@/company/model/company.types';
import { ImageDefault } from '@/core/presenter/ui/icons/ImageDefault';
import InputFile from '@/core/presenter/ui/InputFile/InputFile';
import { ChangeEvent, useState } from 'react';
import ButtonCircleIcon from '@/core/presenter/ui/ButtonCircleIcon/ButtonCircleIcon';

const CompanyCreate = ({}: CompanyCreateProps): JSX.Element => {
  const { push, back } = useRouter();

  const [img, setImg] = useState<string>('');

  const changePhoto = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files !== null) {
      setImg(URL.createObjectURL(event.target.files[0]));
    }
  };

  const {
    handleSubmit,
    register,
    formState: { errors, isDirty, isValid },
    setValue,
  } = useForm<ICompanyCreate>({ mode: 'onChange' });

  const { onSubmit } = useCompanyCreate(setValue);

  const handleClick = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    back();
  };

  return (
    <Meta title='Создание новой компании'>
      <ButtonCircleIcon
        onClick={() => push('/company')}
        appearance='black'
        icon='down'
      >
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
            />
          </div>

          <InputFile
            error={errors.file}
            {...register('file', { onChange: changePhoto })}
          >
            Загрузить изображение
          </InputFile>
        </div>

        <div className={styles.fields}>
          <Htag tag='h2' className={styles.title}>
            Новая компания
          </Htag>

          <Field
            {...register('name', { required: 'Название необходимо!' })}
            title='Название'
            placeholder='Введите название компании'
            error={errors.name}
            className='mb-[60px]'
          />

          <div className={styles.group}>
            <Field
              {...register('phone', { required: 'Телефон обязательно!' })}
              title='Телефон'
              placeholder='Введите телефон компании'
              error={errors.phone}
            />
            <Field
              {...register('email', {
                required: 'Почта обязательна!',
                minLength: 6,
              })}
              title='Почта'
              placeholder='Введите почту'
              error={errors.email}
            />
          </div>

          <Field
            {...register('address', { required: 'Адрес обязательно!' })}
            title='Офис'
            placeholder='Введите адрес компании'
            error={errors.address}
          />

          <div className={styles.buttons}>
            <Button onClick={handleClick} appearance='whiteBlack' size='l'>
              Отменить
            </Button>
            <Button
              onClick={handleSubmit(onSubmit)}
              appearance='blackWhite'
              size='l'
              className='ml-[15px]'
              disabled={!isDirty || !isValid}
            >
              Добавить
            </Button>
          </div>
        </div>
      </form>
    </Meta>
  );
};

export default CompanyCreate;
