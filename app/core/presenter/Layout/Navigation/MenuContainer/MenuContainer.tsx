import { FC } from 'react';
import Menu from '@/core/presenter/Layout/Navigation/MenuContainer/Menu';
import {
  firstMenu,
  firstMenuAdmin,
  firstMenuDirector,
  firstMenuOwner,
  userMenu,
} from '@/core/presenter/Layout/Navigation/MenuContainer/menu.data';
import { IMenu } from '@/core/presenter/Layout/Navigation/MenuContainer/menu.interface';
import { useAuthState } from '@/auth/data/auth.slice';

const MenuContainer: FC = () => {
  const { user } = useAuthState();

  let menu: IMenu = firstMenu;

  switch (user?.role) {
    case 'owner': {
      menu = firstMenuOwner;
      break;
    }
    case 'admin': {
      menu = firstMenuAdmin;
      break;
    }
    case 'director': {
      menu = firstMenuDirector;
      break;
    }
  }

  return (
    <div className='sticky top-10'>
      <Menu menu={menu} />
      {/* <Menu menu={userMenu}/> */}
    </div>
  );
};

export default MenuContainer;
