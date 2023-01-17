import { awardApi } from '@/award/data/award.api';
import { Dispatch, SetStateAction, useState } from 'react';
import { toast } from 'react-toastify';

export const useModalWindowWithAddAwards = (
  setVisibleModal: Dispatch<SetStateAction<boolean>>,
  userId: string,
  awardState: "NONE" | "NOMINEE" | "AWARD",
) => {
  const [arrChoiceAward, setArrChoiceAward] = useState<string[]>([]);
  const [reward] = awardApi.useAwardUserMutation();
  // console.log(arrChoiceAward)

  const handleCancel = () => {
    setArrChoiceAward([]);
    setVisibleModal(false);
  };

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
        toast.success('Награждение успешно');
      }
    }
    // if (!isError) {
    //   toast.success('Номинирование успешно');
    // }
  };

  return {arrChoiceAward, setArrChoiceAward, handleCancel, onSubmitNominee};
};
