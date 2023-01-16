import { useForm } from 'react-hook-form';
import Meta from '@/core/utils/meta/Meta';
import styles from './AwardEdit.module.scss';
import Field from '@/core/presenter/ui/form/Field/Field';
import cn from 'classnames';
import { useRouter } from 'next/router';
import Button from '@/core/presenter/ui/Button/Button';
import Htag from '@/core/presenter/ui/Htag/Htag';
import { AwardEditProps } from './AwardEdit.props';
import { ImageDefault } from '@/core/presenter/ui/icons/ImageDefault';
import ButtonCircleIcon from '@/core/presenter/ui/ButtonCircleIcon/ButtonCircleIcon';
import { useCompanyState } from '@/company/data/company.slice';
import TextArea from '@/core/presenter/ui/TextArea/TextArea';
import { IAwardUpdate } from 'award/model/api.types';
import { useAwardEdit } from './useAwardEdit';
import ButtonEdit from '@/core/presenter/ui/ButtonEdit/ButtonEdit';
import { useRef, useState } from 'react';
import useOutsideClick from '@/core/hooks/useOutsideClick';
import ModalWindowGalleryAwards from '../create/ModalWindowGalleryAwards/ModalWindowGalleryAwards';

const AwardEdit = ({}: AwardEditProps): JSX.Element => {
  const { currentCompany } = useCompanyState();
  const { push, back } = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    control,
    reset,
  } = useForm<IAwardUpdate>({ mode: 'onChange' });

  const { onSubmit, removePhoto, img } = useAwardEdit(setValue);

  const handleClick = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    back();
  };

  //Закрытие модального окна нажатием вне его
  const [visibleModal, setVisibleModal] = useState<boolean>(false);
  const ref = useRef(null);
  const refOpen = useRef(null);
  const handleClickOutside = () => {
    setVisibleModal(false);
  };
  useOutsideClick(ref, refOpen, handleClickOutside, visibleModal);

  return (
    <Meta title='Редактирование компании'>
      <ButtonCircleIcon onClick={() => back()} appearance='black' icon='down'>
        Вернуться назад
      </ButtonCircleIcon>
      <div className={styles.newForm}>
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

          <div className={styles.editPanel}>
            <ButtonEdit
              icon='refresh'
              className='mr-[10px]'
              ref={refOpen}
              onClick={() => setVisibleModal(true)}
            />
            <ButtonEdit icon='remove' onClick={removePhoto} />
          </div>
        </div>

        <form className={styles.form}>
          <div className={styles.fields}>
            <Htag tag='h2' className={styles.title}>
              Описание медали
            </Htag>

            <Field
              {...register('name', { required: 'Название необходимо!' })}
              title='Название'
              placeholder={currentCompany?.name}
              error={errors.name}
              className='mb-[60px]'
            />

            <Field
              {...register('description', {
                required: 'Краткое описание обязательно!',
              })}
              title='Описание'
              placeholder={currentCompany?.address}
              error={errors.description}
            />

            <TextArea
              {...register('criteria', {
                required: 'Критерии необходимы!',
              })}
              title='Требования к номинанту'
              placeholder='Введите требования к медали'
              error={errors.criteria}
              className='mb-[100px] mt-[60px]'
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
              >
                Изменить
              </Button>
            </div>
          </div>
        </form>
      </div>
      <ModalWindowGalleryAwards
        visibleModal={visibleModal}
        setVisibleModal={setVisibleModal}
        textBtn='Подтвердить'
        ref={ref}
        create={true}
      />
    </Meta>
  );
};

export default AwardEdit;
