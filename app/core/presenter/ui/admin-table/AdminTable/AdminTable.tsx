import {FC} from 'react'

import styles from './AdminTable.module.scss'
import AdminTableHeader from './AdminTableHeader'
import AdminTableItem from './AdminTableItem'
import {ITableItem} from './admin-table.types'

interface IAdminTable {
	tableItems: ITableItem[]
	headerItems: string[]
	isLoading: boolean
	removeHandler: (id: string) => void
}

const AdminTable: FC<IAdminTable> =
	({
		 tableItems,
		 headerItems,
		 isLoading,
		 removeHandler,
	 }) => {
		return (
			<div>
				<AdminTableHeader headerItems={headerItems}/>

				{isLoading ? (
					// <SkeletonLoader count={1} height={48} className="mt-4"/>
					<div>Загрузка...</div>
				) : tableItems.length ? (
					tableItems.map((tableItem) => (
						<AdminTableItem
							key={tableItem.id}
							tableItem={tableItem}
							removeHandler={removeHandler}
						/>
					))
				) : (
					<div className={styles.notFound}>Нет данных</div>
				)}
			</div>
		)
	}

export default AdminTable
