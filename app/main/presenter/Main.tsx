import styles from './Main.module.scss';
import Meta from '@/core/utils/meta/Meta';
import { MainProps } from './Main.props';

import MainAwars from './MainAwars/MainAwards';
import MainUsers from './MainUsers/MainUsers';
import MainNominee from './MainNominee/MainNominee';
import MainActivity from './MainActivity/MainActivity';
import { useAward } from 'award/presenter/useAward';
import { useMyUser } from '@/user/presenter/useMyUsers';
import { getAwardUrl } from '@/core/config/api.config';
import axios from 'axios';
import { axiosCore } from '@/core/data/axios.core';

const Main = ({ className, ...props }: MainProps): JSX.Element => {
  const { awardsLight } = useAward('');
  const {
    usersWithAwards: users,
    usersCountAwardsOnDepCompany: awardsOnCompanyGroupDep,
  } = useMyUser('');

//   axios.post('https://nmedalist.ru/api/award/ids').then((resp) => {
//     const allIds = resp.data;
//     console.log(allIds);
//   });

//   axios({
//     method: 'post',
//     url: 'https://nmedalist.ru/api/award/ids',
// }).then(function (response) {
//     console.log(response);
// }).catch(function (error) {
//     console.log(error);
// });

  return (
    <Meta title='Главная'>
      <div {...props} className={styles.wrapper}>
        <MainAwars
          className={styles.awards}
          awards={awardsLight}
          users={users}
          awardsOnCompanyGroupDep={awardsOnCompanyGroupDep}
        />
        <MainUsers className={styles.users} users={users} />
        <div className={styles.nominee}>
          <MainNominee awards={awardsLight} />
          <MainActivity />
        </div>
      </div>
    </Meta>
  );
};

export default Main;
