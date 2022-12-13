import styles from './StatisticDepartments.module.scss';

import { StatisticDepartmentsProps } from './StatisticDepartments.props';
import cn from 'classnames';
import { useDepartment } from '@/department/presenter/useDepartment';



const StatisticDepartments = ({
  companyId,
  className,
  ...props
}: StatisticDepartmentsProps): JSX.Element => {

  const { departmentInCompany } = useDepartment('');
  console.log(departmentInCompany)

  return <div {...props} className={cn(styles.wrapper, className)}></div>;
};

export default StatisticDepartments;
