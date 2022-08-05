import {GetServerSideProps, NextPage} from "next";
import {errorCatch} from "@/core/utils/api.helpers";
import {departmentApi} from "@/department/data/department.api";
import SingleDepartment from "@/department/presenter/SingleDepartment";
import Error404 from "../404";

const SingleDepartmentPage: NextPage<{ id: string | undefined }> = ({id}) => {

	const {data: department} = departmentApi.useGetByIdQuery(id || '')
	return department ?
		<SingleDepartment department={department}/>
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

export default SingleDepartmentPage