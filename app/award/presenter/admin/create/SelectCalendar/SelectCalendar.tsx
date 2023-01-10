import styles from './SelectCalendar.module.scss';
import cn from 'classnames';
import { SelectCalendarProps } from './SelectCalendar.props';
import { DatePicker } from 'antd';
import locale from 'antd/es/date-picker/locale/ru_RU';
import P from '../../../../../core/presenter/ui/P/P';

type RangeValue = Parameters<
  NonNullable<React.ComponentProps<typeof DatePicker.RangePicker>['onChange']>
>[0];

const SelectCalendar = ({
  handleChangeDate,
  error,
  title,
  className,
  ...props
}: SelectCalendarProps): JSX.Element => {
  const dateFormat= 'DD.MM.YYYY'

  return (
    <div {...props} className={cn(styles.calendar, className)}>
      <P className={styles.placeholder}>{title}</P>
      <DatePicker
        locale={locale}
        format={dateFormat}
        className={cn(styles.calendar, {
          [styles.error]: error,
        })}
        inputReadOnly={true}
        placeholder={'ДД.ММ.ГГГГ'}
        size='large'
        onChange={handleChangeDate}
        suffixIcon={false}
      />
    </div>
  );
};

export default SelectCalendar;
