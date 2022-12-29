import { useForm } from 'react-hook-form';
import Meta from '@/core/utils/meta/Meta';
import styles from './AwardCreate.module.scss';
import Field from '@/core/presenter/ui/form/Field/Field';
import cn from 'classnames';
import { useRouter } from 'next/router';
import Button from '@/core/presenter/ui/Button/Button';
import Htag from '@/core/presenter/ui/Htag/Htag';
import { AwardCreateProps } from './AwardCreate.props';
import { useAwardCreate } from './useAwardCreate';
import { ImageDefault } from '@/core/presenter/ui/icons/ImageDefault';
import InputFile from '@/core/presenter/ui/InputFile/InputFile';
import { useState } from 'react';
import ButtonCircleIcon from '@/core/presenter/ui/ButtonCircleIcon/ButtonCircleIcon';
import { useCompanyState } from '@/company/data/company.slice';
import TextArea from '@/core/presenter/ui/TextArea/TextArea';
import { IAwardCreate } from 'award/model/api.types';
import { validDate } from '@/core/utils/regex';
import ChoiceUsers from './ChoiceUsers/ChoiceUsers';
import { useMyUser } from '@/user/presenter/useMyUsers';

const AwardCreate = ({}: AwardCreateProps): JSX.Element => {
  const { currentCompany } = useCompanyState();
  const { push } = useRouter();
  const [arrChoiceUser, setArrChoiceUser] = useState<string[]>([]);
  const { users } = useMyUser('');

  const {
    handleSubmit,
    register,
    formState: { errors, isDirty, isValid },
    setValue,
    reset,
  } = useForm<IAwardCreate>({ mode: 'onChange' });

  const { onSubmitReward, onSubmitNominee, changePhoto, img } = useAwardCreate(
    setValue,
    reset,
    currentCompany?.id,
    arrChoiceUser
  );

  return (
    <Meta title='Создание новой награды'>
      <ButtonCircleIcon
        onClick={() => push('/award')}
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
            Новая награда
          </Htag>

          <Field
            {...register('name', { required: 'Название необходимо!' })}
            title='Название'
            placeholder='Введите название награды'
            error={errors.name}
            className='mb-[60px]'
          />
          <Field
            {...register('description', { required: 'Описание необходимо!' })}
            title='Краткое описание'
            placeholder='Введите описание награды'
            error={errors.description}
            className='mb-[60px]'
          />

          <TextArea
            {...register('criteria', { required: 'Критерии необходимы!' })}
            title='Требования к номинанту'
            placeholder='Введите критерии награды'
            error={errors.criteria}
            className='mb-[60px]'
          />

          <div className={styles.group}>
            <Field
              {...register('startDate', {
                pattern: {
                  value: validDate,
                  message: 'Пожалуйста введите корректную дату',
                },
              })}
              title='Начинается'
              placeholder='ММ.ДД.ГГГГ'
              error={errors.startDate}
            />

            <Field
              {...register('endDate', {
                pattern: {
                  value: validDate,
                  message: 'Пожалуйста введите корректную дату',
                },
              })}
              title='Заканчивается'
              placeholder='ММ.ДД.ГГГГ'
              error={errors.endDate}
            />
          </div>

          <ChoiceUsers
            users={users}
            arrChoiceUser={arrChoiceUser}
            setArrChoiceUser={setArrChoiceUser}
          />

          <div className={styles.buttons}>
            <Button
              onClick={handleSubmit(onSubmitReward)}
              appearance='whiteBlack'
              size='l'
            >
              Выдать сразу и закрыть
            </Button>
            <Button
              onClick={handleSubmit(onSubmitNominee)}
              appearance='blackWhite'
              size='l'
              className='ml-[15px]'
              disabled={!isDirty || !isValid}
            >
              Номинировать
            </Button>
          </div>
        </div>
      </form>
    </Meta>
  );
};

export default AwardCreate;
