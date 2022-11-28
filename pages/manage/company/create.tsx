import {NextPage} from "next";
import AuthComponent from "@/core/providers/AuthProvider/AuthComponent";
import CompanyCreate from '@/company/presenter/admin/create/CompanyCreate';

const DepartmentsPage: NextPage = () => {
	return <AuthComponent minRole={"director"}>
		<CompanyCreate/>
	</AuthComponent>
};

export default DepartmentsPage;