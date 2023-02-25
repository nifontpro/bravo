import { ChangeEvent, FC, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Meta from '@/core/utils/meta/Meta';
import styles from './UserCreate.module.scss';
import Field from '@/core/presenter/ui/form/Field/Field';
import cn from 'classnames';
import { IUserCreateInput } from '@/user/presenter/admin/create/user-create.type';
import { IOption } from '@/core/presenter/ui/select/select.interface';
import { useCompanyState } from '@/company/data/company.slice';
import { useUserCreate } from '@/user/presenter/admin/create/useUserCreate';
import { useRouter } from 'next/router';
import Button from '@/core/presenter/ui/Button/Button';
import { ImageDefault } from '@/core/presenter/ui/icons/ImageDefault';
import InputFile from '@/core/presenter/ui/InputFile/InputFile';
import Htag from '@/core/presenter/ui/Htag/Htag';
import TextArea from '@/core/presenter/ui/TextArea/TextArea';
import { departmentApi } from '@/department/data/department.api';
import SelectArtem from '@/core/presenter/ui/SelectArtem/SelectArtem';
import InputRadio from '@/core/presenter/ui/InputRadio/InputRadio';
import ButtonCircleIcon from '@/core/presenter/ui/ButtonCircleIcon/ButtonCircleIcon';
import { useDepartment } from '@/department/presenter/useDepartment';
import { IUserCreate } from '@/user/model/user.types';

const UserCreate: FC = () => {
  const [active, setActive] = useState<
    'MALE' | 'FEMALE' | 'UNDEFINED' | undefined
  >('MALE');
  const { currentCompany } = useCompanyState();
  const { push, back } = useRouter();

  // if (currentCompany === null) {
  //   push('/company');
  // }

  // const { currentDepartment } = useDepartmentState();

  const { departmentInCompany: departments } = useDepartment('');

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
    reset,
    handleSubmit,
    register,
    formState: { errors, isDirty, isValid },
    setValue,
    control,
  } = useForm<IUserCreate>({ mode: 'onChange' });

  const { onSubmit } = useUserCreate(
    setValue,
    active,
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

  const handleClick = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    back();
  };

  return (
    <Meta title='Создание профиля сотрудника'>
      <ButtonCircleIcon onClick={back} appearance='black' icon='down'>
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

          <InputFile
            error={errors.file}
            {...register('file', { onChange: changePhoto })}
          >
            Загрузить изображение
          </InputFile>
        </div>

        <div className={styles.fields}>
          <Htag tag='h2' className={styles.title}>
            Новый сотрудник
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

            <InputFile
              error={errors.file}
              {...register('file', { onChange: changePhoto })}
              className={styles.downloadBtn}
            >
              Загрузить изображение
            </InputFile>
          </div>

          <div className={styles.groupGender}>
            <Field
              {...register('lastname', { required: 'Фамилия необходима!' })}
              title='Фамилия'
              placeholder='Введите Фамилию'
              error={errors.lastname}
            />
            <InputRadio
              active={active}
              setActive={setActive}
              className={styles.gender}
            />
          </div>

          <div className={styles.group}>
            <Field
              {...register('name', { required: 'Имя обязательно!' })}
              title='Имя'
              placeholder='Введите имя'
              error={errors.name}
            />

            <Field
              {...register('patronymic', {
                required: 'Отчество обязательно!',
                minLength: 6,
              })}
              title='Отчество'
              placeholder='Отчество пароль'
              error={errors.patronymic}
            />
          </div>

          <div className={styles.group}>
            <Field
              {...register('login', { required: 'Логин обязательно!' })}
              title='Логин'
              placeholder='Введите свой логин'
              error={errors.login}
            />

            {/* <Field
              // {...register('password', {
              //   required: 'Пароль обязательно!',
              //   minLength: 6,
              // })}
              title='Пароль'
              placeholder='Придумайте пароль'
              error={errors.password}
            /> */}
          </div>

          <Field
            {...register('email', { required: 'Почта обязательно!' })}
            title='Почта'
            placeholder='Введите свою почту'
            error={errors.email}
            className={styles.field}
          />

          <div className={styles.group}>
            <div className={styles.fixedCompanyName}>
              {currentCompany?.name}
            </div>
            {/* <Field
              {...register('companyId', { required: 'Компания обязательно!' })}
              title='Компания, отдел'
              value={currentCompany?.name}
              error={errors.companyId}
            /> */}
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

          <div className={styles.group}>
            <Field
              {...register('post', { required: 'Должность необходима!' })}
              title='Должность'
              placeholder='Напишите название должности'
              error={errors.post}
            />
            <Field
              {...register('phone', { required: 'Телефон необходим!' })}
              title='Сотовый'
              placeholder='89211341232'
              error={errors.phone}
            />
          </div>

          <TextArea
            {...register('description', { required: 'Должность необходима!' })}
            title='О сотруднике'
            placeholder='Введите информацию о сотруднике'
            error={errors.description}
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

export default UserCreate;
