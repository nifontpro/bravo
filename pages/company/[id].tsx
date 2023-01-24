import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Error404 from '../404';
import SingleCompany from '@/company/presenter/SingleCompany';
import { errorCatch } from '@/core/utils/api.helpers';
import { CompanyService } from '@/company/data/company.service';
import { ICompany } from '@/company/model/company.types';
import { axiosCore } from '@/core/data/axios.core';
import { getCompanyUrl } from '@/core/config/api.config';

const SingleCompanyPage: NextPage<ICompany | undefined> = (company) => {
  return company ? <SingleCompany company={company} /> : <Error404 />;
};

export default SingleCompanyPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const { data: allCompanyId } = await axiosCore.post<string[]>(
    getCompanyUrl('/ids'),
    {}
  );
  return {
    paths: allCompanyId.map((item) => getCompanyUrl(`/${item}`)),
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
    const { data: company } = await axiosCore.post<ICompany>(getCompanyUrl("/get_id"), {
			companyId: id
		})
    // const { data: company } = await CompanyService.getById(id);

    return {
      props: company,
    };
  } catch (e) {
    console.log(errorCatch(e));
    return { props: {} };
  }
};

// export const getStaticProps: GetStaticProps = async ({params}) => {
// 	try {
// 		const id = String(params?.id)
// 		const {data: company} = await CompanyService.getById(id)

// 		return {
// 			props: company
// 		}
// 	} catch (e) {
// 		console.log(errorCatch(e))
// 		return {props: {}}
// 	}
// }
