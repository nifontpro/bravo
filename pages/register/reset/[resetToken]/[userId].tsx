import React from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import ResetPassword from 'register/presenter/ResetPassword';

const ResetPasswordPage: NextPage = () => {
  const router = useRouter();

  return <ResetPassword router={router} />;
};

export default ResetPasswordPage;
