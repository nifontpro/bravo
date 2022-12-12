export interface IAuthInput {
 	email: string
 	password: string
}
export interface ILoginInput {
 	name: string,
 	login: string,
 	password: string,
 	// Исправь Check на английский шрифт:
 	passwordСheck?: string, // ??? Нужно убрать, оставив только поля нужные для запроса, а для редактирование - отдельный интерфейс, можно отнаследоваться
 	email: string
 }