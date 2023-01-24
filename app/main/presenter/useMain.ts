import { useAward } from '@/award/presenter/useAward';
import { useMyUser } from '@/user/presenter/useMyUsers';
import { useEffect, useState } from 'react';

export const useMain = () => {
  const { awardsLight } = useAward('');
  const {
    usersWithAwards: users,
    usersCountAwardsOnDepCompany: awardsOnCompanyGroupDep,
  } = useMyUser('');

  const [state, setState] = useState<boolean>(true);
  const [onBoarding, setOnboarding] = useState<number>(1);
  const [onBoardingText, setOnboardingText] = useState<string>('');
  const [onBoardingText3, setOnboardingText3] = useState<string>('');

  useEffect(() => {
    if (onBoarding == 1) {
      setOnboardingText('Следи за своим прогрессом');
    }
    if (onBoarding == 2) {
      setOnboardingText('Участвуй в новых номинациях');
    }
    if (onBoarding == 3) {
      setOnboardingText(`Узнавай об активностях `);
      setOnboardingText3('в компании');
    }
  }, [onBoarding]);

  const handleClick = () => {
    if (onBoarding < 3) {
      setOnboarding((prev) => prev + 1);
    } else {
      setState(false);
    }
  };

  return {
    onBoarding,
    awardsLight,
    users,
    awardsOnCompanyGroupDep,
    state,
    onBoardingText,
    onBoardingText3,
    handleClick,
  };
};
