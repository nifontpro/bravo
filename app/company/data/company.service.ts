import {axiosCore} from "@/core/data/axios.core";
import {ICompany} from "@/company/model/company.types";
import {getCompanyUrl} from "@/core/config/api.config";

export const CompanyService = {

	async getAll() {
		return await axiosCore.post<ICompany[]>(getCompanyUrl('/all'),
			{filter: ""})
	},

	async getById(id: string) {
		return axiosCore.post<ICompany>(getCompanyUrl("/get_id"), {
			companyId: id
		})
	}
}