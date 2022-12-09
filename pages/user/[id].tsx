import {GetServerSideProps, NextPage} from "next";
import {errorCatch} from "@/core/utils/api.helpers";
import Error404 from "../404";
import {userApi} from "@/user/data/user.api";
import SingleUser from "@/user/presenter/SingleUser/SingleUser";

const SingleUserPage: NextPage<{ id: string | undefined }> = ({id}) => {

	const {data: user} = userApi.useGetByIdWithAwardsQuery(id || '', {skip: !id})
	return user ?
		<SingleUser user={user}/>
		:
		<Error404/>
}

export const getServerSideProps: GetServerSideProps = async ({params}) => {
	try {
		const id = params?.id
		return {
			props: {id}
		}
	} catch (e) {
		console.log(errorCatch(e))
		return {notFound: true}
	}
}

export default SingleUserPage