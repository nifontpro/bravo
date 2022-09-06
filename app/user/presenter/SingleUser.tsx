import {FC} from 'react';
import {IUser} from "@/user/model/user.types";
import Meta from "@/core/utils/meta/Meta";
import Banner from "@/core/presenter/ui/banner/Banner";
import styles from '@/core/presenter/ui/form/form.module.scss';
import Catalog from "@/core/presenter/ui/catalog/Catalog";
import Button from "@/core/presenter/ui/form/Button";
import {useRouter} from "next/router";
import {userApi} from "@/user/data/user.api";
import {ICatalogData} from "@/core/presenter/ui/catalog/catalog.types";

const SingleUser: FC<{ user: IUser }> = ({user}) => {

	const {push} = useRouter()
	const {data: rewards, isLoading} = userApi.useGetRewardsQuery(user.id)

	const rewardToCatalog = (): ICatalogData[] => {
		if (!rewards) return []
		return rewards.map((r) => ({
			id: r.id,
			name: r.name,
			imageUrl: r.medal.imageUrl
		}))
	}

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

		<Button
			className="w-1/2 mx-auto my-3"
			onClick={() =>
				push({
					pathname: '/user/reward',
					query: {userId: user.id}
				})
			}
		>
			Наградить
		</Button>

		{isLoading ?
			<p>Загрузка списка наград...</p>
			:
			rewards?.length ? <Catalog
				data={rewardToCatalog()}
				prefix='/reward'
				title={"Награды сотрудника:"}
			/> : null
		}
	</Meta>
}

export default SingleUser