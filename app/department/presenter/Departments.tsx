import {FC} from 'react';
import Meta from "@/core/utils/meta/Meta";
import Heading from "@/core/presenter/ui/heading/Heading";
import Catalog from "@/core/presenter/ui/catalog/Catalog";
import {departmentApi} from "@/department/data/department.api";
import {IDepartment} from "@/department/model/department.types";
import {useCompanyState} from "@/company/data/company.slice";

const Departments: FC = () => {

	let departments: IDepartment[] | undefined = undefined
	let loading = false

	const {currentCompany} = useCompanyState()
	if (currentCompany) {
		const {data: getDepartments, isLoading} = departmentApi.useGetByCompanyQuery(currentCompany.id)
		departments = getDepartments
		loading = isLoading
	}

	const companyName = currentCompany?.name || ''

	return (
		<Meta title="Отделы компании">
			<Heading title={`Отделы компании ${companyName}`}/>

			{loading ? <p>Загрузка...</p>
				:
				<Catalog
					data={departments || []}
					prefix='/department'
					title="Отделы"
					description={`В этом списке находятся отделы компании ${companyName}`}
				/>
			}
		</Meta>
	);
};

export default Departments;