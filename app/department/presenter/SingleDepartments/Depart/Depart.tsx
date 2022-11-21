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

const Depart = ({
  data,
  children,
  className,
  ...props
}: DepartProps): JSX.Element => {
  const [visible, setVisible] = useState<boolean>(false);

  const { deleteAsync } = useDepartmentAdmin(data.companyId);

  // console.log(data)

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
          <EditPanel id={data.id} deleteAsync={deleteAsync} visible={visible} />
        </div>
        <P size='m' className={styles.description}>
          {data.description}
        </P>
      </div>
      <div>Колличество сотрудников</div>
      <ListUser />
    </div>
  );
};
export default Depart;
