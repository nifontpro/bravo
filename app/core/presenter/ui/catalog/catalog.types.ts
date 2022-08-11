export interface ICatalogData {
	id: string
	imageUrl?: string
	name: string
}

export interface ICatalog {
	title: string
	description?: string
	prefix: string
	data: ICatalogData[]
}
