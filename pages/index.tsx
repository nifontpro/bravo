import type { NextPage } from 'next';
import { GetStaticProps } from 'next';
import { ICompany } from '@/company/model/company.types';
// import Catalog from '@/core/presenter/ui/catalog/Catalog';
import { CompanyService } from '@/company/data/company.service';
import { errorCatch } from '@/core/utils/api.helpers';
// import { API_SERVER_URL } from '@/core/config/api.config';
// import Auth from '@/auth/presenter/Auth';
import { useAuthState } from '@/auth/data/auth.slice';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Home: NextPage<{ companies: ICompany[] | undefined }> = ({
  companies,
}) => {
  const { push } = useRouter();
  const { user } = useAuthState();

  useEffect(() => {
    if (user == undefined) {
      push('/auth')
    }
  }, [])

  console.log(companies)

    return (
      <div>Главная страница сайта</div>
      // <Catalog
      //   data={companies || []}
      //   prefix='/company'
      //   title='Компании'
      //   description='Компании, зарегистрированные в приложении'
      // />
    );
  }

export const getStaticProps: GetStaticProps = async () => {
  try {
    const { data: companies } = await CompanyService.getAll();
    return {
      props: { companies },
      revalidate: 60,
    };
  } catch (e) {
    console.log(errorCatch(e));
    return {
      props: {},
      // notFound: true,
    };
  }
};

export default Home;
