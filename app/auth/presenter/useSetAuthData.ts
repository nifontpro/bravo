import {companyApi} from "@/company/data/company.api";
import {departmentApi} from "@/department/data/department.api";
import {useMemo} from "react";
import {IAuthResponse} from "@/auth/model/auth.types";
import {ICompany} from "@/company/model/company.types";
import {getCompanyByStorage} from "@/auth/data/auth.helper";
import {useDispatch} from "react-redux";
import {companyActions} from "@/company/data/company.slice";

/**
 * Хук устанавливает текущую компанию и отдел при входе пользователя
 */

export const useSetAuthData = () => {
    const [setCompany] = companyApi.useSetByIdMutation()
    const [setDepartment] = departmentApi.useSetByIdMutation()
    const [getOwnerCompanies] = companyApi.useGetByOwnerParamMutation()
    const dispatch = useDispatch();

    return useMemo(() => {

            const setAuthData = async (data: IAuthResponse) => {
                const user = data.user

                if ((user.role == "admin" || user.role == "director" || user.role == "user") && user.companyId) {
                    setCompany(user.companyId)
                }
                if ((user.role == "director" || user.role == "user") && user.departmentId) {
                    setDepartment(user.departmentId)
                }

                /**
                 * Установка у владельца первой компании по умолчанию
                 * (Для версии MVP, где у него одна компания)
                 */
                if (user.role == "owner" && getCompanyByStorage() == null) {

                    await getOwnerCompanies().unwrap().then(async (companies: ICompany[]) => {
                        console.log('COMPANIES:')
                        console.log(companies)
                        if (companies.length > 0) {
                            // setCompany(companies[0].id)
                            console.log("SET COMPANY: " + companies[0].name)
                            dispatch(companyActions.setState(companies[0]));
                        }
                    })
                }

                // dispatch(authSlice.actions.setWs()) // Открываем сокет
            }
            return {setAuthData}
        }, [dispatch, getOwnerCompanies, setCompany, setDepartment]
    )
}