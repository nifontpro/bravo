import { FC } from 'react';
import Catalog from '@/core/presenter/ui/catalog/Catalog';
import Meta from '@/core/utils/meta/Meta';
// import Heading from "@/core/presenter/ui/heading/Heading";
import { companyApi } from '@/company/data/company.api';
import Htag from '@/core/presenter/ui/Htag/Htag';
import ButtonIcon from '@/core/presenter/ui/ButtonCircleIcon/ButtonCircleIcon';
import { useRouter } from 'next/router';
import Spinner from '@/core/presenter/ui/Spinner/Spinner';
import { getCompanyCreateUrl } from '@/core/config/api.config';
import { useCompany } from './useCompany';

const OwnerCompany: FC = () => {
  const { push } = useRouter();

  const { companies } = useCompany('')

  return (
    <Meta title='Компании владельца'>
      <div className='flex justify-between'>
        <Htag tag='h1'>Ваши компании</Htag>

        {companies != undefined && companies?.length >= 1 ? (
          ''
        ) : (
          <ButtonIcon
            onClick={() => push(getCompanyCreateUrl())}
            appearance='black'
            icon='plus'
          >
            Создать компанию
          </ButtonIcon>
        )}
      </div>

      {!companies ? (
        <Spinner />
      ) : (
        <Catalog
          data={companies || []}
          prefix='/company'
          title='Ваши компании'
          description='В этом списке компании, к котрым вы имеете доступ'
        />
      )}
    </Meta>
  );
};

export default OwnerCompany;
