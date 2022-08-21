import {FC} from 'react';
import Meta from "@/core/utils/meta/Meta";
import Banner from "@/core/presenter/ui/banner/Banner";
import {IDepartment} from "@/department/model/department.types";
import {departmentActions} from "@/department/data/department.slice";
import {useDispatch} from "react-redux";
import {saveDepartmentToStorage} from "@/auth/data/auth.helper";
import Button from "@/core/presenter/ui/form/Button";

const SingleDepartment: FC<{ department: IDepartment }> = ({department}) => {

	const dispatch = useDispatch()

	const handleClick = () => {
		saveDepartmentToStorage(department)
		dispatch(departmentActions.setState(department))
	}

	return <Meta title={department.name} description={`Отдел ${department.name}`}>
		<Banner
			imagePath={department.imageUrl}
			Detail={() => null}
		/>
		<h1>Наименование отдела: {department.name}</h1>
		<h2>Описание: {department.description}</h2>
		<Button onClick={handleClick}>
			Выбрать по умолчанию
		</Button>
	</Meta>
}

export default SingleDepartment