import {axiosCore} from "@/core/data/axios.core";
import {ICompany} from "@/company/model/company.types";
import {getCompanyUrl} from "@/core/config/api.config";

export const CompanyService = {

	async getAll() {
		/*
				const {data: companies} = await axios.get<ICompany[]>(getCompanyUrl('/list'))
				return companies
		*/
		return await axiosCore.get<ICompany[]>(getCompanyUrl('/all'))
	},

/*	async getByOwner() {
		return await axios.get<ICompany[]>(getCompanyUrl('/owner'))
	},*/

	async getById(id: string) {
		return axiosCore.get<ICompany>(getCompanyUrl(), {
			params: {
				company_id: id
			}
		})
	}
}