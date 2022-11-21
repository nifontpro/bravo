import {FC} from 'react';
import Catalog from "@/core/presenter/ui/catalog/Catalog";
import Meta from "@/core/utils/meta/Meta";
// import Heading from "@/core/presenter/ui/heading/Heading";
import {companyApi} from "@/company/data/company.api";
import Htag from '@/core/presenter/ui/Htag/Htag';

const OwnerCompany: FC = () => {

	const {data: companies, isLoading} = companyApi.useGetByOwnerQuery()

	console.log(companies)

	return (
		<Meta title="Компании владельца">
			<Htag tag='h1'>Ваши компании</Htag>

			{isLoading ? <p>Загрузка...</p>
				:
				<Catalog
					data={companies || []}
					prefix='/company'
					title="Ваши компании"
					description="В этом списке компании, к котрым вы имеете доступ"
				/>
			}
		</Meta>
	);
};

export default OwnerCompany