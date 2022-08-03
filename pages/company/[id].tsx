import {GetStaticPaths, GetStaticProps, NextPage} from "next";
import Error404 from "../404";
import SingleCompany from "@/company/presenter/SingleCompany";
import {errorCatch} from "@/core/utils/api.helpers";
import {CompanyService} from "@/company/data/company.service";
import {ICompany} from "@/company/model/company.types";

const SingleCompanyPage: NextPage<ICompany | undefined> = (company) => {

	return company ?
		<SingleCompany company={company}/>
		:
		<Error404/>
}

export const getStaticPaths: GetStaticPaths = async () => {
	return {
		paths: [],
		// fallback: 'blocking'
		fallback: true
	}
}

export const getStaticProps: GetStaticProps = async ({params}) => {
	try {
		const id = String(params?.id)
		const {data: company} = await CompanyService.getById(id)

		return {
			props: company
		}
	} catch (e) {
		console.log(errorCatch(e))
		return {props: {}}
	}
}

export default SingleCompanyPage