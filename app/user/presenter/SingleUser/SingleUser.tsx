import styles from './SingleUser.module.scss';
import cn from 'classnames';
import Meta from '@/core/utils/meta/Meta';
import { SingleUserProps } from './SingleUser.props';
import ButtonCircleIcon from '@/core/presenter/ui/ButtonCircleIcon/ButtonCircleIcon';
import { useRouter } from 'next/router';
import { ImageDefault } from '@/core/presenter/ui/icons/ImageDefault';
import SingleUserTitle from './SingleUserTitle/SingleUserTitle';
import SingleUserAwards from './SingleUserAwards/SingleUserAwards';
import SingleUserNominee from './SingleUserNominee/SingleUserNominee';

const SingleUser = ({
  user,
  className,
  children,
  ...props
}: SingleUserProps): JSX.Element => {
  const { push } = useRouter();
  // console.log(user);
  return (
    <Meta title={user.name} description={`Профиль сотрудника ${user.name}`}>
      <div className={cn(className)} {...props}>
        <ButtonCircleIcon
          onClick={() => push('/rating')}
          appearance='black'
          icon='down'
          className='mb-[50px]'
        >
          Все сотрудники
        </ButtonCircleIcon>
        <div className={styles.wrapper}>
          <div className={styles.img}>
            <ImageDefault
              src={user.imageUrl}
              width={400}
              height={400}
              alt='award img'
              objectFit='cover'
              className='rounded-[27px]'
            />
          </div>
          <div className={styles.content}>
            <SingleUserTitle user={user} />
            <SingleUserAwards user={user} />
            <SingleUserNominee user={user} />
          </div>
        </div>
      </div>
    </Meta>
  );
};

export default SingleUser;
