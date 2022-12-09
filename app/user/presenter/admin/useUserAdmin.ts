import {ChangeEvent, useMemo, useState} from "react";
import {ITableItem} from "@/core/presenter/ui/admin-table/AdminTable/admin-table.types";
import {toast} from "react-toastify";
import {toastError} from "@/core/utils/toast-error";
import {userApi} from "@/user/data/user.api";
import {getAdminUrl} from "@/core/config/url.config";
import {useMyUser} from "@/user/presenter/useMyUsers";
import {IUser} from "@/user/model/user.types";
import {useDebounce} from "@/core/hooks/useDebounce";

function usersToTable(data: IUser[]): ITableItem[] {
	return data?.map(user => ({
		id: user.id,
		editUrl: getAdminUrl(`user/edit/${user.id}`),
		items: [
			user.lastname || '',
			user.name + ' ' + (user.patronymic || ''),
			user.role
		]
	}));
}

export const useUserAdmin = () => {
	const [searchTerm, setSearchTerm] = useState('')
	const debouncedSearch = useDebounce(searchTerm, 1000)
	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value)
	}

	const {users} = useMyUser(debouncedSearch)
	const tableUsers = usersToTable(users)

	const [deleteUser] = userApi.useDeleteMutation()

	return useMemo(
		() => {

			const deleteAsync = async (id: string) => {
				await deleteUser(id)
					.unwrap()
					.then(() => {
						toast.success("Профиль сотрудника успешно удален")
					})
					.catch(e => {
						toastError(e, "Ошибка при удалении профиля сотрудника")
					})
			}

			return {
				
				tableUsers,
				handleSearch,
				searchTerm,
				deleteAsync
			}
		},
		[ tableUsers, searchTerm, deleteUser]
	)
}