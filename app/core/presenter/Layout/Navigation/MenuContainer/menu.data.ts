import {IMenu, IMenuItem} from '@/core/presenter/Layout/Navigation/MenuContainer/menu.interface'

export const menuTitle = 'Меню'

const itemHome: IMenuItem = {
	icon: 'MdHome',
	link: '/',
	title: 'Главная',
}

const itemCompany: IMenuItem = {
	icon: 'MdAccountBalance',
	link: '/company',
	title: 'Мои компании',
}

const itemDepartment: IMenuItem = {
	icon: 'MdFoundation',
	link: '/department',
	title: 'Мои отделы',
}

const itemUser: IMenuItem = {
	icon: 'MdGroup',
	link: '/user',
	title: 'Мои сотрудники',
}

const itemMedals: IMenuItem = {
	icon: 'MdHotelClass',
	link: '/medal',
	title: 'Медали',
}

export const firstMenu: IMenu = {
	title: menuTitle,
	items: [
		itemHome,
	],
}

export const firstMenuOwner: IMenu = {
	title: menuTitle,
	items: [
		itemHome,
		itemCompany,
		itemDepartment,
		itemUser,
		itemMedals
	],
}

export const firstMenuAdmin: IMenu = {
	title: menuTitle,
	items: [
		itemHome,
		itemDepartment,
		itemUser,
		itemMedals
	],
}

export const firstMenuDirector: IMenu = {
	title: menuTitle,
	items: [
		itemHome,
		itemUser,
		itemMedals
	],
}

export const userMenuTitle = 'Сервис'

export const userMenu: IMenu = {
	title: userMenuTitle,
	items: [],
}