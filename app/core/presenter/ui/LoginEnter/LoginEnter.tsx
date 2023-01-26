import Link from 'next/link';
import styles from './LoginEnter.module.scss';

const LoginEnter = () => {
  return (
    <div className={styles.wrapper}>
      <Link href='/auth'>
        <a>Войдите</a>
      </Link>
      или
      <Link href='/login'>
        <a>Зарегестрируйтесь</a>
      </Link>
    </div>
  );
};

export default LoginEnter;
