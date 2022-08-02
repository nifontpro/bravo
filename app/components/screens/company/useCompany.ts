import {useQuery} from 'react-query'
import {useAuth} from "@/hooks/useAuth";
import {CompanyService} from "@/services/company.service";

export const useCompany = () => {

	const {user} = useAuth()

	const {
		isLoading,
		data: companies,
		refetch,
	} = useQuery('Company by owner', () => CompanyService.getByOwner(), {
		select: ({ data }) => data,
		enabled: !!user
	})

	return { isLoading, companies, refetch }
}
