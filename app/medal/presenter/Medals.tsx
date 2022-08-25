import {FC} from 'react';
import Meta from "@/core/utils/meta/Meta";
import Heading from "@/core/presenter/ui/heading/Heading";
import Catalog from "@/core/presenter/ui/catalog/Catalog";
import {ICompany} from "@/company/model/company.types";
import {medalApi} from "@/medal/data/medal.api";

const Medals: FC<{ company: ICompany }> = ({company}) => {

	const {data: medals, isLoading} = medalApi.useGetByCompanyQuery(company.id)

	return (
		<Meta title="Награды">
			<Heading title={`Все награды компании ${company.name}`}/>

			{isLoading ? <p>Загрузка...</p>
				:
				<Catalog
					data={medals || []}
					prefix='/medal'
					title="Награды сотрудников"
					description={`Награды, созданные в компании ${company.name}`}
				/>
			}
		</Meta>
	);
};

export default Medals;