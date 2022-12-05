import { Controller, useForm } from 'react-hook-form';
import Meta from '@/core/utils/meta/Meta';
import styles from './AwardEdit.module.scss';
import Field from '@/core/presenter/ui/form/Field/Field';
import cn from 'classnames';
import { useRouter } from 'next/router';
import Button from '@/core/presenter/ui/Button/Button';
import Htag from '@/core/presenter/ui/Htag/Htag';
import { AwardEditProps } from './AwardEdit.props';
import { ImageDefault } from '@/core/presenter/ui/icons/ImageDefault';
import InputFile from '@/core/presenter/ui/InputFile/InputFile';
import { ChangeEvent, useState } from 'react';
import ButtonCircleIcon from '@/core/presenter/ui/ButtonCircleIcon/ButtonCircleIcon';
import { useCompanyState } from '@/company/data/company.slice';
import SelectArtem from '@/core/presenter/ui/SelectArtem/SelectArtem';
import { departmentApi } from '@/department/data/department.api';
import { IOption } from '@/core/presenter/ui/select/select.interface';
import TextArea from '@/core/presenter/ui/TextArea/TextArea';
import { IAwardCreate, IAwardUpdate } from 'award/model/api.types';
import { validDate } from '@/core/utils/regex';
import { IAward } from 'award/model/award.types';
import { useAwardEdit } from './useAwardEdit';

const AwardEdit = ({}: AwardEditProps): JSX.Element => {
  const { currentCompany } = useCompanyState();
  const { push, back } = useRouter();

  if (currentCompany === null) {
    push('/company');
  }

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    control,
    reset,
  } = useForm<IAwardUpdate>({ mode: 'onChange' });

  const { onSubmit, changePhoto, img } = useAwardEdit(setValue);

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

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.fields}>
            <Htag tag='h2' className={styles.title}>
              Описание
            </Htag>

            <Field
              {...register('name', { required: 'Название необходимо!' })}
              title='Название медали'
              placeholder={currentCompany?.name}
              error={errors.name}
              className='mb-[60px]'
            />

            <Field
              {...register('description', { required: 'Краткое описание обязательно!' })}
              title='Краткое описание'
              placeholder={currentCompany?.address}
              error={errors.description}
            />

            <TextArea
              {...register('criteria', {
                required: 'Критерии необходимы!',
              })}
              title='Требования'
              placeholder='Введите требования к медали'
              error={errors.criteria}
              className='mb-[100px] mt-[60px]'
            />

            <div className={styles.buttons}>
              {/* <Button onClick={() => back()} appearance='white' size='l'>
                Отменить
              </Button> */}
              <Button appearance='gray' size='l' className='ml-[15px]'>
                Изменить
              </Button>
            </div>
          </div>
        </form>
      </div>
    </Meta>
  );
};

export default AwardEdit;
