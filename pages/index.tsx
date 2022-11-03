import type {NextPage} from 'next'
import {GetStaticProps} from "next";
import {ICompany} from "@/company/model/company.types";
import Catalog from "@/core/presenter/ui/catalog/Catalog";
import {CompanyService} from "@/company/data/company.service";
import {errorCatch} from "@/core/utils/api.helpers";
import {API_SERVER_URL} from "@/core/config/api.config";

const Home: NextPage<{ companies: ICompany[] | undefined }> = ({companies}) => {
	return (
		<Catalog
			data={companies || []}
			prefix='/company'
			title="Компании ${APP_SERVER_URL}"
			description={`Компании, зарегистрированные в приложении ${API_SERVER_URL}`}
		/>
	);
};

export const getStaticProps: GetStaticProps = async () => {

	try {
		const {data: companies} = await CompanyService.getAll()
		return {
			props: {companies},
			revalidate: 60
		}
	} catch (e) {
		console.log(errorCatch(e))
		return {
			props: {},
			// notFound: true,
		}
	}
}

export default Home
