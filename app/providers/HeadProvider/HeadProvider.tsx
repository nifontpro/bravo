import {FC, PropsWithChildren} from 'react';
import NextNProgress from "nextjs-progressbar";
import {accentColor} from "../../config/constants";
import Head from "next/head";
import Favicons from "./FavIcons";

const HeadProvider: FC<PropsWithChildren> = ({children}) => {
	return (
		<>
			<NextNProgress
				color={accentColor}
				startPosition={0.3}
				stopDelayMs={0}
				height={3}
				showOnShallow={true}
				options={{speed: 1000}}
				nonce="my-nonce"
			/>
			<Head>
				<meta charSet="UTF-8"/>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1, maximum-scale=5"
				/>

				<Favicons/>

				<meta name="theme-color" content={'#181B1E'}/>
				<meta name="msapplication-navbutton-color" content={'#181B1E'}/>
				<meta
					name="apple-mobile-web-app-status-bar-style"
					content={'#181B1E'}
				/>
				<link rel='manifest' href='/manifest.json'/>
				<title></title>
			</Head>
			{children}
		</>
	);
};

export default HeadProvider;