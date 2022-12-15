import type { NextPage } from 'next';
import { GetStaticProps } from 'next';
import { ICompany } from '@/company/model/company.types';
// import Catalog from '@/core/presenter/ui/catalog/Catalog';
import { CompanyService } from '@/company/data/company.service';
import { errorCatch } from '@/core/utils/api.helpers';
// import { API_SERVER_URL } from '@/core/config/api.config';
// import Auth from '@/auth/presenter/Auth';
import { useCompanyState } from '@/company/data/company.slice';
import AuthComponent from '@/core/providers/AuthProvider/AuthComponent';
import Main from 'main/presenter/Main';

// const Home: NextPage<{ companies: ICompany[] | undefined }> = ({
//   companies,
// }) => {
const Home: NextPage = () => {
  const { currentCompany } = useCompanyState();

  return (
    <AuthComponent minRole={'user'}>
      {currentCompany ? (
        <Main />
      ) : (
        <div className='@apply text-2xl'>
          Для просмотра сначала выберите или создайте компанию.
        </div>
      )}
    </AuthComponent>
  );
};

// export const getStaticProps: GetStaticProps = async () => {
//   try {
//     const { data: companies } = await CompanyService.getAll();
//     return {
//       props: { companies },
//       revalidate: 60,
//     };
//   } catch (e) {
//     console.log(errorCatch(e));
//     return {
//       props: {},
//       // notFound: true,
//     };
//   }
// };

export default Home;
