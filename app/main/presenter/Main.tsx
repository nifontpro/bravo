import styles from './Main.module.scss';
import Meta from '@/core/utils/meta/Meta';
import { MainProps } from './Main.props';
import cn from 'classnames';
import MainAwars from './MainAwars/MainAwards';
import MainUsers from './MainUsers/MainUsers';
import MainNominee from './MainNominee/MainNominee';
import MainActivity from './MainActivity/MainActivity';
import { useMain } from './useMain';
import OnBoarding from './OnBoarding/OnBoarding';

const Main = ({ className, ...props }: MainProps): JSX.Element => {
  const { onBoarding, awardsLight, users, awardsOnCompanyGroupDep, state, onBoardingText, onBoardingText3, handleClick } =
    useMain();

  return (
    <Meta title='Главная'>
      <div {...props} className={styles.wrapper}>
        <MainAwars
          className={cn(styles.awards, {
            [styles.index30]: onBoarding == 1,
          })}
          awards={awardsLight}
          users={users}
          awardsOnCompanyGroupDep={awardsOnCompanyGroupDep}
        />
        <MainUsers className={styles.users} users={users} />
        <div
          className={cn(styles.nominee, {
            [styles.index30]: onBoarding >= 2 && !state
          })}
        >
          <MainNominee
            awards={awardsLight}
            className={cn({
              [styles.index0]: onBoarding == 3 && !state
            })}
          />
          <MainActivity
            className={cn({
              [styles.index0]: onBoarding == 2,
            })}
          />
        </div>

        <OnBoarding state={state} onBoarding={onBoarding} onBoardingText={onBoardingText} onBoardingText3={onBoardingText3} handleClick={handleClick}/>
      </div>
    </Meta>
  );
};

export default Main;
