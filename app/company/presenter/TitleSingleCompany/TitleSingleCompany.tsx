import styles from './TitleSingleCompany.module.scss';
import cn from 'classnames';
import { TitleSingleCompanyProps } from './TitleSingleCompany.props';
import { ImageDefault } from '@/core/presenter/ui/icons/ImageDefault';
import Htag from '@/core/presenter/ui/Htag/Htag';
import P from '@/core/presenter/ui/P/P';
import ButtonCircleIcon from '@/core/presenter/ui/ButtonCircleIcon/ButtonCircleIcon';
import EditPanel from '@/core/presenter/ui/EditPanel/EditPanel';
import { useState } from 'react';
// import { useDepartmentAdmin } from '@/department/presenter/admin/useDepartmentAdmin';
import { useCompanyAdmin } from '../admin/useCompanyAdmin';
// import { useMyUser } from '@/user/presenter/useMyUsers';
import { userApi } from '@/user/data/user.api';
import CountUsersPreview from '@/core/presenter/ui/CountUsersPreview/CountUsersPreview';
import GpsIcon from './gps.svg';
import { getCompanyEditUrl, getCompanyUrl } from '@/core/config/api.config';
import AuthComponent from '@/core/providers/AuthProvider/AuthComponent';

const TitleSingleCompany = ({
  company,
  children,
  className,
  ...props
}: TitleSingleCompanyProps): JSX.Element => {
  const { data: users } = userApi.useGetByCompanyDepNameQuery({
    companyId: company.id,
  });

  const [visible, setVisible] = useState<boolean>(false);

  const { deleteAsync } = useCompanyAdmin();

  return (
    <div className={styles.titleCompany} {...props}>
      <div className={styles.img}>
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
          <AuthComponent minRole={'director'}>
            <ButtonCircleIcon
              onClick={() => setVisible(!visible)}
              icon='dots'
              appearance='transparent'
            />
            <EditPanel
              getUrl={getCompanyEditUrl}
              onMouseLeave={() => setVisible(!visible)}
              id={company.id}
              deleteAsync={deleteAsync}
              visible={visible}
            />
          </AuthComponent>
        </div>

        <div className={styles.address}>
          <GpsIcon className='mr-[10px]' />
          <P size='s' className={styles.description}>
            {company.address}
          </P>
        </div>

        <P size='s' className={styles.description}>
          {company.description}
        </P>
        <div className={styles.contacts}>
          <a href='tel:+74999228594'>{company.phone}</a>
          <a href='mailto:hello@familyagency.ru'>{company.email}</a>
        </div>
        <div className={styles.colUsers}>
          <CountUsersPreview
            appearanceBtn='black'
            usersInDepartment={users}
            className={styles.default}
          />
        </div>
      </div>
    </div>
  );
};
export default TitleSingleCompany;
