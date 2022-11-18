import styles from './Header.module.scss';
import cn from 'classnames';
import { HeaderProps } from './Header.props';
import LogoIcon from './logo.svg';
import Link from 'next/link';

const Header = ({ className, ...props }: HeaderProps): JSX.Element => {
  return (
    <header className={cn(className, styles.header)} {...props}>
      <Link href='/'>
        <LogoIcon className={styles.logo} />
      </Link>
      <div className={styles.search}>Поиск</div>
      <div className={styles.user}>Меню пользователя</div>
    </header>
  );
};

export default Header;
