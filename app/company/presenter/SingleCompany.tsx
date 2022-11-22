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

const SingleCompany: FC<{ company: ICompany }> = ({ company }) => {
  // console.log(company)

  const dispatch = useDispatch();

  // const { data: bestUsers, isLoading } = userApi.useGetBestsQuery({
  //   companyId: company.id,
  //   limit: 5,
  // });

  // То что ниже нужно переделать
  useEffect(() => {
    dispatch(companyActions.setState(company));
    saveCompanyToStorage(company);
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
      <div className={styles.wrapper}>
        <TitleSingleCompany company={company} />
        <DepartmentAndUsers company={company} />

        {/* <Banner
				imagePath={company.imageUrl}
				Detail={() => null}
			/>
			<div className={cn(styles.singleEntity, {"mb-2":true})}>
				<h1>Наименование компании: {company.name}</h1>
				<h2>Описание: {company.description}</h2>
				<Button onClick={handleClick}>
					Выбрать по умолчанию
				</Button>
			</div>
			{isLoading ? <p>Загрузка...</p>
				:
				<Catalog
					data={bestUsers || []}
					prefix='/user'
					title="Доска почета"
					description={`Список лучших сотрудников`}
				/>
			} */}
      </div>
    </Meta>
  );
};

export default SingleCompany;
