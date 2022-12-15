import { NextPage } from 'next';
import Users from '@/user/presenter/Users';
import AuthComponent from '@/core/providers/AuthProvider/AuthComponent';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuthState } from '@/auth/data/auth.slice';

const DepartmentsPage: NextPage = () => {
  return (
    <AuthComponent minRole={'director'}>
      <Users />
    </AuthComponent>
  );
};

export default DepartmentsPage;
