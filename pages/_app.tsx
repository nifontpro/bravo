import '@/core/presenter/styles/globals.scss'
import type {AppProps} from 'next/app'
import {TypeComponentAuthFields} from "@/auth/model/auth.roles";
import MainProvider from "@/core/providers/MainProvider";

type TypeAppProps = AppProps & TypeComponentAuthFields

function MyApp({Component, pageProps}: TypeAppProps) {
	return <MainProvider Component={Component}>
		<Component {...pageProps} />
	</MainProvider>
}

export default MyApp
