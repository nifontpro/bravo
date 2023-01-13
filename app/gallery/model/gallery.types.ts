export interface IGalleryObject {
	name: string
	description?: string
	folderId: string
	countLink: number // Количество ссылок на объект

	createDate: number
	updateDate?: number

	imageUrl: string
	imageKey: string

	id: string
}