import {FC} from 'react';
import {IUser} from "@/user/model/user.types";
import Meta from "@/core/utils/meta/Meta";
import Banner from "@/core/presenter/ui/banner/Banner";
import styles from '@/core/presenter/ui/form/form.module.scss';

const SingleUser: FC<{ user: IUser }> = ({user}) => {

	return <Meta title={user.name} description={`Профиль сотрудника ${user.name}`}>
		<Banner
			imagePath={user.imageUrl}
			Detail={() => null}
		/>
		<div className={styles.singleEntity}>
			<h1>ФИО сотрудника: {user.lastname} {user.name} {user.patronymic}</h1>
			<h2>Роль: {user.role}</h2>
		</div>
	</Meta>
}

export default SingleUser