import '@/core/presenter/styles/globals.scss'
import type {AppProps} from 'next/app'
import MainProvider from "@/core/providers/MainProvider";

function MyApp({Component, pageProps}: AppProps) {
	return <MainProvider>
		<Component {...pageProps} />
	</MainProvider>
}

export default MyApp
