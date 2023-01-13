export interface IGetActivitiesRequest {
    companyId: string

    startDate?: number // ограничения по дате событий
    endDate?: number

    filter?: string // фильтрация по фамилии/имени сотрудника или наименованию отдела
    sort?: number // направление сортировки по дате 1 / -1 (по умолчанию -1 - по убыванию)

    page?: number // номер страницы, начиная с 0
    pageSize?: number // размер страницы, если эти 2 параметра не указаны, то все элементы
}