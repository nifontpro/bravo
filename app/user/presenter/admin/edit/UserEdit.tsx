import { FC, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Meta from '@/core/utils/meta/Meta';
import styles from './UserEdit.module.scss';
import Field from '@/core/presenter/ui/form/Field/Field';
import { useUserEdit } from '@/user/presenter/admin/edit/useUserEdit';
import { IUserEditInput } from '@/user/presenter/admin/edit/user-edit.type';
import cn from 'classnames';
import { ImageDefault } from '@/core/presenter/ui/icons/ImageDefault';
import InputFile from '@/core/presenter/ui/InputFile/InputFile';
import Htag from '@/core/presenter/ui/Htag/Htag';
import InputRadio from '@/core/presenter/ui/InputRadio/InputRadio';
import SelectArtem from '@/core/presenter/ui/SelectArtem/SelectArtem';
import TextArea from '@/core/presenter/ui/TextArea/TextArea';
import Button from '@/core/presenter/ui/Button/Button';
import { useRouter } from 'next/router';
import { useCompanyState } from '@/company/data/company.slice';
import { departmentApi } from '@/department/data/department.api';
import { IOption } from '@/core/presenter/ui/select/select.interface';
import ButtonCircleIcon from '@/core/presenter/ui/ButtonCircleIcon/ButtonCircleIcon';

const UserEdit: FC = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    control,
  } = useForm<IUserEditInput>({
    mode: 'onChange',
  });

  const { currentCompany } = useCompanyState();
  const { back, push } = useRouter();

  if (currentCompany === null || currentCompany === undefined) {
    push('/company');
  }

  const { data: departments } = departmentApi.useGetByCompanyQuery(
    currentCompany!.id
  );
  let arrDeparts: IOption[] = [];
  departments?.forEach((item) => {
    arrDeparts.push({
      label: item.name,
      value: item.id,
    });
  });

  const { user, isLoading, onSubmit, changePhoto, img } = useUserEdit(setValue);
  const [active, setActive] = useState<
    'MALE' | 'FEMALE' | 'UNDEFINED' | undefined
  >(user?.gender);

  // console.log(user)

  const handleClick = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    back()
  } 

  return (
    <Meta title='Редактирование профиля сотрудника'>
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
              Сотрудник
            </Htag>

            <div className={styles.groupGender}>
              <Field
                {...register('lastname', { required: 'Фамилия необходима!' })}
                title='Фамилия'
                placeholder={user?.lastname}
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
                placeholder={user?.name}
                error={errors.name}
              />

              <Field
                {...register('patronymic', {
                  required: 'Отчество обязательно!',
                  minLength: 6,
                })}
                title='Отчество'
                placeholder={user?.patronymic}
                error={errors.patronymic}
              />
            </div>

            <div className={styles.group}>
              <Field
                {...register('login', { required: 'Логин обязательно!' })}
                title='Логин'
                placeholder='Введите логин'
                error={errors.login}
              />

              <Field
                {...register('password', { minLength: 6 })}
                title='Пароль'
                placeholder='Введите пароль'
                error={errors.password}
              />
            </div>

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
              <div className={styles.fixedCompanyName}>
                {user?.departmentId}
              </div>
              {/* <Controller
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
              /> */}
            </div>

            <div className={styles.group}>
              <Field
                {...register('post', { required: 'Должность необходима!' })}
                title='Должность'
                placeholder={user?.post}
                error={errors.post}
              />
              <Field
                {...register('phone', { required: 'Телефон необходим!' })}
                title='Сотовый'
                placeholder={user?.phone}
                error={errors.phone}
              />
            </div>

            <TextArea
              {...register('description', {
                required: 'Должность необходима!',
              })}
              title='О сотруднике'
              placeholder={user?.description}
              error={errors.description}
              className='mb-[100px]'
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
