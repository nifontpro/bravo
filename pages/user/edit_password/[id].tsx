import { NextPage } from 'next';
import AuthComponent from '@/core/providers/AuthProvider/AuthComponent';
import UserEdit from '@/user/presenter/admin/edit/UserEdit';
import UserEditPassword from '@/user/presenter/admin/editPassword/UserEditPassword';

const DepartmentEditPage: NextPage = () => {
  return (
    <AuthComponent minRole={'user'}>
      <UserEditPassword />
    </AuthComponent>
  );
};

export default DepartmentEditPage;
