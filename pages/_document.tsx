import {Head, Html, Main, NextScript} from 'next/document'

export default function Document() {
	return (
		<Html lang='en'>
			<Head>
				<link
					href="https://fonts.googleapis.com/css2?family=Philosopher:wght@300;400;500;600;700&display=swap"
					rel="stylesheet"
				/>
				{/* eslint-disable-next-line @next/next/no-title-in-document-head */}
				<title></title>
			</Head>
			<body>
			<Main/>
			<NextScript/>
			</body>
		</Html>
	)
}