export interface IBaseRequest {
    page?: number // Номер страницы
    pageSize?: number // Размер страницы (сколько выводить элементов)
    filter?: string // Фильтр по имени
    field?: string // Поле для сортировки (сейчас по startDate идет, установить поумолчанию на него. Использовать с учетом регистра. По имени null установить)
    direction?: number // Направление сортировки 1 / -1 (1 по умолчанию)
}

export interface IGetGalleryRequest extends IBaseRequest {
    folderId: string
}