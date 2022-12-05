import { FC } from 'react';
import { useForm } from 'react-hook-form';
import Meta from '@/core/utils/meta/Meta';
import styles from './CompanyEdit.module.scss';
import Field from '@/core/presenter/ui/form/Field/Field';
// import { useUserEdit } from '@/user/presenter/admin/edit/useUserEdit';
// import { IUserEditInput } from '@/user/presenter/admin/edit/user-edit.type';
import cn from 'classnames';
import { ImageDefault } from '@/core/presenter/ui/icons/ImageDefault';
import InputFile from '@/core/presenter/ui/InputFile/InputFile';
import Htag from '@/core/presenter/ui/Htag/Htag';
// import InputRadio from '@/core/presenter/ui/InputRadio/InputRadio';
// import SelectArtem from '@/core/presenter/ui/SelectArtem/SelectArtem';
// import TextArea from '@/core/presenter/ui/TextArea/TextArea';
import Button from '@/core/presenter/ui/Button/Button';
import { useRouter } from 'next/router';
import { useCompanyState } from '@/company/data/company.slice';
// import { departmentApi } from '@/department/data/department.api';
// import { IOption } from '@/core/presenter/ui/select/select.interface';
import ButtonCircleIcon from '@/core/presenter/ui/ButtonCircleIcon/ButtonCircleIcon';
// import { ICompanyCreate } from '@/company/model/company.types';
import { useCompanyEdit } from './useCompanyEdit';
import { ICompanyUpdateRequest } from './company-edit.type';

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
  const { back, push } = useRouter();

  if (currentCompany === null) {
    push('/company');
  }

  const { isLoading, onSubmit, changePhoto, img } = useCompanyEdit(setValue);

  const handleClick = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    back()
  } 

  return (
    <Meta title='Редактирование компании'>
      <ButtonCircleIcon onClick={() => back()} appearance='black' icon='down'>
        Вернуться назад
      </ButtonCircleIcon>
      <div className={styles.newForm}>
        <div className={cn(styles.field, styles.uploadField)}>
          <ImageDefault
            src={img}
            width={300}
            height={300}
            alt='preview image'
            objectFit='cover'
            className='rounded-[10px]'
          />
          <InputFile onChange={changePhoto}>
            Загрузить новое изображение
          </InputFile>
        </div>

        <form className={styles.form}>
        <div className={styles.fields}>
          <Htag tag='h2' className={styles.title}>
            Компания
          </Htag>

          <Field
            {...register('name', { required: 'Название необходимо!' })}
            title='Название'
            placeholder={currentCompany?.name}
            error={errors.name}
            className='mb-[60px]'
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
          />

          <div className={styles.buttons}>
            <Button onClick={handleClick} appearance='white' size='l'>
              Отменить
            </Button>
            <Button onClick={handleSubmit(onSubmit)} appearance='gray' size='l' className='ml-[15px]'>
              Изменить
            </Button>
          </div>
        </div>
        </form>
      </div>
    </Meta>
  );
};

export default UserEdit;
