import {FC} from 'react';
import Meta from "@/core/utils/meta/Meta";
import Heading from "@/core/presenter/ui/heading/Heading";
import Catalog from "@/core/presenter/ui/catalog/Catalog";
import {useAppSelector} from "@/core/data/store";
import {IUser} from "@/user/model/user.types";
import {userApi} from "@/user/data/user.api";

const Users: FC = () => {

	let users: IUser[] | undefined = undefined
	let loading = false

	const {currentDepartment} = useAppSelector(state => state.department)
	if (currentDepartment) {
		const {data: getUsers, isLoading} = userApi.useGetByDepartmentQuery(currentDepartment.id)
		users = getUsers
		loading = isLoading
	}

	const departmentName = currentDepartment?.name || ''

	return (
		<Meta title="Сотрудники отдела">
			<Heading title={`Сотрудники отдела ${departmentName}`}/>

			{loading ? <p>Загрузка...</p>
				:
				<Catalog
					data={users || []}
					prefix='/users'
					title="Сотрудники"
					description={`В этом списке находятся сотрудники отдела ${departmentName}`}
				/>
			}
		</Meta>
	);
};

export default Users;