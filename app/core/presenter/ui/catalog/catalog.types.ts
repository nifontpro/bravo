export interface ICatalogData {
	id: string
	imageUrl: string | null
	name: string
}

export interface ICatalog {
	title: string
	description?: string
	data: ICatalogData[]
}
