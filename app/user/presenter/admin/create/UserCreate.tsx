import { ChangeEvent, FC, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Meta from '@/core/utils/meta/Meta';
import AdminNavigation from '@/admin/presenter/admin-navigation/AdminNavigation';
import Heading from '@/core/presenter/ui/heading/Heading';
import formStyles from '@/core/presenter/ui/form/admin-form.module.scss';
import styles from './UserCreate.module.scss';
import Field from '@/core/presenter/ui/form/Field/Field';
import cn from 'classnames';
import { IUserCreateInput } from '@/user/presenter/admin/create/user-create.type';
// import Select from '@/core/presenter/ui/select/Select';
import { IOption } from '@/core/presenter/ui/select/select.interface';
import { useCompanyState } from '@/company/data/company.slice';
import { useDepartmentState } from '@/department/data/department.slice';
import { useUserCreate } from '@/user/presenter/admin/create/useUserCreate';
import { useRouter } from 'next/router';
import Button from '@/core/presenter/ui/Button/Button';
import { ImageDefault } from '@/core/presenter/ui/icons/ImageDefault';
import InputFile from '@/core/presenter/ui/InputFile/InputFile';
import Htag from '@/core/presenter/ui/Htag/Htag';
import TextArea from '@/core/presenter/ui/TextArea/TextArea';
import { departmentApi } from '@/department/data/department.api';
import SelectArtem from '@/core/presenter/ui/SelectArtem/SelectArtem';

const UserCreate: FC = () => {
  const { currentCompany } = useCompanyState();
  const { push } = useRouter();

  if (currentCompany === null) {
    push('/company');
  }

  // const { currentDepartment } = useDepartmentState();

  const { data: departments, isLoading } = departmentApi.useGetByCompanyQuery(
    currentCompany!.id
  );

  let arrDeparts: IOption[] = [];
  departments?.forEach((item) => {
    arrDeparts.push({
      label: item.name,
      value: item.id,
    });
  });

  // console.log(departments)
  // console.log(currentCompany);

  const [img, setImg] = useState<string>('');

  const changePhoto = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files !== null) {
      setImg(URL.createObjectURL(event.target.files[0]));
    }
  };

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    control,
  } = useForm<IUserCreateInput>({ mode: 'onChange' });

  const { onSubmit } = useUserCreate(
    setValue,
    currentCompany?.id
    // currentDepartment?.id
  );

  /*
		const onSubmit: SubmitHandler<IUserCreateInput> = data => {
			console.log(`Создание пользователя ${data.role}`)
		}
	*/

  // const roles: IOption[] = [
  //   { label: 'Администратор компании', value: 'admin' },
  //   { label: 'Директор отдела', value: 'director' },
  //   { label: 'Обычный сотрудник', value: 'user' },
  // ];

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
          <InputFile
            error={errors.file}
            {...register('file', { onChange: changePhoto })}
          />
        </div>

        <div className={styles.fields}>
          <Htag tag='h2' className={styles.title}>
            Новый сотрудник
          </Htag>

          <div className={styles.groupGender}>
            <Field
              {...register('lastname', { required: 'ФИО необходимо!' })}
              placeholder='Фамилия, Имя'
              error={errors.lastname}
              className='mb-[60px]'
            />
          </div>

          <div className={styles.group}>
            <Field
              {...register('login', { required: 'Логин обязательно!' })}
              placeholder='Логин'
              error={errors.login}
            />

            <Field
              {...register('password', { required: 'Пароль обязательно!' })}
              placeholder='Пароль'
              error={errors.password}
            />
          </div>

          <div className={styles.group}>
            {/* <div className={styles.currentCompany}>{currentCompany?.name}</div> */}
            <Field
              {...register('companyId', { required: 'Компания обязательно!' })}
              placeholder='Компания, отдел'
              value={currentCompany?.name}
              error={errors.companyId}
            />
            <Controller
              name='departmentId'
              control={control}
              rules={{
                required: 'Необходимо выбрать отдел!',
              }}
              render={({ field, fieldState: { error } }) => (
                <SelectArtem
                  error={error}
                  field={field}
                  placeholder=''
                  options={arrDeparts || []}
                  isLoading={false}
                  isMulti={false}
                />
              )}
            />
          </div>

          <Field
            {...register('post', { required: 'Должность необходима!' })}
            placeholder='Должность'
            error={errors.post}
            className='mb-[60px]'
          />

          <TextArea
            {...register('description', { required: 'Должность необходима!' })}
            placeholder='О сотруднике'
            error={errors.description}
            className='mb-[100px]'
          />

          {/* <Field
              {...register('name', { required: 'Имя необходимо!' })}
              placeholder='Имя'
              error={errors.name}
            /> */}

          {/* <Field
            {...register('patronymic')}
            placeholder='Отчество'
            error={errors.patronymic}
          /> */}

          {/* <Field
            {...register('login')}
            placeholder='Логин (Уникальный)'
            error={errors.login}
          /> */}

          {/* <Field
            {...register('password', { required: 'Пароль обязателен!' })}
            placeholder='Пароль'
            error={errors.password}
          /> */}

          {/* <Field
            {...register('email')}
            placeholder='Email'
            error={errors.email}
          /> */}

          {/* <Controller
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
          /> */}

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
