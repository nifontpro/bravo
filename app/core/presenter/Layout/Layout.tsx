import { FC, PropsWithChildren } from 'react';
import styles from '@/core/presenter/Layout/Layout.module.scss';
import Navigation from '@/core/presenter/Layout/Navigation/Navigation';
import { useAuthState } from '@/auth/data/auth.slice';
import Header from './Header/Header';

const Layout: FC<PropsWithChildren> = ({ children }) => {
  const { user } = useAuthState();

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
