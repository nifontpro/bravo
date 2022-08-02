import {axiosClassic} from "../api/interceptors";
import {ICompany} from "../model/company.types";
import {getCompanyUrl} from "../config/api.config";

export const CompanyService = {

	async getAll() {
		/*
				const {data: companies} = await axios.get<ICompany[]>(getCompanyUrl('/list'))
				return companies
		*/
		return await axiosClassic.get<ICompany[]>(getCompanyUrl('/all'))
	},

/*	async getByOwner() {
		return await axios.get<ICompany[]>(getCompanyUrl('/owner'))
	},*/

	async getById(id: string) {
		return axiosClassic.get<ICompany>(getCompanyUrl(), {
			params: {
				company_id: id
			}
		})
	}
}