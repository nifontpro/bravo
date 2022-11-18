import styles from './Header.module.scss';
import cn from 'classnames';
import { HeaderProps } from './Header.props';
import LogoIcon from './logo.svg';
import Link from 'next/link';
import Input from '../../ui/Input/Input';
import Search from '../../ui/Search/Search';

const Header = ({ className, ...props }: HeaderProps): JSX.Element => {
  return (
    <header className={cn(className, styles.header)} {...props}>
      <Link href='/'>
        <LogoIcon className={styles.logo} />
      </Link>
      <Search className={styles.search} />
      <div className={styles.user}>
        <div className={styles.userComponent}></div>
        <div className={styles.userComponent}></div>
        <div className={styles.userComponent}></div>
      </div>
    </header>
  );
};

export default Header;
