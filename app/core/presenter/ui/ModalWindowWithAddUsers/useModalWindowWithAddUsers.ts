import { awardApi } from '@/award/data/award.api';
import { Dispatch, SetStateAction, useState } from 'react';
import { toast } from 'react-toastify';

export const useModalWindowWithAddUsers = (
  setVisibleModal: Dispatch<SetStateAction<boolean>>,
  awardId: string,
  awardState: 'NONE' | 'NOMINEE' | 'AWARD'
) => {
  const [arrChoiceUser, setArrChoiceUser] = useState<string[]>([]);
  const [reward] = awardApi.useAwardUserMutation();

  const handleCancel = () => {
    setVisibleModal(false);
  };

  const onSubmitNominee = async () => {
    let isError = false;
    // console.log(arrChoiceUser);

    if (arrChoiceUser.length == 0) {
      // setVisibleModal(false);
      toast.error(`Выберите сотрудников для номинации`);
    }

    if (arrChoiceUser != undefined && arrChoiceUser?.length > 0) {
      arrChoiceUser.forEach((user) => {
        reward({
          awardId: awardId,
          userId: user,
          awardState: awardState,
        })
          .unwrap()
          .catch(() => {
            isError = true;
            toast.error(`Ошибка награждения ${user}`);
          });
      });
      setArrChoiceUser([]);
      setVisibleModal(false);
      if (!isError) {
        toast.success('Номинирование успешно');
      }
    }
    // if (!isError) {
    //   toast.success('Номинирование успешно');
    // }
  };

  return {arrChoiceUser, setArrChoiceUser, onSubmitNominee, handleCancel};
};
