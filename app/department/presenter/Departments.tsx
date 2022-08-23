import {FC} from 'react';
import Meta from "@/core/utils/meta/Meta";
import Heading from "@/core/presenter/ui/heading/Heading";
import Catalog from "@/core/presenter/ui/catalog/Catalog";
import {departmentApi} from "@/department/data/department.api";
import {ICompany} from "@/company/model/company.types";

const Departments: FC<{ company: ICompany }> = ({company}) => {

	const {data: departments, isLoading} = departmentApi.useGetByCompanyQuery(company.id)

	return (
		<Meta title="Отделы компании">
			<Heading title={`Отделы компании ${company.name}`}/>

			{isLoading ? <p>Загрузка...</p>
				:
				<Catalog
					data={departments || []}
					prefix='/department'
					title="Отделы"
					description={`В этом списке находятся отделы компании ${company.name}`}
				/>
			}
		</Meta>
	);
};

export default Departments;