import { useRouter } from 'next/router';
import { OnChangeValue } from 'react-select';
import makeAnimated from 'react-select/animated';
import { IOption } from '@/core/presenter/ui/SelectCustom/SelectCustom.interface';
import { useState } from 'react';
import { useAward } from 'award/presenter/useAward';
import { useMyUser } from '@/user/presenter/useMyUsers';

export const useStatistic = () => {
    const animatedComponents = makeAnimated();
    const [yearActivity, setYearActivity] = useState<string>('2023');

    const { awardsLight } = useAward('');
    const { usersCountAwardsOnDepCompany } = useMyUser('');
    const { usersWithAwardsUnion: users } = useMyUser('');
    const { push } = useRouter();
  
    let arrYear: IOption[] = [
      { label: '2022', value: '2022' },
      { label: '2023', value: '2023' },
    ];
  
    const onChange = (newValue: unknown | OnChangeValue<IOption, boolean>) => {
      setYearActivity((newValue as IOption).value);
    };

 return {arrYear, onChange, animatedComponents, awardsLight, push, usersCountAwardsOnDepCompany, yearActivity, users}
}