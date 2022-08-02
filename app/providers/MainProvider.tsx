import {FC, PropsWithChildren} from 'react'
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {Provider} from "react-redux";
import {store} from "../api/store/store";
import {TypeComponentAuthFields} from "../model/auth.types";
import {QueryClient, QueryClientProvider} from "react-query";
import HeadProvider from "./HeadProvider/HeadProvider";
import AuthProvider from "./AuthProvider/AuthProvider";
import Layout from "@/components/layout/Layout";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
})

const MainProvider: FC<PropsWithChildren<TypeComponentAuthFields>> =
	({children, Component}) => {
		return (
			<HeadProvider>
				<Provider store={store}>
					<QueryClientProvider client={queryClient}>
						<ToastContainer position="bottom-right" newestOnTop/>
						<AuthProvider Component={Component}>
							<Layout>{children}</Layout>
						</AuthProvider>
					</QueryClientProvider>
				</Provider>
			</HeadProvider>
		)
	}

export default MainProvider
