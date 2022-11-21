import Departments from "@/department/presenter/Departments";
import AuthComponent from "@/core/providers/AuthProvider/AuthComponent";
// import {useCompanyState} from "@/company/data/company.slice";
import { ICompany } from '@/company/model/company.types';
import { FC } from 'react';

const Department: FC<{ company: ICompany }> =({ company }) => {

	// const {currentCompany} = useCompanyState()

	return <AuthComponent minRole={"admin"}>
		{company ?
			<Departments company={company}/>
			:
			<div className="@apply text-2xl">
				Выберите компанию, список отделов которой должен быть отображен
			</div>
		}
	</AuthComponent>
}

export default Department;