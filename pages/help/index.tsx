import { useCompanyState } from '@/company/data/company.slice';
import AuthComponent from '@/core/providers/AuthProvider/AuthComponent';
import { NextPage } from 'next';
import Statistic from 'statistic/presenter/Statistic';

const HelpPage: NextPage = () => {
  // const {currentCompany} = useCompanyState()

  return (
    // <AuthComponent minRole={'director'}>
    //   {currentCompany ? (
    //     <Statistic company={currentCompany} />
    //   ) : (
        <div className='@apply text-2xl'>
          HelpPage
        </div>
    //   )}
    // </AuthComponent>
  );
};

export default HelpPage;
