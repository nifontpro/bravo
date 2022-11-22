import styles from './CountUsersPreview.module.scss';
import cn from 'classnames';
import { CountUsersPreviewProps } from './CountUsersPreview.props';
import P from '../P/P';
import { declOfNum } from '@/core/utils/declOfNum';
import Spinner from '../Spinner/Spinner';
import { ImageDefault } from '../icons/ImageDefault';

const CountUsersPreview = ({
  usersInDepartment,
  listUserVisible,
  children,
  className,
  ...props
}: CountUsersPreviewProps): JSX.Element => {
  if (usersInDepartment != undefined) {
    return (
      <div {...props} className={cn(className, {
        [styles.container] : !listUserVisible,
        [styles.hidden]: listUserVisible
      } )}>
        <P size='xs' color='gray'>
          {usersInDepartment.length}{' '}
          {declOfNum(usersInDepartment.length, [
            'сотрудник',
            'сотрудника',
            'сотрудников',
          ])}
        </P>
        <div className={styles.img}>
          {usersInDepartment.map((user) => {
            return (
              <div key={user.login} className={styles.singleImg}>
                <ImageDefault
                  src={user.imageUrl}
                  width={40}
                  height={40}
                  alt={user.name}
                  objectFit='cover'
                  className='rounded-full mr-4'
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  } else {
    return <Spinner />;
  }
};
export default CountUsersPreview;
