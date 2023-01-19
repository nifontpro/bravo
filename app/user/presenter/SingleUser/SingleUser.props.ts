import { IUserAwardsUnion } from '@/user/model/user.types';
import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react"

export type SingleUserProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    children?: ReactNode;
    user: IUserAwardsUnion
}