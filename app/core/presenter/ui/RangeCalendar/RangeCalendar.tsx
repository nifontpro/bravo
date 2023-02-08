import styles from './RangeCalendar.module.scss';
import cn from 'classnames';
import { RangeCalendarProps } from './RangeCalendar.props';
import { DatePicker, DatePickerProps } from 'antd';
import dayjs from 'dayjs';
import CalenradIcon from './calendar.svg';
import { convertCorrectDataForUnix } from '@/core/utils/convertCorrectDataForUnix';
import { useState } from 'react';
import { useWindowSize } from '@/core/hooks/useWindowSize';

type RangeValue = Parameters<
  NonNullable<React.ComponentProps<typeof DatePicker.RangePicker>['onChange']>
>[0];

const RangeCalendar = ({
  setEndDate,
  setStartDate,
  placement,
  className,
  ...props
}: RangeCalendarProps): JSX.Element => {
  const { RangePicker } = DatePicker;
  // const dateFormat = 'DD.MM.YYYY';

  const onChange = (values: RangeValue, formatString: [string, string]) => {
    if (formatString[0].length > 0 && formatString[1].length > 0) {
      setStartDate(
        dayjs(dayjs(convertCorrectDataForUnix(formatString[0]))).unix() * 1000
      );
      setEndDate(
        dayjs(dayjs(convertCorrectDataForUnix(formatString[1]))).unix() * 1000
      );
    }
  };

  const { windowSize } = useWindowSize();

  return (
    <div {...props} className={cn(styles.calendar, className)}>
      <div className={styles.icon}>
        <CalenradIcon />
      </div>
      <RangePicker
        format='DD.MM.YYYY'
        className={styles.calendar}
        inputReadOnly={true}
        placeholder={['Начало', 'Конец']}
        size='large'
        suffixIcon={false}
        separator={'-'}
        onChange={onChange}
        placement={placement}
        popupStyle={windowSize.winWidth < 1210 ? {
          position: 'fixed',
          width: `${windowSize.winWidth}`
        } : {}}
        // style={{
        //   height: "auto",
        //   width: "1000px",
        //   // border: "none",
        //   // borderRadius: "0px",
        //   // cursor: "pointer",
        //   // fontSize: "17px",
        //   // margin: "0px",
        //   // padding: "0px"
        // }}
      />
    </div>
  );
};

export default RangeCalendar;
