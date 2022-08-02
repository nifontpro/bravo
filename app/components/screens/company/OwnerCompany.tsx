import {FC} from 'react';
import Catalog from "@/ui/catalog/Catalog";
import {useCompany} from "@/screens/company/useCompany";
import Meta from "@/utils/meta/Meta";
import Heading from "@/ui/heading/Heading";

const OwnerCompany: FC = () => {

	const {companies, isLoading} = useCompany()

	return (
		<Meta title="Компании владельца">
			<Heading title={'Компании владельца'}/>

			{isLoading ? <p>Загрузка...</p>
				:
				<Catalog
					data={companies || []}
					title="Ваши компании"
					description="В этом списке компании, к котрым вы имеете доступ"
				/>
			}
		</Meta>
	);
};

export default OwnerCompany;