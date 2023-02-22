import { useForm } from 'react-hook-form';
import Meta from '@/core/utils/meta/Meta';
import styles from './AwardCreate.module.scss';
import Field from '@/core/presenter/ui/form/Field/Field';
// import cn from 'classnames';
import { useRouter } from 'next/router';
import Button from '@/core/presenter/ui/Button/Button';
import Htag from '@/core/presenter/ui/Htag/Htag';
import { AwardCreateProps } from './AwardCreate.props';
import { useAwardCreate } from './useAwardCreate';
import { ImageDefault } from '@/core/presenter/ui/icons/ImageDefault';
// import InputFile from '@/core/presenter/ui/InputFile/InputFile';
import { useRef, useState } from 'react';
import ButtonCircleIcon from '@/core/presenter/ui/ButtonCircleIcon/ButtonCircleIcon';
import { useCompanyState } from '@/company/data/company.slice';
import TextArea from '@/core/presenter/ui/TextArea/TextArea';
import { IAwardCreate } from 'award/model/api.types';
// import { validDate } from '@/core/utils/regex';
import ChoiceUsers from './ChoiceUsers/ChoiceUsers';
import { useMyUser } from '@/user/presenter/useMyUsers';
import SelectCalendar from './SelectCalendar/SelectCalendar';
import type { DatePickerProps } from 'antd';
import { useDispatch } from 'react-redux';
import { dateActions } from './dataCreateAward.slice';
// import useOutsideClick from '@/core/hooks/useOutsideClick';
import P from '@/core/presenter/ui/P/P';
import { IGalleryObject } from 'gallery/model/gallery.types';
import ModalWindowGalleryAwards from '@/award/presenter/admin/create/ModalWindowGalleryAwards/ModalWindowGalleryAwards';
import ChoiceImg from './ChoiceImg/ChoiceImg';
import UsersPreview from './UsersPreview/UsersPreview';

const AwardCreate = ({}: AwardCreateProps): JSX.Element => {
  const dispatch = useDispatch();
  const { currentCompany } = useCompanyState();
  const { push } = useRouter();
  const [arrChoiceUser, setArrChoiceUser] = useState<string[]>([]);
  const { users } = useMyUser('');

  const [images, setImg] = useState<IGalleryObject | undefined>(undefined);

  const {
    handleSubmit,
    register,
    formState: { errors, isDirty, isValid },
    setValue,
    reset,
  } = useForm<IAwardCreate>({ mode: 'onChange' });

  const { onSubmitReward, onSubmitNominee } = useAwardCreate(
    setValue,
    reset,
    images,
    currentCompany?.id,
    arrChoiceUser
  );

  const onChangeStart: DatePickerProps['onChange'] = (_, dateString) => {
    dispatch(dateActions.setStartDate(dateString));
  };
  const onChangeEnd: DatePickerProps['onChange'] = (_, dateString) => {
    dispatch(dateActions.setEndDate(dateString));
  };

  //Закрытие модального окна нажатием вне его
  const [visibleModal, setVisibleModal] = useState<boolean>(false);
  // const ref = useRef(null);
  // const refOpen = useRef(null);
  // const handleClickOutside = () => {
  //   setVisibleModal(false);
  // };
  // useOutsideClick(ref, refOpen, handleClickOutside, visibleModal); // добавить как разберусь с Selectom React

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
        <ChoiceImg setVisibleModal={setVisibleModal} images={images} setImg={setImg}/>

        <div className={styles.fields}>
          <Htag tag='h2' className={styles.title}>
            Новая награда
          </Htag>

          <ChoiceImg className={styles.mediaVisible} setVisibleModal={setVisibleModal} images={images} setImg={setImg}/>

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
            <SelectCalendar
              handleChangeDate={onChangeStart}
              title='Начинается'
              error={errors.startDate}
            />
            <SelectCalendar
              handleChangeDate={onChangeEnd}
              title='Заканчивается'
              error={errors.endDate}
            />
          </div>

          <UsersPreview arrChoiceUser={arrChoiceUser} users={users} setArrChoiceUser={setArrChoiceUser}/>

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
              disabled={!isDirty || !isValid}
            >
              Выдать сразу и закрыть
            </Button>
            <Button
              onClick={handleSubmit(onSubmitNominee)}
              appearance='blackWhite'
              size='l'
              className={styles.lastBtn}
              disabled={!isDirty || !isValid}
            >
              Номинировать
            </Button>
          </div>
        </div>
      </form>

      <ModalWindowGalleryAwards
        img={images}
        setImg={setImg}
        visibleModal={visibleModal}
        setVisibleModal={setVisibleModal}
        textBtn='Подтвердить'
        // ref={ref}
        create={false}
      />

      
    </Meta>
  );
};

export default AwardCreate;
