import {FC, useState} from 'react'
import {medalApi} from "@/medal/data/medal.api";
import {useCompanyState} from "@/company/data/company.slice";
import {useRouter} from "next/router";
import Meta from "@/core/utils/meta/Meta";
import {userApi} from "@/user/data/user.api";
import MedalsList from "@/core/presenter/ui/list/MedalsList";
import {IMedal} from "@/medal/model/medal.types";
import {ImageDefault} from "@/core/presenter/ui/icons/ImageDefault";
import Button from "@/core/presenter/ui/form/Button";
import {toast} from "react-toastify";
import {toastError} from "@/core/utils/toast-error";

const RewardUser: FC = () => {

	const {query, back} = useRouter()
	const userId = String(query.userId)
	const [medal, setMedal] = useState<IMedal | undefined>(undefined)
	const {data: user} = userApi.useGetByIdQuery(userId, {skip: !(query.userId)})
	const {currentCompany} = useCompanyState()
	const {data: medals} = medalApi.useGetByCompanyQuery(currentCompany?.id || '', {skip: !currentCompany})
	const [rewardUser] = userApi.useRewardMutation()

	const handleClick = () => {
		if (!medal) return
		rewardUser({name: medal.name, score: medal.score || 0, userId, medalId: medal.id}).unwrap()
			.then(() => {
				toast.success("Сотрудник успешно награждён!")
				back()
			})
			.catch(e => {
				toastError(e, "Ошибка награждения сотрудника")
			})
	}

	return user ?
		<Meta title={user.name} description={`Награждение сотрудника ${user.name}`}>
			<div className="text-2xl font-bold">
				Награждение сотрудника: {user.lastname} {user.name} {user.patronymic}
				{currentCompany ?
					<div className="text-xl mt-3 font-medium">
						Выберите медаль из списка
						<MedalsList
							medals={medals || []}
							onClick={(medal) => {
								setMedal(medal)
							}}
						/>
						{medal ?
							<div className="flex flex-col items-center gap-4">
								Выбранная медаль: {medal?.name}
								<ImageDefault
									className="rounded-full animate-fade"
									src={medal.imageUrl}
									alt={medal.name}
									layout="fixed"
									width={120}
									height={120}
									objectFit="cover"
									draggable={false}
								/>
								Ценность: {medal.score}
								<Button onClick={handleClick}>
									Наградить
								</Button>
							</div>
							:
							<div>
								Медаль не выбрана
							</div>
						}

					</div>
					:
					<div>
						Необходимо выбрать компанию для получения списка наград!
					</div>
				}
			</div>
		</Meta>
		:
		<div>
			Сотрудник не найден
		</div>
}

export default RewardUser