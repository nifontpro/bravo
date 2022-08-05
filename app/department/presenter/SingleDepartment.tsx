import {FC} from 'react';
import Meta from "@/core/utils/meta/Meta";
import Banner from "@/core/presenter/ui/banner/Banner";
import {IDepartment} from "@/department/data/department.types";
import {departmentActions} from "@/department/data/department.slice";
import {useDispatch} from "react-redux";

const SingleDepartment: FC<{ department: IDepartment }> = ({department}) => {

	const dispatch = useDispatch()

	const handleClick = () => {
		dispatch(departmentActions.setState(department))
	}

	return <Meta title={department.name} description={`Отдел ${department.name}`}>
		<Banner
			imagePath={department.imageUrl}
			Detail={() => null}
		/>
		<h1>Наименование отдела: {department.name}</h1>
		<h2>Описание: {department.description}</h2>
		<button onClick={handleClick} className="@apply hover:text-gray-300">
			Выбрать по умолчанию
		</button>
	</Meta>
}

export default SingleDepartment