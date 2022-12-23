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
import {
  getDepartmentCreateUrl,
  getUserCreateUrl,
} from '@/core/config/api.config';
import AuthComponent from '@/core/providers/AuthProvider/AuthComponent';
import { useDepartment } from '@/department/presenter/useDepartment';
import { useMyUser } from '@/user/presenter/useMyUsers';
import P from '@/core/presenter/ui/P/P';

const DepartmentAndUsers: FC<{ company: ICompany }> = ({ company }) => {
  const { departmentInCompany: departments, isLoading } = useDepartment('')
  const { users } = useMyUser('')

  const { push } = useRouter();
  const [toggle, setToogle] = useState<boolean>(false);

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
              <P className={styles.rewardedLength}>{departments.length}</P>
            </Htag>
            <Htag
              tag='h3'
              onClick={() => setToogle(true)}
              className={cn(styles.choices, {
                [styles.underline]: toggle == true,
              })}
            >
              Сотрудники
              <P className={styles.rewardedLength}>{users.length}</P>
            </Htag>
          </div>
          <AuthComponent minRole={'director'}>
            <div className={styles.new}>
              <div className={styles.newDepartment}>
                <ButtonCircleIcon
                  onClick={() => push(getDepartmentCreateUrl())}
                  icon='plus'
                  appearance='black'
                />
                Отдел
              </div>
              <div className={styles.newUser}>
                <ButtonCircleIcon
                  onClick={() => push(getUserCreateUrl())}
                  icon='plus'
                  appearance='black'
                />
                Сотрудник
              </div>
            </div>
          </AuthComponent>
        </div>
        {toggle == false && <Department company={company} />}
        {toggle == true && <User />}
      </div>
    </div>
  );
};

export default DepartmentAndUsers;
