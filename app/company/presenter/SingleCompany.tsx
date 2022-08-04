import {FC} from 'react';
import {ICompany} from "@/company/model/company.types";
import Meta from "@/core/utils/meta/Meta";
import Banner from "@/core/presenter/ui/banner/Banner";
import {useDispatch} from "react-redux";
import {companyActions} from "@/company/data/company.slice";

const SingleCompany: FC<{ company: ICompany }> = ({company}) => {

	const dispatch = useDispatch()

	const handleClick = () => {
		dispatch(companyActions.setState(company))
	}

	return <Meta title={company.name} description={`Просмотр компании ${company.name}`}>
		<Banner
			imagePath={company.imageUrl || ''}
			Detail={() => null}
		/>
		<h1>Наименование компании: {company.name}</h1>
		<h2>Описание: {company.description}</h2>
		<button onClick={handleClick} className="@apply hover:text-gray-300">
			Выбрать по умолчанию
		</button>
	</Meta>
}

export default SingleCompany