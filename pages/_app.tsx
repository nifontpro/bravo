import '../app/styles/globals.scss'
import type {AppProps} from 'next/app'
import {TypeComponentAuthFields} from "@/shared/auth.types";
import MainProvider from "../app/providers/MainProvider";

type TypeAppProps = AppProps & TypeComponentAuthFields

function MyApp({Component, pageProps}: TypeAppProps) {
	return <MainProvider Component={Component}>
		<Component {...pageProps} />
	</MainProvider>
}

export default MyApp
