import {FC} from 'react';
import {ICompany} from "../../../model/company.types";
import Meta from "@/utils/meta/Meta";
import Banner from "@/ui/banner/Banner";

const SingleCompany: FC<{ company: ICompany }> = ({company}) => {

	return <Meta title={company.name} description={`Просмотр компании ${company.name}`}>
		<Banner
			imagePath={company.imageUrl || ''}
			Detail={() => null}
		/>
		<h1>Наименование компании: {company.name}</h1>
		<h2>Описание: {company.description}</h2>
	</Meta>
}

export default SingleCompany