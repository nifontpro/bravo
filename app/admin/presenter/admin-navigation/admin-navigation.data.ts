import {getAdminHomeUrl, getAdminUrl} from "@/core/config/url.config";
import {INavItem} from "./admin-navigation.types";

export const navItems: INavItem[] = [
	{title: 'Статистика', link: getAdminHomeUrl()},
	{title: 'Компании', link: getAdminUrl('company'),},
	{title: 'Отделы', link: getAdminUrl('department'),},
	{title: 'Пользователи', link: getAdminUrl('user'),},
	{title: 'Награды', link: getAdminUrl('medal'),},
]