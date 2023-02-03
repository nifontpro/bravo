export interface IFolder {
	name: string
	description?: string
	parentId: string // Ссылка на родительскую папку
	childrenIds: string[] // Список id дочерних папок
	createDate: number
	updateDate: number
	id: string
}