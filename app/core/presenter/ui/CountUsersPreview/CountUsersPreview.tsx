import styles from './CountUsersPreview.module.scss';
import cn from 'classnames';
import { CountUsersPreviewProps } from './CountUsersPreview.props';
import P from '../P/P';
import { declOfNum } from '@/core/utils/declOfNum';
import { ImageDefault } from '../icons/ImageDefault';
import ButtonIcon from '../ButtonIcon/ButtonIcon';
import uniqid from 'uniqid';
import { motion } from 'framer-motion';

const CountUsersPreview = ({
  usersAwards,
  appearanceBtn,
  usersInDepartment,
  listUserVisible,
  children,
  className,
  ...props
}: CountUsersPreviewProps): JSX.Element => {

  return (
    <div className={className} {...props}>
      {usersInDepartment && (
        <div
          className={cn(className, {
            [styles.container]: !listUserVisible,
            [styles.hidden]: listUserVisible,
          })}
        >
          <P size='xs' color='gray'>
            {usersInDepartment.length}{' '}
            {declOfNum(usersInDepartment.length, [
              'сотрудник',
              'сотрудника',
              'сотрудников',
            ])}
          </P>

          <div className={styles.img}>
            {usersInDepartment.map((user, index) => {
              if (index < 4) {
                return (
                  <div key={uniqid()} className={styles.singleImg}>
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
              }
            })}
          </div>
          {usersInDepartment.length > 4 && (
            <ButtonIcon appearance={appearanceBtn}>
              +{usersInDepartment.length - 4}
            </ButtonIcon>
          )}
        </div>
      )}
      {usersAwards && (
        <div
          className={cn(className, {
            [styles.container]: !listUserVisible,
            [styles.hidden]: listUserVisible,
          })}
        >
          {/* <P size='xs' color='gray'>
            {usersAwards.length}{' '}
            {declOfNum(usersAwards.length, [
              'сотрудник',
              'сотрудника',
              'сотрудников',
            ])}
          </P> */}

          <div className={styles.imgAwards}>
            {usersAwards.map((item, index) => {
              if (index < 4) {
                return (
                  <div key={uniqid()} className={styles.singleImg}>
                    <ImageDefault
                      src={item.user.imageUrl}
                      width={40}
                      height={40}
                      alt={item.user.name}
                      objectFit='cover'
                      className='rounded-full mr-4'
                    />
                  </div>
                );
              }
            })}
          </div>
          {usersAwards.length > 4 && (
            <ButtonIcon appearance={appearanceBtn}>
              +{usersAwards.length - 4}
            </ButtonIcon>
          )}
        </div>
      )}
    </div>
  );
};
export default CountUsersPreview;
