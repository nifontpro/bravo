import {FC} from 'react';
import Meta from "@/core/utils/meta/Meta";
import Heading from "@/core/presenter/ui/heading/Heading";
import Catalog from "@/core/presenter/ui/catalog/Catalog";
import {ICompany} from "@/company/model/company.types";
import {medalApi} from "@/medal/data/medal.api";
import { awardApi } from 'award/data/award.api';
import Htag from '@/core/presenter/ui/Htag/Htag';

const Medals: FC<{ company: ICompany }> = ({company}) => {

	const {data: medals, isLoading} = medalApi.useGetByCompanyQuery(company.id)
	console.log(medals)
	const {data: awards} = awardApi.useGetAwardsByCompanyQuery({companyId: company.id})
	console.log(awards)

	return (
		<Meta title="Медали">
			<Htag tag='h2'>{`Награды компании ${company.name}`}</Htag>
			<div>
				
			</div>

			{isLoading ? <p>Загрузка...</p>
				:
				<div></div>
				// <Catalog
				// 	data={medals || []}
				// 	prefix='/medal'
				// 	title="Медали"
				// 	description={`Медали, созданные в компании ${company.name}`}
				// />
			}
		</Meta>
	);
};

export default Medals;