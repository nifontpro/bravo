import {ChangeEvent, FC} from 'react';
import styles from './AdminHeader.module.scss'
import AdminCreateButton from "@/core/presenter/ui/admin-table/AdminHeader/AdminCreateButton";
// import SearchField from "@/core/presenter/ui/search-field/SearchField";

interface IAdminHeader {
	onClick?: () => void
	searchTerm: string
	handleSearch: (event: ChangeEvent<HTMLInputElement>) => void
}

const AdminHeader: FC<IAdminHeader> =
	({
		 onClick,
		 // handleSearch,
		 // searchTerm,
	 }) => {
		return (
			<div className={styles.header}>
				{/*<SearchField handleSearch={handleSearch} searchTerm={searchTerm}/>*/}
				{onClick && <AdminCreateButton onClick={onClick}/>}
			</div>
		)
	}

export default AdminHeader