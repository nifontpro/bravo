import Department from './Department/Department';
import Htag from '@/core/presenter/ui/Htag/Htag';
import styles from './DepartmentAndUsers.module.scss';
import User from './User/User';
import { FC, useState } from 'react';
import cn from 'classnames';
import ButtonCircleIcon from '../../../core/presenter/ui/ButtonCircleIcon/ButtonCircleIcon';
import { ICompany } from '@/company/model/company.types';
import { useDepartmentAdmin } from '@/department/presenter/admin/useDepartmentAdmin';
import { useRouter } from 'next/router';

const DepartmentAndUsers: FC<{ company: ICompany }> = ({ company }) => {
  const { push } = useRouter();
  const [toggle, setToogle] = useState<boolean>(false);
  const { createAsync } = useDepartmentAdmin(company.id);

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.choice}>
            <Htag
              tag='h3'
              onClick={() => setToogle(false)}
              className={cn(styles.choices, {
                [styles.underline]: toggle == false,
              })}
            >
              Отделы
            </Htag>
            <Htag
              tag='h3'
              onClick={() => setToogle(true)}
              className={cn(styles.choices, {
                [styles.underline]: toggle == true,
              })}
            >
              Сотрудники
            </Htag>
          </div>
          <div className={styles.new}>
            <div className={styles.newDepartment}>
              <ButtonCircleIcon
                onClick={() => push('/manage/department/create')}
                icon='plus'
                appearance='black'
              />
              Отдел
            </div>
            <div className={styles.newUser}>
              <ButtonCircleIcon
                onClick={() => push('/manage/user/create')}
                icon='plus'
                appearance='black'
              />
              Сотрудник
            </div>
          </div>
        </div>
        {toggle == false && <Department company={company} />}
        {toggle == true && <User />}
      </div>
    </div>
  );
};

export default DepartmentAndUsers;
