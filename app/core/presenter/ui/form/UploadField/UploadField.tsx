import {useUpload} from './useUpload'
import cn from 'classnames'
import Image from 'next/image'
import {FC} from 'react'

import styles from '../form.module.scss'
import SkeletonLoader from "@/core/presenter/ui/sceleton-loader/SkeletonLoader";
import {IUploadField} from "@/core/presenter/ui/form/form.interface";

const UploadField: FC<IUploadField> = (
	{
		placeholder,
		error,
		style,
		value,
		folder,
		onChange,
		isNoImage = false,
	}) => {

	const {uploadFile, isLoading} = useUpload(onChange, folder)

	return (
		<div className={cn(styles.field, styles.uploadField)} style={style}>
			<div className={styles.uploadFlex}>
				<label>
					<span>{placeholder}</span>
					<input type="file" onChange={uploadFile}/>
					{error && <div className={styles.error}>{error.message}</div>}
				</label>
				{!isNoImage && (
					<div className={styles.uploadImageContainer}>
						{isLoading ? (
							<SkeletonLoader count={1} className="w-full h-full"/>
						) : (
							value && <Image src={value} alt="" layout="fill" unoptimized/>
						)}
					</div>
				)}
			</div>
		</div>
	)
}

export default UploadField
