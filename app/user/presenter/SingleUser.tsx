import {FC} from 'react';
import {IUser} from "@/user/model/user.types";
import Meta from "@/core/utils/meta/Meta";
import Banner from "@/core/presenter/ui/banner/Banner";
import styles from '@/core/presenter/ui/form/form.module.scss';
import {medalApi} from "@/medal/data/medal.api";
import Catalog from "@/core/presenter/ui/catalog/Catalog";

const SingleUser: FC<{ user: IUser }> = ({user}) => {

	const {data: medals, isLoading} = medalApi.useGetByUserIdQuery(user.id)

	return <Meta title={user.name} description={`Профиль сотрудника ${user.name}`}>
		<Banner
			imagePath={user.imageUrl}
			Detail={() => null}
		/>
		<div className={styles.singleEntity}>
			<h1>{user.login}</h1>
			<h1>ФИО сотрудника: {user.lastname} {user.name} {user.patronymic}</h1>
			<h2>Роль: {user.role}</h2>
		</div>
		{isLoading ? <p>Загрузка списка наград...</p>
			:
			<Catalog
				data={medals || []}
				prefix='/medal'
				title={medals?.length ? "Награды сотрудника:" : ""}
			/>
		}
	</Meta>
}

export default SingleUser