import Heading from '@/core/presenter/ui/heading/Heading'
import Meta from "@/core/utils/meta/Meta";

export default function Error401() {
	return (
		<Meta title='Unauthorized'>
			<Heading title='401 - Unauthorized: У Вас нет доступа к этой странице!'/>
		</Meta>
	)
}
