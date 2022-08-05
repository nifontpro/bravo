import Departments from "@/department/presenter/Departments";
import {NextPageAuth} from "@/auth/model/auth.roles";

const DepartmentsPage: NextPageAuth = () => {

	DepartmentsPage.role = "admin"

	return (
		<div>
			<Departments/>
		</div>
	);
};

// DepartmentsPage.role = "admin"

export default DepartmentsPage;