import { GetServerSideProps, GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { errorCatch } from '@/core/utils/api.helpers';
import Error404 from '../404';
import Award from 'award/presenter/Award/Award';
import { IAwardUsers } from '@/award/model/award.types';
import { getAwardUrl } from '@/core/config/api.config';
import { axiosCore } from '@/core/data/axios.core';

const SingleAwardPage: NextPage<IAwardUsers | undefined> = (award) => {
  return award ? <Award award={award} /> : <Error404 />;
};

export default SingleAwardPage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  if (!params) {
    return {
      notFound: true,
    };
  }

  try {
    const id = String(params?.id);
    const { data: award } = await axiosCore.post<IAwardUsers>(
      getAwardUrl('/get_idu'),
      {
        awardId: id,
      }
    );

    return {
      props: award,
    };
  } catch (e) {
    console.log(errorCatch(e));
    return { props: {} };
  }
};

// export const getStaticPaths: GetStaticPaths = async () => {
//   return {

//     paths: ['/award/63c4dcf49266ad3a3b0a677c'],
//     // fallback: 'blocking'
//     fallback: true,
//   };
// };

// export const getStaticProps: GetStaticProps = async ({ params }) => {
//   if (!params) {
//     return {
//       notFound: true,
//     };
//   }

//   try {
//     const id = String(params?.id);
//     const { data: award } = await axiosCore.post<IAwardUsers>(
//       getAwardUrl('/get_idu'),
//       {
//         awardId: id,
//       }
//     );

//     return {
//       props: award,
//     };
//   } catch (e) {
//     console.log(errorCatch(e));
//     return { props: {} };
//   }
// };