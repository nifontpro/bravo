import Link from 'next/link';
import styles from './LoginSingin.module.scss';

const LoginSingin = () => {
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

export default LoginSingin;
