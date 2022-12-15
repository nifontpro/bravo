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
import { IUser } from '@/user/model/user.types';
import { getDepartmentEditUrl } from '@/core/config/api.config';

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
//   const { data: countAwards } = userApi.useGetAwardCountByDepartmentQuery(data.id,);
// console.log(`Кол медалей в отедле ${data.name} ${countAwards?.awards}`)
// console.log(`Кол номинаций в отедле ${data.name} ${countAwards?.nominee}`)
// console.log(`Кол всего в отедле ${data.name} ${countAwards?.total}`)
// console.log(`Кол всего в отедле ${data.name} ${countAwards?.total}`)

  // let arrUser: IUser[] = []
  // usersInDepartment?.forEach((item) => {
  //   arrUser.push(item)
  // })

  // console.log(arrUser)

  // if (usersInDepartment != undefined) {
  //   usersInDepartment.sort((prev: IUser, next: IUser) => {
  //     if (prev != undefined && next != undefined) {
  //       if (prev.lastname < next.lastname) return -1;
  //       if (prev.lastname < next.lastname) return 1;
  //     }
  //   });
  // }

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
            getUrl={getDepartmentEditUrl}
            onMouseLeave={() => setVisible(!visible)}
            id={data.id}
            deleteAsync={() => deleteAsync(data.id)}
            visible={visible}
          />
        </div>
        <P size='m' className={styles.description}>
          {data.description}
        </P>
      </div>

      <CountUsersPreview
        onClick={() => setListUserVisible(!listUserVisible)}
        appearanceBtn='white'
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
