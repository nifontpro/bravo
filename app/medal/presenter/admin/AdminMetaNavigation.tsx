import {FC, PropsWithChildren} from 'react'
import Meta from "@/core/utils/meta/Meta";
import AdminNavigation from "@/admin/presenter/admin-navigation/AdminNavigation";
import Heading from "@/core/presenter/ui/heading/Heading";

const AdminMetaNavigation: FC<PropsWithChildren<{ title: string }>> = ({title, children}) => {
	return <div>
		<Meta title={title}>
			<AdminNavigation/>
			<Heading title={title}/>
			{children}
		</Meta>
	</div>
}

export default AdminMetaNavigation