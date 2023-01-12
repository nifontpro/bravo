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
import { getDepartmentEditUrl } from '@/core/config/api.config';
import AuthComponent from '@/core/providers/AuthProvider/AuthComponent';
import { motion } from 'framer-motion';

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

  const variants = {
    visible: {
      opacity: 1,
      height: 'auto',
    },
    hidden: {
      opacity: 0,
      height: '0',
    },
  };

  return (
    <motion.div className={styles.wrapper} {...props}>
      <div className={styles.header}>
        <div className={styles.title}>
          <Htag tag='h3'>{data.name}</Htag>
          <AuthComponent minRole={'director'}>
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
          </AuthComponent>
        </div>
        <P size='m' type='silverBtn' className={styles.description}>
          {data.description}
        </P>
      </div>

      <motion.div
        animate={listUserVisible ? 'hidden' : 'visible'}
        variants={variants}
        initial='hidden'
        transition={{ duration: 0.5 }}
      >
        <CountUsersPreview
          onClick={() => setListUserVisible(!listUserVisible)}
          appearanceBtn='black'
          listUserVisible={listUserVisible}
          usersInDepartment={usersInDepartment}
        />
      </motion.div>

      <motion.div
        animate={listUserVisible ? 'visible' : 'hidden'}
        variants={variants}
        initial='hidden'
        transition={{ duration: 0.5 }}
        className={cn(
          styles.listUsers
          //   , {
          //   [styles.listUsersVisible]: listUserVisible,
          //   [styles.listUsersHidden]: !listUserVisible,
          // }
        )}
      >
        <ListUser
          usersInDepartment={usersInDepartment}
          listUserVisible={listUserVisible}
        />
        <div className={styles.button}>
          <Button
            onClick={() => setListUserVisible(!listUserVisible)}
            appearance='whiteBlack'
            size='s'
          >
            Свернуть
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
};
export default Depart;
