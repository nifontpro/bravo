export interface IUserSaveSettingRequest {
    userId: string
    showOnboarding: boolean // true, если просмотрено
    pageOnboarding: number // Номер последней просмотренной страницы
}

export interface IUserSetting extends IUserSaveSettingRequest {
    found: boolean // Признак, найдена ли сохраненная запись с настройками (false - если не было сохранения)
}