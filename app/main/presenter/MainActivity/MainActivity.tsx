import styles from './MainActivity.module.scss';
import { MainActivityProps } from './MainActivity.props';
import cn from 'classnames';
import Htag from '@/core/presenter/ui/Htag/Htag';
import P from '@/core/presenter/ui/P/P';
import ArrowIcon from '@/core/presenter/images/arrowRight.svg';
import { useRouter } from 'next/router';
import { useActivity } from '@/activity/presenter/useActivity';
import { ImageDefault } from '@/core/presenter/ui/icons/ImageDefault';

const MainActivity = ({
  className,
  ...props
}: MainActivityProps): JSX.Element => {
  const { activity } = useActivity('', -1);

  let currentDate = +new Date();

  const { push } = useRouter();
  return (
    <div {...props} className={cn(styles.wrapper, className)}>
      <div className={styles.header}>
        <Htag tag='h2'>Активность</Htag>
        <div className={styles.bestActivity} onClick={() => push('/activity')}>
          <P size='s' fontstyle='thin' className={styles.text}>
            Все
          </P>
          <ArrowIcon className={styles.arrow} />
        </div>
      </div>
      <ul>
        {activity.map((item, index) => {
          if (index < 3) {
            return (
              <li key={item.id}>
                <div className={styles.activity}>
                  <div className={styles.img}>
                    <ImageDefault
                      src={item.user?.imageUrl}
                      width={64}
                      height={64}
                      alt='preview image'
                      objectFit='cover'
                      className='rounded-[10px]'
                    />
                  </div>
                  <div className={styles.user}>
                    <P size='m'>
                      {item.user?.lastname} {item.user?.name}
                    </P>
                    <div className={styles.userTag}>
                      <P size='s' fontstyle='thin' color='gray'>
                        {item.award?.name}
                      </P>
                    </div>
                  </div>
                </div>
                {Math.floor((currentDate - item.date) / 86400000) == 0 ? (
                  <P size='m' color='gray' fontstyle='thin'>
                    сегодня
                  </P>
                ) : (
                  <P size='m' color='gray' fontstyle='thin'>
                    {Math.floor((currentDate - item.date) / 86400000)}&nbsp;дн
                  </P>
                )}
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
};

export default MainActivity;
