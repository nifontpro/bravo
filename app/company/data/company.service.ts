import {axiosCore} from "@/core/data/axios.core";
import {ICompany} from "@/company/model/company.types";
import {getCompanyUrl} from "@/core/config/api.config";

export const CompanyService = {

	async getAll() {
		return await axiosCore.get<ICompany[]>(getCompanyUrl('/all'))
	},

	async getById(id: string) {
		return axiosCore.get<ICompany>(getCompanyUrl(), {
			params: {
				companyId: id
			}
		})
	}
}