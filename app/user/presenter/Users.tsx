import {FC} from 'react';
import Meta from "@/core/utils/meta/Meta";
import Heading from "@/core/presenter/ui/heading/Heading";
import Catalog from "@/core/presenter/ui/catalog/Catalog";
import {IUser} from "@/user/model/user.types";
import {userApi} from "@/user/data/user.api";
import {useDepartmentState} from "@/department/data/department.slice";

const Users: FC = () => {

	let users: IUser[] | undefined = undefined
	let loading = false

	const {currentDepartment} = useDepartmentState()
	if (currentDepartment) {
		const {data: getUsers, isLoading} = userApi.useGetByDepartmentQuery(currentDepartment.id)
		users = getUsers
		loading = isLoading
	}

	const departmentName = currentDepartment?.name || ''

	return currentDepartment ? (
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
	) : null
};

export default Users;