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
import InputFile from '@/core/presenter/ui/InputFile/InputFile';
import ButtonCircleIcon from '@/core/presenter/ui/ButtonCircleIcon/ButtonCircleIcon';
import { useCompanyState } from '@/company/data/company.slice';
import TextArea from '@/core/presenter/ui/TextArea/TextArea';
import { IAwardUpdate } from 'award/model/api.types';
import { useAwardEdit } from './useAwardEdit';
import RemoveIcon from '@/core/presenter/images/remove.svg';
import RefreshIcon from '@/core/presenter/images/refresh.svg';
import InputPhotoRefresh from '@/core/presenter/ui/InputPhotoRefresh/InputPhotoRefresh';

const AwardEdit = ({}: AwardEditProps): JSX.Element => {
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
    control,
    reset,
  } = useForm<IAwardUpdate>({ mode: 'onChange' });

  const { onSubmit, changePhoto, img } =
    useAwardEdit(setValue);

  const handleClick = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    back();
  };

  return (
    <Meta title='Редактирование компании'>
      <ButtonCircleIcon onClick={() => back()} appearance='black' icon='down'>
        Вернуться назад
      </ButtonCircleIcon>
      <div className={styles.newForm}>
        <div className={cn(styles.field, styles.uploadField)}>
          <ImageDefault
            // onClick={changePreviewPhoto}
            src={img}
            width={400}
            height={400}
            alt='preview image'
            objectFit='cover'
            // className='rounded-[10px]'
          />
          <div className={styles.editPanel}>
            <InputPhotoRefresh onChange={changePhoto} className={styles.input}>
              <RefreshIcon className={styles.refresh} />
            </InputPhotoRefresh>
            <RemoveIcon className={styles.remove} />
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
              <Button onClick={handleClick} appearance='white' size='l'>
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
    </Meta>
  );
};

export default AwardEdit;
