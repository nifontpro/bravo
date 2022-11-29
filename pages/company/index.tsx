import OwnerCompany from "@/company/presenter/OwnerCompany";
import {NextPage} from "next";
import AuthComponent from "@/core/providers/AuthProvider/AuthComponent";
import { useRouter } from 'next/router';
import { useAuthState } from '@/auth/data/auth.slice';
import { useEffect } from 'react';

const CompaniesPage: NextPage = () => {

	return <AuthComponent minRole={"owner"}>
		<OwnerCompany/>
	</AuthComponent>
}

export default CompaniesPage