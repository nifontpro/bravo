import Cookies from "js-cookie";
import {IAuthResponse} from "@/auth/model/auth.types";
import {REFRESH_TOKEN_LIFE} from "@/core/config/api.config";
import {ICompany} from "@/company/model/company.types";
import {IDepartment} from "@/department/model/department.types";

const REFRESH_TOKEN = "refreshToken"
const ACCESS_TOKEN = "accessToken"
const COMPANY = 'company'
const DEPARTMENT = "department"

export const removeLocalData = () => {
	Cookies.remove(REFRESH_TOKEN)
	Cookies.remove(ACCESS_TOKEN)
	localStorage.removeItem(COMPANY)
	localStorage.removeItem(DEPARTMENT)
}

export const saveTokensToCookie = (data: IAuthResponse) => {
/*	Cookies.set(REFRESH_TOKEN, data.refreshToken, {
		expires: REFRESH_TOKEN_LIFE, sameSite: "Strict", secure: true}
	)
	Cookies.set(ACCESS_TOKEN, data.accessToken, {sameSite: "Strict", secure: true})*/
	Cookies.set(REFRESH_TOKEN, data.refreshToken, {
		expires: REFRESH_TOKEN_LIFE}
	)
	Cookies.set(ACCESS_TOKEN, data.accessToken)
}

export const saveCompanyToStorage = (company: ICompany) => {
	localStorage.setItem(COMPANY, JSON.stringify(company))
}

export const saveDepartmentToStorage = (department: IDepartment) => {
	localStorage.setItem(DEPARTMENT, JSON.stringify(department))
}

export const getRefreshCookie = () => {
	return Cookies.get(REFRESH_TOKEN)
}

export const getAccessTokenFromCookie = () => {
	return Cookies.get(ACCESS_TOKEN)
}

export const getCompanyByStorage = (): ICompany | null => {
	return getStoreLocal(COMPANY)
}

export const getDepartmentByStorage = (): IDepartment | null => {
	return getStoreLocal(DEPARTMENT)
}

export const getStoreLocal = (name: string) => {
	if (typeof localStorage !== 'undefined') {
		const ls = localStorage.getItem(name)
		return ls ? JSON.parse(ls) : null
	}
	return null
}