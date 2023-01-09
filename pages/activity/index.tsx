import Activity from '@/activity/presenter/Activity';
import { useCompanyState } from '@/company/data/company.slice';
import AuthComponent from '@/core/providers/AuthProvider/AuthComponent';
import {NextPage} from "next";

const StatisticPage: NextPage = () => {
	const {currentCompany} = useCompanyState()

	return <AuthComponent minRole={"user"}>
		{currentCompany ? <Activity company={currentCompany}/>
			:
			<div className="@apply text-2xl">
				Для просмотра статистики сначала выберите компанию
			</div>
		}
	</AuthComponent>
};

export default StatisticPage;