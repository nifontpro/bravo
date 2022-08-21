import {FC} from 'react';
import Meta from "@/core/utils/meta/Meta";
import Heading from "@/core/presenter/ui/heading/Heading";
import Catalog from "@/core/presenter/ui/catalog/Catalog";
import {useMyUser} from "@/user/presenter/useMyUsers";

const Users: FC = () => {

	const {users, isLoading} = useMyUser()

	return <Meta title="Сотрудники">
		<Heading title={`Вы и Ваши сотрудники`}/>

		{isLoading ? <p>Загрузка...</p>
			:
			<Catalog
				data={users || []}
				prefix='/user'
				title="Сотрудники"
				description={`Список сотрудников`}
			/>
		}
	</Meta>
}

export default Users;