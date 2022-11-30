import { FC, useEffect } from 'react';
import { ICompany } from '@/company/model/company.types';
import Meta from '@/core/utils/meta/Meta';
// import Banner from '@/core/presenter/ui/banner/Banner';
import { useDispatch } from 'react-redux';
import { companyActions } from '@/company/data/company.slice';
// import Button from '@/core/presenter/ui/form/Button';
import styles from './SingleCompany.module.scss';
import { saveCompanyToStorage } from '@/auth/data/auth.helper';
// import { userApi } from '@/user/data/user.api';
// import Catalog from '@/core/presenter/ui/catalog/Catalog';
// import cn from 'classnames';
// import { ImageDefault } from '@/core/presenter/ui/icons/ImageDefault';
import TitleSingleCompany from './TitleSingleCompany/TitleSingleCompany';
import DepartmentAndUsers from './DepartmentAndUsers/DepartmentAndUsers';
import ButtonCircleIcon from '@/core/presenter/ui/ButtonCircleIcon/ButtonCircleIcon';
import { useRouter } from 'next/router';

const SingleCompany: FC<{ company: ICompany }> = ({ company }) => {
  // console.log(company)
  const { push } = useRouter();
  const dispatch = useDispatch();

  console.log(company)

  // const { data: bestUsers, isLoading } = userApi.useGetBestsQuery({
  //   companyId: company.id,
  //   limit: 5,
  // });

  // То что ниже нужно переделать
  useEffect(() => {
    if (company != undefined) {
      dispatch(companyActions.setState(company));
      saveCompanyToStorage(company);
    }
  }, []);
  // То что выше нужно переделать

  //   const handleClick = () => {
  //     dispatch(companyActions.setState(company));
  //     saveCompanyToStorage(company);
  //   };

  return (
    <Meta
      title={company.name}
      description={`Просмотр компании ${company.name}`}
    >
      <ButtonCircleIcon
        onClick={() => push('/company')}
        appearance='black'
        icon='down'
        className='mb-[50px]'
      >
        Вернуться назад
      </ButtonCircleIcon>
      <div className={styles.wrapper}>
        <TitleSingleCompany company={company} />
        <DepartmentAndUsers company={company} />
      </div>
    </Meta>
  );
};

export default SingleCompany;
