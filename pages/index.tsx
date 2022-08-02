import type {NextPage} from 'next'
import {GetStaticProps} from "next";
import {ICompany} from "../app/model/company.types";
import Catalog from "@/ui/catalog/Catalog";
import {CompanyService} from "@/services/company.service";
import {errorCatch} from "../app/api/api.helpers";

const Home: NextPage<{ companies: ICompany[] | undefined}> = ({companies}) => {
	return (
		<Catalog
			data={companies || []}
			title="Компании"
			description="Компании, зарегестрированные в приложении"
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
