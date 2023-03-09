import { IActivity } from '@/activity/model/activity.types';
import { DatePickerProps } from 'antd';
import {
  DetailedHTMLProps,
  Dispatch,
  HTMLAttributes,
  SetStateAction,
} from 'react';

export type RangeCalendarProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  setStartDate: Dispatch<SetStateAction<number>>;
  setEndDate: Dispatch<SetStateAction<number>>;
  placement: DatePickerProps['placement'];
  startDate: number;
  endDate: number;
  setSizePage: Dispatch<SetStateAction<number>>
  setArr: Dispatch<SetStateAction<IActivity[]>>
};
