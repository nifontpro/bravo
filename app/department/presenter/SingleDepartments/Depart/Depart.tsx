import styles from './Depart.module.scss';
import cn from 'classnames';
import { DepartProps } from './Depart.props';
import P from '@/core/presenter/ui/P/P';
import Htag from '@/core/presenter/ui/Htag/Htag';
import ButtonIcon from '@/core/presenter/ui/ButtonCircleIcon/ButtonCircleIcon';
import { useDepartmentAdmin } from '../../admin/useDepartmentAdmin';
import { useState } from 'react';
import EditPanel from '@/core/presenter/ui/EditPanel/EditPanel';
import ListUser from './ListUsers/ListUser';
import Button from '@/core/presenter/ui/Button/Button';
import { userApi } from '@/user/data/user.api';
import CountUsersPreview from '@/core/presenter/ui/CountUsersPreview/CountUsersPreview';

const Depart = ({
  data,
  children,
  className,
  ...props
}: DepartProps): JSX.Element => {
  const { data: usersInDepartment } = userApi.useGetByDepartmentQuery({
    departmentId: data.id,
    filter: '',
  });

  const [visible, setVisible] = useState<boolean>(false);
  const [listUserVisible, setListUserVisible] = useState<boolean>(false);

  const { deleteAsync } = useDepartmentAdmin(data.companyId);

  return (
    <div className={styles.wrapper} {...props}>
      <div className={styles.header}>
        <div className={styles.title}>
          <Htag tag='h3'>{data.name}</Htag>
          <ButtonIcon
            onClick={() => setVisible(!visible)}
            icon='dots'
            appearance='transparent'
          />
          <EditPanel
            onMouseLeave={() => setVisible(!visible)}
            id={data.id}
            deleteAsync={deleteAsync}
            visible={visible}
          />
        </div>
        <P size='m' className={styles.description}>
          {data.description}
        </P>
      </div>

      <CountUsersPreview
        onClick={() => setListUserVisible(!listUserVisible)}
        // className={cn(styles.colUser, {
        //   [styles.colUserVisible]: !listUserVisible,
        //   [styles.colUserHidden]: listUserVisible,
        // })}
        listUserVisible={listUserVisible}
        usersInDepartment={usersInDepartment}
      />

      <div
        className={cn(styles.listUsers, {
          [styles.listUsersVisible]: listUserVisible,
          [styles.listUsersHidden]: !listUserVisible,
        })}
      >
        <ListUser
          usersInDepartment={usersInDepartment}
          listUserVisible={listUserVisible}
        />
        <div className={styles.button}>
          <Button
            onClick={() => setListUserVisible(!listUserVisible)}
            appearance='white'
            size='s'
          >
            Свернуть
          </Button>
        </div>
      </div>
    </div>
  );
};
export default Depart;
