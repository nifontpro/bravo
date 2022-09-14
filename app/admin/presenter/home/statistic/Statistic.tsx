import {FC} from 'react'
import {useAuthState} from "@/auth/data/auth.slice";
import {companyApi} from "@/company/data/company.api";
import {checkRole} from "@/auth/model/auth.roles";
import {departmentApi} from "@/department/data/department.api";
import {useCompanyState} from "@/company/data/company.slice";
import styles from "./Statistic.module.scss"
import {userApi} from "@/user/data/user.api";
import {useDepartmentState} from "@/department/data/department.slice";
import {medalApi} from "@/medal/data/medal.api";
import {rewardApi} from "../../../../reward/data/reward.api";

const Statistic: FC = () => {

	const {user} = useAuthState()
	const {currentCompany} = useCompanyState()
	const {currentDepartment} = useDepartmentState()

	const {data: companyCount} = companyApi.useGetCountQuery(undefined, {skip: user?.role != "owner"})
	const {data: departmentCount} = departmentApi.useGetCountQuery(
		currentCompany?.id || '', {skip: !currentCompany}
	)
	const {data: userCompanyCount} = userApi.useGetCountByCompanyQuery(
		currentCompany?.id || '', {skip: !currentCompany}
	)
	const {data: userDepartmentCount} = userApi.useGetCountByDepartmentQuery(
		currentDepartment?.id || '', {skip: !currentDepartment}
	)
	const {data: medalCount} = medalApi.useGetCountByCompanyQuery(
		currentCompany?.id || '', {skip: !currentCompany}
	)
	const {data: rewardCount} = rewardApi.useGetRewardCountByCompanyQuery(
		currentCompany?.id || '', {skip: !currentCompany}
	)

	return <div className={styles.main}>
		<div className={styles.card}>

			{checkRole(user?.role, "owner") && (companyCount != undefined) && <div>
				Количество компаний владельца: <span>{companyCount}</span>
			</div>}

			{currentCompany && (departmentCount != undefined) && <div>
				Количество отделов компании {currentCompany.name}: <span>{departmentCount}</span>
			</div>}

			<div className={styles.divider}/>

			{currentCompany && (userCompanyCount != undefined) && <div>
				Количество сотрудников в компании: <span>{userCompanyCount}</span>
			</div>}

			{(currentDepartment && (userDepartmentCount != undefined)) && <div>
				Количество сотрудников в отделе {currentDepartment.name}: <span>{userDepartmentCount}</span>
			</div>}

			<div className={styles.divider}/>

			{currentCompany && (medalCount != undefined) && <div>
				Количество медалей в компании: <span>{medalCount}</span>
			</div>}

			{currentCompany && (rewardCount != undefined) && <div>
				Количество награждений в компании: <span>{rewardCount}</span>
			</div>}

		</div>
	</div>
}

export default Statistic