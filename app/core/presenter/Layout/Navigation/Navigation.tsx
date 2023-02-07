import { Dispatch, FC, SetStateAction } from 'react';
// import Logo from '@/core/presenter/Layout/Navigation/Logo'
import MenuContainer from '@/core/presenter/Layout/Navigation/MenuContainer/MenuContainer';
import styles from '@/core/presenter/Layout/Navigation/Navigation.module.scss';
import cn from 'classnames';

const Navigation: FC<{ className?: string, setNavigationVisible: Dispatch<SetStateAction<boolean>> }> = ({ className, setNavigationVisible }) => {
  return (
    <>
      <div className={cn(styles.navigation, className)}>
        {/* <Logo/> */}
        <MenuContainer setNavigationVisible={setNavigationVisible}/>
      </div>
    </>
  );
};

export default Navigation;
