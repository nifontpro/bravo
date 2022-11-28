import styles from './TitleSingleCompany.module.scss';
import cn from 'classnames';
import { TitleSingleCompanyProps } from './TitleSingleCompany.props';
import { ImageDefault } from '@/core/presenter/ui/icons/ImageDefault';
import Htag from '@/core/presenter/ui/Htag/Htag';
import P from '@/core/presenter/ui/P/P';
import ButtonCircleIcon from '@/core/presenter/ui/ButtonCircleIcon/ButtonCircleIcon';
import EditPanel from '@/core/presenter/ui/EditPanel/EditPanel';
import { useState } from 'react';
import { useDepartmentAdmin } from '@/department/presenter/admin/useDepartmentAdmin';
import { useCompanyAdmin } from '../admin/useCompanyAdmin';
import { useMyUser } from '@/user/presenter/useMyUsers';
import { userApi } from '@/user/data/user.api';
import CountUsersPreview from '@/core/presenter/ui/CountUsersPreview/CountUsersPreview';

const TitleSingleCompany = ({
  company,
  children,
  className,
  ...props
}: TitleSingleCompanyProps): JSX.Element => {
  const { data: users } = userApi.useGetByCompanyQuery({
    companyId: company.id,
  });

  let URL = '/manage/company/edit/';

  const [visible, setVisible] = useState<boolean>(false);

  const { deleteAsync } = useCompanyAdmin();

  return (
    <div className={styles.titleCompany}>
      <div>
        <ImageDefault
          src={company.imageUrl}
          width={400}
          height={400}
          alt='company img'
          objectFit='cover'
          className='rounded-[27px]'
        />
      </div>

      <div className={styles.companyDescription}>
        <div className={styles.title}>
          <Htag tag='h1' className={styles.header}>
            {company.name}
          </Htag>
          <ButtonCircleIcon
            onClick={() => setVisible(!visible)}
            icon='dots'
            appearance='transparent'
          />
          <EditPanel
            URL={URL}
            onMouseLeave={() => setVisible(!visible)}
            id={company.id}
            deleteAsync={deleteAsync}
            visible={visible}
          />
        </div>

        <P size='s' className={styles.description}>
          {company.description}
        </P>
        <div className={styles.contacts}>
          <a href='tel:+74999228594'>+74999228594</a>
          <a href='mailto:hello@familyagency.ru'>hello@familyagency.ru</a>
        </div>
        <div className={styles.colUsers}>
          <CountUsersPreview usersInDepartment={users}/>
        </div>
      </div>
    </div>
  );
};
export default TitleSingleCompany;
