import styles from './Main.module.scss';
import Meta from '@/core/utils/meta/Meta';
import { MainProps } from './Main.props';
import cn from 'classnames';
import MainAwars from './MainAwars/MainAwards';
import MainUsers from './MainUsers/MainUsers';
import MainNominee from './MainNominee/MainNominee';
import MainActivity from './MainActivity/MainActivity';
import { useAward } from 'award/presenter/useAward';
import { useMyUser } from '@/user/presenter/useMyUsers';

const Main = ({ className, ...props }: MainProps): JSX.Element => {
  const { awardsLight } = useAward('');
  const { usersWithAwardsUnion: users } = useMyUser('');

  return (
    <Meta title='Главная'>
      <div {...props} className={styles.wrapper}>
        <MainAwars className={styles.awards} awards={awardsLight} users={users}/>
        <MainUsers className={styles.users} />
        <MainNominee className={styles.nominee} />
        <MainActivity className={styles.activity} />
      </div>
    </Meta>
  );
};

export default Main;
