import OwnerCompany from '@/company/presenter/OwnerCompany';
import { NextPage } from 'next';
import AuthComponent from '@/core/providers/AuthProvider/AuthComponent';
import { useRouter } from 'next/router';
import { useAuthState } from '@/auth/data/auth.slice';
import { useEffect } from 'react';

const CompaniesPage: NextPage = () => {
  const { user: currentUser } = useAuthState();
  const { push } = useRouter();

  useEffect(() => {
    if (currentUser?.role == 'user') {
      push(`/company/${currentUser.companyId}`);
    }
  }, [currentUser?.role, currentUser?.companyId, push]);

  return (
    <AuthComponent minRole={'owner'}>
      <OwnerCompany />
    </AuthComponent>
  );
};

export default CompaniesPage;
