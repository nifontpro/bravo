import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { errorCatch } from '@/core/utils/api.helpers';
import SingleDepartment from '@/department/presenter/SingleDepartment';
import Error404 from '../404';
import { IDepartment } from '@/department/model/department.types';
import { axiosCore } from '@/core/data/axios.core';
import { getDepartmentUrl } from '@/core/config/api.config';

const SingleDepartmentPage: NextPage<IDepartment | undefined> = (
  department
) => {
  return <Error404 />;
  // return department ? (
  //   <SingleDepartment department={department} />
  // ) : (
  //   <Error404 />
  // );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { data: allDepartmentId } = await axiosCore.post<string[]>(
    getDepartmentUrl('/ids'),
    {}
  );
  return {
    paths: allDepartmentId.map((item) => getDepartmentUrl(`/${item}`)),
    // fallback: 'blocking'
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params) {
    return {
      notFound: true,
    };
  }
  try {
    const id = String(params?.id);
    const { data: department } = await axiosCore.post<IDepartment>(
      getDepartmentUrl('/get_id'),
      {
        departmentId: id,
      }
    );

    return {
      props: department,
    };
  } catch (e) {
    console.log(errorCatch(e));
    return { props: {} };
  }
};

export default SingleDepartmentPage;
