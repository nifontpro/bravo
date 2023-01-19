import {IMenu, IMenuItem} from '@/core/presenter/Layout/Navigation/MenuContainer/menu.interface'

export const menuTitle = 'Меню'

const itemHome: IMenuItem = {
	icon: 'main',
	link: '/',
	title: 'Сводка',
}

const itemCompany: IMenuItem = {
	icon: 'company',
	link: '/company',
	title: 'Компания',
}

const itemHelp: IMenuItem = {
	icon: 'help',
	link: '/help',
	title: 'Помощь',
}

// const itemDepartment: IMenuItem = {
// 	icon: 'MdFoundation',
// 	link: '/department',
// 	title: 'Мои отделы',
// }

// const itemUser: IMenuItem = {
// 	icon: 'MdGroup',
// 	link: '/user',
// 	title: 'Мои сотрудники',
// }

const itemMedals: IMenuItem = {
	icon: 'awards',
	link: '/award',
	title: 'Награды',
}

const itemRating: IMenuItem = {
	icon: 'rating',
	link: '/rating',
	title: 'Рейтинг',
}

const itemStatistic: IMenuItem = {
	icon: 'statistic',
	link: '/statistic',
	title: 'Статистика',
}

export const firstMenu: IMenu = {
	title: menuTitle,
	items: [
		itemHome,
		itemRating,
		itemMedals,
		itemCompany,
		// itemDepartment,
		// itemUser,

		itemStatistic,
		itemHelp
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
		itemStatistic,
		itemHelp
	],
}

export const firstMenuAdmin: IMenu = {
	title: menuTitle,
	items: [
		itemHome,
		// itemDepartment,
		// itemUser,
		itemMedals
	],
}

export const firstMenuDirector: IMenu = {
	title: menuTitle,
	items: [
		itemHome,
		// itemUser,
		itemMedals
	],
}

export const userMenuTitle = 'Сервис'

export const userMenu: IMenu = {
	title: userMenuTitle,
	items: [],
}