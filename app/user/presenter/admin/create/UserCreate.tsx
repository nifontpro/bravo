import { FC, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Meta from '@/core/utils/meta/Meta';
import AdminNavigation from '@/admin/presenter/admin-navigation/AdminNavigation';
import Heading from '@/core/presenter/ui/heading/Heading';
import formStyles from '@/core/presenter/ui/form/admin-form.module.scss';
import styles from './UserCreate.module.scss';
import Field from '@/core/presenter/ui/form/Field/Field';
import cn from 'classnames';
import { IUserCreateInput } from '@/user/presenter/admin/create/user-create.type';
import Select from '@/core/presenter/ui/select/Select';
import { IOption } from '@/core/presenter/ui/select/select.interface';
import { useCompanyState } from '@/company/data/company.slice';
import { useDepartmentState } from '@/department/data/department.slice';
import { useUserCreate } from '@/user/presenter/admin/create/useUserCreate';
import { useRouter } from 'next/router';
import Button from '@/core/presenter/ui/Button/Button';
import { ImageDefault } from '@/core/presenter/ui/icons/ImageDefault';
import InputFile from '@/core/presenter/ui/InputFile/InputFile';

const UserCreate: FC = () => {
  const { push } = useRouter();

  const { currentCompany } = useCompanyState();
  // const { currentDepartment } = useDepartmentState();
  if (currentCompany === null) {
    push('/company');
  }
  console.log(currentCompany);

  const [img, setImg] = useState<string>('')

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    control,
  } = useForm<IUserCreateInput>({ mode: 'onChange' });

  const { onSubmit } = useUserCreate(
    setValue,
    currentCompany?.id,
    // currentDepartment?.id
  );

  /*
		const onSubmit: SubmitHandler<IUserCreateInput> = data => {
			console.log(`Создание пользователя ${data.role}`)
		}
	*/

  const roles: IOption[] = [
    { label: 'Администратор компании', value: 'admin' },
    { label: 'Директор отдела', value: 'director' },
    { label: 'Обычный сотрудник', value: 'user' },
  ];

  return (
    <Meta title='Создание профиля сотрудника'>
      {/* <AdminNavigation/>
		<Heading title="Создание профиля сотрудника"/> */}
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>

        <div className={cn(styles.field, styles.uploadField)}>
        <ImageDefault
              src={img}
              width={300}
              height={300}
              alt='preview image'
              objectFit='cover'
              className='rounded-[10px]'
            />
            <InputFile error={errors.file} {...register('file')}/>
        </div>

        <div className={styles.fields}>
          <Field
            {...register('lastname', { required: 'Фамилия необходима!' })}
            placeholder='Фамилия'
            error={errors.lastname}
          />

          <Field
            {...register('name', { required: 'Имя необходимо!' })}
            placeholder='Имя'
            error={errors.name}
          />

          <Field
            {...register('patronymic')}
            placeholder='Отчество'
            error={errors.patronymic}
          />

          <Field
            {...register('login')}
            placeholder='Логин (Уникальный)'
            error={errors.login}
          />

          <Field
            {...register('password', { required: 'Пароль обязателен!' })}
            placeholder='Пароль'
            error={errors.password}
          />

          <Field
            {...register('email')}
            placeholder='Email'
            error={errors.email}
          />

          <Controller
            name='role'
            control={control}
            rules={{
              required: 'Необходимо выбрать роль!',
            }}
            render={({ field, fieldState: { error } }) => (
              <Select
                error={error}
                field={field}
                placeholder='Роль'
                options={roles || []}
                isLoading={false}
                isMulti={false}
              />
            )}
          />
          <div className={styles.buttons}>
            <Button appearance='white' size='l'>
              Отменить
            </Button>
            <Button appearance='gray' size='l' className='ml-[15px]'>
              Добавить
            </Button>
          </div>
        </div>
      </form>
    </Meta>
  );
};

export default UserCreate;
