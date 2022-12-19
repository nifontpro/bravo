
import { IUserAwardsCountDep } from '@/user/model/count.types';
import { IUserAwards } from '@/user/model/user.types';
import { IAward } from 'award/model/award.types';
import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react"

export type MainAwarsProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    children?: ReactNode;
    awards: IAward[]
    users: IUserAwards[]
    awardsOnCompanyGroupDep: IUserAwardsCountDep[]
}