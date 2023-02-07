import cn from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Dispatch, FC, SetStateAction } from 'react';
// import MaterialIcon from '@/core/presenter/ui/icons/MaterialIcon';
import styles from '@/core/presenter/Layout/Navigation/MenuContainer/Menu.module.scss';
import { IMenuItem } from '@/core/presenter/Layout/Navigation/MenuContainer/menu.interface';
// import { useDispatch } from 'react-redux';
// import { modalActions } from '@/core/store/modal.slice';
import ButtonMenuIcon from '@/core/presenter/ui/ButtonMenuIcon/ButtonMenuIcon';

const MenuItem: FC<{
  item: IMenuItem;
  setNavigationVisible: Dispatch<SetStateAction<boolean>>;
}> = ({ item, setNavigationVisible }) => {
  const { asPath } = useRouter();

  // const dispatch = useDispatch();
  // const handleClick = () => {
  //   dispatch(modalActions.setState(false));
  // };

  return (
    <li
      className={cn(styles.menuItem, {
        [styles.active]: asPath == item.link,
        [styles.helpActive]: item.link == '/help',
        [styles.help]: item.link == '/help' && asPath == '/help',
      })}
    >
      <Link href={item.link}>
        <a onClick={() => setNavigationVisible(false)}>
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
