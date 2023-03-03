import { IActivity } from '@/activity/model/activity.types';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export type SpinnerSmallProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  isFetching: boolean;
  handleNextPage: () => void
  activity: IActivity[] | undefined
  searchValue: string
};
