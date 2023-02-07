import { FC, PropsWithChildren, useState } from 'react';
import styles from '@/core/presenter/Layout/Layout.module.scss';
import Navigation from '@/core/presenter/Layout/Navigation/Navigation';
import { useAuthLoading, useAuthState } from '@/auth/data/auth.slice';
import Header from './Header/Header';
import Spinner from '../ui/Spinner/Spinner';
import Auth from '@/auth/presenter/Auth';

const Layout: FC<PropsWithChildren> = ({ children }) => {
  const { user } = useAuthState();
  const isLoading = useAuthLoading();
  const [navigationVisible, setNavigationVisible] = useState<boolean>(false);

  if (user != undefined) {
    return (
      <div className={styles.layout}>
        <Header className={styles.header} setNavigationVisible={setNavigationVisible} navigationVisible={navigationVisible}/>
        <Navigation className={styles.navigation} setNavigationVisible={setNavigationVisible}/>
        <div className={styles.center}>{children}</div>
      </div>
    );
  } else if (isLoading) {
    return <Spinner />;
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
