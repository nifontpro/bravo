import {FC} from 'react';
import {ICompany} from "@/company/model/company.types";
import Meta from "@/core/utils/meta/Meta";
import Banner from "@/core/presenter/ui/banner/Banner";
import {companyApi} from "@/company/data/company.api";

const SingleCompany: FC<{ company: ICompany }> = ({company}) => {

	const [create] = companyApi.useCreateCompanyMutation()

	return <Meta title={company.name} description={`Просмотр компании ${company.name}`}>
		<Banner
			imagePath={company.imageUrl || ''}
			Detail={() => null}
		/>
		<h1>Наименование компании: {company.name}</h1>
		<h2>Описание: {company.description}</h2>
		<button onClick={() => create({name: 'Test', description: 'Description'})}>
			Добавить
		</button>
	</Meta>
}

export default SingleCompany