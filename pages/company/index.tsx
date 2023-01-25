import OwnerCompany from '@/company/presenter/OwnerCompany';
import { NextPage } from 'next';
import AuthComponent from '@/core/providers/AuthProvider/AuthComponent';
import { useRouter } from 'next/router';
import { useAuthState } from '@/auth/data/auth.slice';
import { useEffect } from 'react';
import LoginSingin from '@/core/presenter/ui/LoginSingin/LoginSingin';

const CompaniesPage: NextPage = () => {
  const { user: currentUser } = useAuthState();
  const { push } = useRouter();

  useEffect(() => {
    if (currentUser?.role == 'user') {
      push(`/company/${currentUser.companyId}`);
    }
  }, [currentUser?.role, currentUser?.companyId, push]);

  if (!currentUser) {
    return <LoginSingin />;
  } else {
    return (
      <AuthComponent minRole={'owner'}>
        <OwnerCompany />
      </AuthComponent>
    );
  }
};

export default CompaniesPage;
