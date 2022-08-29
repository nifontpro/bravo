import { FC } from 'react'
import Button from "@/core/presenter/ui/form/Button";

const AdminCreateButton: FC<{ onClick?: () => void }> = ({ onClick }) => {
	return <Button className="shadow-lg" onClick={onClick}>Создать</Button>
}

export default AdminCreateButton