import {GetServerSideProps, NextPage} from "next";
import {errorCatch} from "@/core/utils/api.helpers";
import Error404 from "../404";
import {medalApi} from "@/medal/data/medal.api";
import SingleMedal from "@/medal/presenter/SingleMedal";

const SingleMedalPage: NextPage<{ id: string }> = ({id}) => {

	const {data: medal} = medalApi.useGetByIdQuery(id)
	return medal ?
		<SingleMedal medal={medal}/>
		:
		<Error404/>
}

export const getServerSideProps: GetServerSideProps = async ({params}) => {
	try {
		const id = String(params?.id)
		return {
			props: {id}
		}
	} catch (e) {
		console.log(errorCatch(e))
		return {notFound: true}
	}
}

export default SingleMedalPage