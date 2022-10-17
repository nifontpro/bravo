import {getAdminHomeUrl, getAdminUrl} from "@/core/config/url.config";
import {INavItem} from "./admin-navigation.types";
import {TypeRoles} from "@/auth/model/auth.roles";

const mStat: INavItem = {title: 'Статистика', link: getAdminHomeUrl()}
const mCompany: INavItem = {title: 'Компании', link: getAdminUrl('company')}
const mDepartment: INavItem = {title: 'Отделы', link: getAdminUrl('department')}
const mUser: INavItem = {title: 'Сотрудники', link: getAdminUrl('user')}
const mMedal: INavItem = {title: 'Медали', link: getAdminUrl('medal')}


export const navItems = (role?: TypeRoles): INavItem[] => {
	switch (role) {
		case "owner":
			return [mStat, mCompany, mDepartment, mUser, mMedal]
		case "admin":
			return [mStat, mDepartment, mUser, mMedal]
		case "director":
			return [mStat, mUser, mMedal]
		case "user":
			return [mStat]
		default:
			return [mStat]
	}
}