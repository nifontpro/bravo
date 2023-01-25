import {FC, PropsWithChildren} from 'react';
import {ISeo} from "@/core/utils/meta/meta.interface";
import {useRouter} from "next/router";
import Head from "next/head";
import logoImage from '@/core/presenter/images/logo.svg'
import {siteName, titleMerge} from "../../config/seo.config";
import {onlyText} from "@/core/utils/meta/clearText";

const Meta: FC<PropsWithChildren<ISeo>> =
	({
		 title,
		 description,
		 image,
		 children
	 }) => {
		const {asPath} = useRouter()

		// Получаем url текущей страницы:
		const currentUrl = `${process.env.APP_URL}${asPath}`
		/*		В случае, если description есть, мы делаем обычные индексы поиска,
		если нет, страница не будет индексироваться для поиска*/
		return (
			<>
				{description ? (
					<Head>
						<title itemProp='headline'>{titleMerge(title)}</title>
						<meta
							itemProp='description'
							name='description'
							content={onlyText(description, 152)}
						/>
						<link rel='canonical' href={currentUrl}/>
						<meta property='og:locale' content='en'/>
						<meta property='og:title' content={titleMerge(title)}/>
						<meta property='og:url' content={currentUrl}/>
						<meta property='og:image' content={image || logoImage}/>
						<meta property='og:site_name' content={siteName}/>
						{/* <meta
							property='og:description'
							content={onlyText(description, 197)}
						/> */}
					</Head>
				) : (
					<meta name='robots' content='noindex, nofollow'/>
					// <MetaNoIndex title={title} />
				)}
				{children}
			</>
		)
	};

export default Meta;