import { GetServerSideProps, NextPage } from 'next';
import { errorCatch } from '@/core/utils/api.helpers';
import Error404 from '../404';
import SingleUser from '@/user/presenter/SingleUser/SingleUser';
import { IUserAwardsUnion } from '@/user/model/user.types';
import { axiosCore } from '@/core/data/axios.core';
import { getUserUrl } from '@/core/config/api.config';
import AuthComponent from '@/core/providers/AuthProvider/AuthComponent';

const SingleUserPage: NextPage<IUserAwardsUnion | undefined> = (user) => {
  return user ? (
    <AuthComponent minRole={'user'}>
      <SingleUser user={user} />
    </AuthComponent>
  ) : (
    <Error404 />
  );
};

export default SingleUserPage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  try {
    const id = params?.id;
    const { data: user } = await axiosCore.post<IUserAwardsUnion>(
      getUserUrl('/get_id_awards'),
      {
        userId: id || '',
      }
    );

    return {
      props: user,
    };
  } catch (e) {
    console.log(errorCatch(e));
    return { props: {} };
  }
};
