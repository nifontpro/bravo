import {FC} from 'react';
import {ICompany} from "@/company/model/company.types";
import Meta from "@/core/utils/meta/Meta";
import Banner from "@/core/presenter/ui/banner/Banner";
import {useDispatch} from "react-redux";
import {companyActions} from "@/company/data/company.slice";
import Button from "@/core/presenter/ui/form/Button";
import styles from '@/core/presenter/ui/form/form.module.scss';
import {saveCompanyToStorage} from "@/auth/data/auth.helper";

const SingleCompany: FC<{ company: ICompany }> = ({company}) => {

	const dispatch = useDispatch()

	const handleClick = () => {
		dispatch(companyActions.setState(company))
		saveCompanyToStorage(company)
	}

	return <Meta title={company.name} description={`Просмотр компании ${company.name}`}>
		<Banner
			imagePath={company.imageUrl}
			Detail={() => null}
		/>
		<div className={styles.singleEntity}>
			<h1>Наименование компании: {company.name}</h1>
			<h2>Описание: {company.description}</h2>
			<Button onClick={handleClick}>
				Выбрать по умолчанию
			</Button>
		</div>
	</Meta>
}

export default SingleCompany