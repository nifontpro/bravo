import {
  FC,
  FunctionComponent,
  PropsWithChildren,
  useEffect,
  useLayoutEffect,
} from 'react';
import styles from '@/core/presenter/Layout/Layout.module.scss';
import Navigation from '@/core/presenter/Layout/Navigation/Navigation';
// import Sidebar from '@/core/presenter/Layout/Sidebar/Sidebar';
import { useAuthState } from '@/auth/data/auth.slice';
import cn from 'classnames';
import Modal from '@/core/presenter/Layout/Modal';
import { useDispatch } from 'react-redux';
import { modalActions, useModalState } from '@/core/store/modal.slice';
import MaterialIcon from '@/core/presenter/ui/icons/MaterialIcon';
import Header from './Header/Header';
import Auth from '@/auth/presenter/Auth';
import { useRouter } from 'next/router';

const Layout: FC<PropsWithChildren> = ({ children }) => {
  const { push } = useRouter();
  const { user } = useAuthState();
  const { isOpen } = useModalState();
  const dispatch = useDispatch();
  const handleClick = (state: boolean) => {
    dispatch(modalActions.setState(state));
  };

  if (user != undefined) {
    return (
      <div className={styles.layout}>
        <Header className={styles.header} />
        <Navigation className={styles.navigation} />
        <div className={styles.center}>{children}</div>
      </div>
    );
  } else {
    return <>{children}</>;
  }
};
export default Layout;

// export const withLayout = <T extends Record<string, unknown>>(
//   Component: FunctionComponent<T>
// ) => {
//   return function withLayoutComponent(props: T): JSX.Element {
//     return (
//       <Layout>
//         <Component {...props} />
//       </Layout>
//     );
//   };
// };

/*	const [width, setWidth] = useState(window.innerWidth);
	const breakpoint = 1024;
	useEffect(() => {
		const handleResizeWindow = () => setWidth(window.innerWidth);
		// subscribe to window resize event "onComponentDidMount"
		window.addEventListener("resize", handleResizeWindow);
		return () => {
			// unsubscribe "onComponentDestroy"
			window.removeEventListener("resize", handleResizeWindow);
		};
	}, []);*/
