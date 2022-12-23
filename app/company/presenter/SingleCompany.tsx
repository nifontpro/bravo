import { FC } from 'react';
import { ICompany } from '@/company/model/company.types';
import Meta from '@/core/utils/meta/Meta';
import styles from './SingleCompany.module.scss';
import TitleSingleCompany from './TitleSingleCompany/TitleSingleCompany';
import DepartmentAndUsers from './DepartmentAndUsers/DepartmentAndUsers';
import ButtonCircleIcon from '@/core/presenter/ui/ButtonCircleIcon/ButtonCircleIcon';
import { useRouter } from 'next/router';
import AuthComponent from '@/core/providers/AuthProvider/AuthComponent';

const SingleCompany: FC<{ company: ICompany }> = ({ company }) => {
  const { push } = useRouter();

  return (
    <Meta
      title={company.name}
      description={`Просмотр компании ${company.name}`}
    >
      <AuthComponent minRole={'director'}>
        <ButtonCircleIcon
          onClick={() => push('/company')}
          appearance='black'
          icon='down'
        >
          Вернуться назад
        </ButtonCircleIcon>
      </AuthComponent>

      <div className={styles.wrapper}>
        <TitleSingleCompany company={company} />
        <DepartmentAndUsers company={company} />
      </div>
    </Meta>
  );
};

export default SingleCompany;
