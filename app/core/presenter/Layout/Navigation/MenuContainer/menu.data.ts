import {IMenu, IMenuItem} from '@/core/presenter/Layout/Navigation/MenuContainer/menu.interface'

export const menuTitle = 'Меню'

const itemHome: IMenuItem = {
	icon: 'MdHome',
	link: '/',
	title: 'Сводка',
}

const itemCompany: IMenuItem = {
	icon: 'MdAccountBalance',
	link: '/company',
	title: 'Отделы и сотрудники',
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
	link: '/award',
	title: 'Награды',
}

const itemRating: IMenuItem = {
	icon: 'MdHotelClass',
	link: '/rating',
	title: 'Рейтинг',
}

const itemStatistic: IMenuItem = {
	icon: 'MdHotelClass',
	link: '/statistic',
	title: 'Статистика',
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
		itemMedals,
		itemCompany,
		// itemDepartment,
		// itemUser,
		itemRating,
		itemStatistic
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