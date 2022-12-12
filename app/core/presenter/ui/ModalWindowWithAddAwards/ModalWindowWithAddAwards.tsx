import styles from './ModalWindowWithAddAwards.module.scss';
import { ModalWindowWithAddAwardsProps } from './ModalWindowWithAddAwards.props';
import cn from 'classnames';
import Htag from '../Htag/Htag';
import ExitIcon from './exit.svg';
import Search from '../Search/Search';
import ChoiceUsers from 'award/presenter/admin/create/ChoiceUsers/ChoiceUsers';
import { useEffect, useState } from 'react';
import Button from '../Button/Button';
import { useCompanyState } from '@/company/data/company.slice';
import { toast } from 'react-toastify';
import { awardApi } from 'award/data/award.api';
import ChoiceAwards from '@/user/presenter/SingleUser/SingleUserTitle/ChoiceAwards/ChoiceAwards';

const ModalWindowWithAddAwards = ({
  textBtn,
  awardState,
  userId,
  awards,
  visibleModal,
  setVisibleModal,
  className,
  ...props
}: ModalWindowWithAddAwardsProps): JSX.Element => {
  const [arrChoiceAward, setArrChoiceAward] = useState<string[]>([]);
  const [reward] = awardApi.useAwardUserMutation();
  console.log(arrChoiceAward)

  const handleCancel = () => {
    setArrChoiceAward([])
    setVisibleModal(false)
  }

  const onSubmitNominee = async () => {
    let isError = false;
    // console.log(arrChoiceAward);

    if (arrChoiceAward.length == 0) {
      // setVisibleModal(false);
      toast.error(`Выберите сотрудников для номинации`);
    }

    if (arrChoiceAward != undefined && arrChoiceAward?.length > 0) {
      arrChoiceAward.forEach((award) => {
        reward({
          awardId: award,
          userId: userId,
          awardState: awardState,
        })
          .unwrap()
          .catch(() => {
            isError = true;
            toast.error(`Ошибка награждения 123 ${award}`);
          });
      });
      setArrChoiceAward([]);
      setVisibleModal(false);
      if (!isError) {
        toast.success('Номинирование успешно');
      }
    }
    // if (!isError) {
    //   toast.success('Номинирование успешно');
    // }
  };

  return (
    <div
      className={cn(
        styles.modalWindow,
        {
          [styles.active]: visibleModal,
          [styles.hidden]: !visibleModal,
        },
        className
      )}
      {...props}
    >
      <div className={styles.module}>
        <ExitIcon
          onClick={() => setVisibleModal(false)}
          className={styles.exit}
        />
        <Htag tag='h2' className={styles.title}>
          Добавить награду
        </Htag>
        <ChoiceAwards
          awards={awards}
          arrChoiceAward={arrChoiceAward}
          setArrChoiceAward={setArrChoiceAward}
        />
        <div className={styles.buttons}>
          <Button
            onClick={handleCancel}
            appearance='whiteBlack'
            size='l'
          >
            Отменить
          </Button>
          <Button
            onClick={onSubmitNominee}
            appearance='blackWhite'
            size='l'
            className='ml-[15px]'
          >
            {textBtn}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ModalWindowWithAddAwards;
