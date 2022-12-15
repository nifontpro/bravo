import cn from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';

import MaterialIcon from '@/core/presenter/ui/icons/MaterialIcon';

import styles from '@/core/presenter/Layout/Navigation/MenuContainer/Menu.module.scss';
import { IMenuItem } from '@/core/presenter/Layout/Navigation/MenuContainer/menu.interface';
import { useDispatch } from 'react-redux';
import { modalActions } from '@/core/store/modal.slice';
import ButtonMenuIcon from '@/core/presenter/ui/ButtonMenuIcon/ButtonMenuIcon';

const MenuItem: FC<{ item: IMenuItem }> = ({ item }) => {
  const { asPath } = useRouter();

  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(modalActions.setState(false));
  };

  return (
    <li
      className={cn(styles.menuItem, { [styles.active]: asPath === item.link })}
    >
      <Link href={item.link}>
        <a onClick={handleClick}>
          <div className='w-[20px] mr-[15px]'>
            <ButtonMenuIcon icon={item.icon} />
          </div>
          <span>{item.title}</span>
        </a>
      </Link>
    </li>
  );
};

export default MenuItem;
