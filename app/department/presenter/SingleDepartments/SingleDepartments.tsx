import styles from './SingleDepartments.module.scss';
// import cn from 'classnames';
import { SingleDepartmentsProps } from './SingleDepartments.props';
// import P from '@/core/presenter/ui/P/P';
// import Htag from '@/core/presenter/ui/Htag/Htag';
// import ButtonIcon from '@/core/presenter/ui/ButtonCircleIcon/ButtonCircleIcon';
// import { useDepartmentAdmin } from '../admin/useDepartmentAdmin';
import Depart from './Depart/Depart';
import ButtonCircleIcon from '@/core/presenter/ui/ButtonCircleIcon/ButtonCircleIcon';
import { getDepartmentCreateUrl } from '@/core/config/api.config';
import { useRouter } from 'next/router';
import AuthComponent from '@/core/providers/AuthProvider/AuthComponent';

const SingleDepartments = ({
  data,
  prefix,
  children,
  className,
  ...props
}: SingleDepartmentsProps): JSX.Element => {
  const { push } = useRouter();

  return (
    <div {...props} className={styles.wrapper}>
      <AuthComponent minRole={'director'}>
        <div
          className={styles.newDepartment}
          onClick={() => push(getDepartmentCreateUrl())}
        >
          <ButtonCircleIcon
            icon='plus'
            appearance='black'
            className={styles.newDepartmentBtn}
          >
            Отдел
          </ButtonCircleIcon>
        </div>
      </AuthComponent>

      {data?.map((item) => {
        return <Depart key={item.id} data={item} />;
      })}
    </div>
  );
};
export default SingleDepartments;
