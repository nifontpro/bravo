export interface IBaseRequest {
    page?: number
    pageSize?: number
    filter?: string
    field?: string // Поле для сортировки
    direction?: number // Направление сортировки 1 / -1 (1 по умолчанию)
}

export interface IGetGalleryRequest extends IBaseRequest {
    folderId: string
}