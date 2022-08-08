import {FC} from 'react';
import Meta from "@/core/utils/meta/Meta";
import Heading from "@/core/presenter/ui/heading/Heading";
import AdminNavigation from "../admin-navigation/AdminNavigation";

const Admin: FC = () => {
	return <Meta title='Панель Администрирования'>
		<AdminNavigation/>
		<Heading title='Основная статистика'/>
		{/*<Statistics/>*/}
	</Meta>
}

export default Admin