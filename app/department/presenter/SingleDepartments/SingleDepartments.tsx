// import styles from './SingleDepartments.module.scss';
// import cn from 'classnames';
import { SingleDepartmentsProps } from './SingleDepartments.props';
// import P from '@/core/presenter/ui/P/P';
// import Htag from '@/core/presenter/ui/Htag/Htag';
// import ButtonIcon from '@/core/presenter/ui/ButtonCircleIcon/ButtonCircleIcon';
// import { useDepartmentAdmin } from '../admin/useDepartmentAdmin';
import Depart from './Depart/Depart';

const SingleDepartments = ({
  data,
  prefix,
  children,
  className,
  ...props
}: SingleDepartmentsProps): JSX.Element => {

  return (
    <div {...props} className='animate-fade'>
      {data?.map((item) => {
        return <Depart key={item.id} data={item} />;
      })}
    </div>
  );
};
export default SingleDepartments;
