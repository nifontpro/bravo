import { useForm } from 'react-hook-form';
import Meta from '@/core/utils/meta/Meta';
import styles from './DepartmentCreate.module.scss';
import Field from '@/core/presenter/ui/form/Field/Field';
import cn from 'classnames';
import { IUserCreateInput } from '@/user/presenter/admin/create/user-create.type';
import { useCompanyState } from '@/company/data/company.slice';
import { useRouter } from 'next/router';
import Button from '@/core/presenter/ui/Button/Button';
import Htag from '@/core/presenter/ui/Htag/Htag';
import { DepartmentCreateProps } from './DepartmentCreate.props';
import { useDepartmentCreate } from './useDepartmentCreate';
import {
  IDepartment,
  IDepartmentCreate,
} from '@/department/model/department.types';
import ButtonCircleIcon from '@/core/presenter/ui/ButtonCircleIcon/ButtonCircleIcon';

const DepartmentCreate = ({}: DepartmentCreateProps): JSX.Element => {
  const { currentCompany } = useCompanyState();
  const { push, back } = useRouter();

  // if (currentCompany === null) {
  //   push('/company');
  // }

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm<IDepartmentCreate>({ mode: 'onChange' });

  const { onSubmit } = useDepartmentCreate(setValue, currentCompany?.id);

  const handleClick = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    back()
  } 

  return (
    <Meta title='Создание нового отдела'>
      <ButtonCircleIcon
        onClick={back}
        appearance='black'
        icon='down'
        className='mb-[50px]'
      >
        Вернуться назад
      </ButtonCircleIcon>
      <form className={styles.form}>
        <Htag tag='h2' className={styles.title}>
          Новый отдел
        </Htag>

        <Field
          {...register('name', { required: 'Название необходимо!' })}
          title='Название отдела'
          placeholder='Название отдела'
          error={errors.name}
          className='mb-[50px]'
        />

        <Field
          {...register('description', {
            required: 'Описание необходимо!',
          })}
          title='Чем занимается'
          placeholder='Чем занимается'
          error={errors.description}
        />

        <div className={styles.btn}>
          <Button onClick={handleClick} appearance='white' size='l'>
            Отменить
          </Button> 
          <Button onClick={handleSubmit(onSubmit)} appearance='blackWhite' size='l' className='ml-[15px]'>
            Сохранить
          </Button>
        </div>
      </form>
    </Meta>
  );
};

export default DepartmentCreate;
