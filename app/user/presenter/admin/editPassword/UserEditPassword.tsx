import { FC } from 'react';
import { useForm } from 'react-hook-form';
import Meta from '@/core/utils/meta/Meta';
import styles from './UserEditPassword.module.scss';
import Field from '@/core/presenter/ui/form/Field/Field';
import Htag from '@/core/presenter/ui/Htag/Htag';
import Button from '@/core/presenter/ui/Button/Button';
import { useRouter } from 'next/router';
import ButtonCircleIcon from '@/core/presenter/ui/ButtonCircleIcon/ButtonCircleIcon';
import { useUserEditPassword } from './useUserEditPassword';

const UserEditPassword: FC = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm<{
    userId: string,
    password: string,
    newPassword: string,
    repeatNewPassword: string
    test?: boolean
  }>({
    mode: 'onChange',
  });
  const { back } = useRouter();
  const { user, isLoading, onSubmit } = useUserEditPassword(setValue);

  const handleClick = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    back();
  };

  return (
    <Meta title='Редактирование пароля сотрудника'>
      <ButtonCircleIcon onClick={() => back()} appearance='black' icon='down'>
        Назад
      </ButtonCircleIcon>
      <form className={styles.form}>
        <Htag tag='h2' className={styles.title}>
          Пароль
        </Htag>

        <Field
          {...register('password', { required: 'Текущий пароль обязательно!' })}
          title='Текущий пароль'
          placeholder='Ввеите текущий пароль'
          error={errors.password}
        />

        <div className={styles.group}>
          <Field
            {...register('newPassword', { minLength: 6, required: 'Новый пароль обязательно!'})}
            title='Новый пароль'
            placeholder='Введите новый пароль'
            error={errors.newPassword}
          />
          <Field
            {...register('repeatNewPassword', { required: 'Повторите новый обязательно!' })}
            title='Повторите новый пароль'
            placeholder='Введите новый пароль'
            error={errors.repeatNewPassword}
          />
        </div>

        <div className={styles.buttons}>
          <Button onClick={handleClick} appearance='white' size='l'>
            Отменить
          </Button>
          <Button
            onClick={handleSubmit(onSubmit)}
            appearance='gray'
            size='l'
            className='ml-[15px]'
          >
            Изменить
          </Button>
        </div>
      </form>
    </Meta>
  );
};

export default UserEditPassword;
