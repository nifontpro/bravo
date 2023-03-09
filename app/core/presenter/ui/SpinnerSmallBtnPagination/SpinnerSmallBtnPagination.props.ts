import { IActivity } from '@/activity/model/activity.types';
import { IAwardUsers } from '@/award/model/award.types';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export type SpinnerSmallBtnPaginationProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  isFetching: boolean;
  handleNextPage: () => void
  content: IActivity[] | IAwardUsers[] | undefined
  searchValue: string
  btnEndTitle: string
  btnSubmitTitle: string
  startDate: number | undefined
  endDate: number | undefined
};
