import {NextPage} from "next";
import AuthComponent from "@/core/providers/AuthProvider/AuthComponent";
import DepartmentCreate from '@/department/presenter/admin/create/DepartmentCreate';

const DepartmentsPage: NextPage = () => {
	return <AuthComponent minRole={"director"}>
		<DepartmentCreate/>
	</AuthComponent>
};

export default DepartmentsPage;