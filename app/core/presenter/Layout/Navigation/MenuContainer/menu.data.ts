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
	link: '/departments',
	title: 'Мои отделы',
}

const itemUser: IMenuItem = {
	icon: 'MdGroup',
	link: '/users',
	title: 'Мои сотрудники',
}

export const firstMenu: IMenu = {
	title: menuTitle,
	items: [
		itemHome,
		itemDepartment,
		itemUser,
	],
}

export const firstMenuOwner: IMenu = {
	title: menuTitle,
	items: [
		itemHome,
		itemCompany,
		itemDepartment,
		itemUser,
	],
}

export const firstMenuAdmin: IMenu = {
	title: menuTitle,
	items: [
		itemHome,
		itemDepartment,
		itemUser,
	],
}

export const firstMenuDirector: IMenu = {
	title: menuTitle,
	items: [
		itemHome,
		itemUser,
	],
}

export const userMenuTitle = 'Сервис'

export const userMenu: IMenu = {
	title: userMenuTitle,
	items: [],
}