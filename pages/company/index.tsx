import OwnerCompany from '@/company/presenter/OwnerCompany';
import { NextPage } from 'next';
import AuthComponent from '@/core/providers/AuthProvider/AuthComponent';
import { useRouter } from 'next/router';
import { useAuthState } from '@/auth/data/auth.slice';
import { useEffect } from 'react';
import SingleCompany from '@/company/presenter/SingleCompany';
import { useCompanyState } from '@/company/data/company.slice';

const CompaniesPage: NextPage = () => {
  const { user: currentUser } = useAuthState();
  const { currentCompany } = useCompanyState();
  const { push } = useRouter();

  useEffect(() => {
    if (currentUser?.role == 'user' && currentCompany != null) {
		push(`/company/${currentCompany.id}`)
    }
  }, [currentCompany, currentUser?.role, push]);

  return (
    <AuthComponent minRole={'owner'}>
      <OwnerCompany />
    </AuthComponent>
  );
};

export default CompaniesPage;
