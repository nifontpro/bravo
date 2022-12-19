import styles from './AwardTitle.module.scss';
import { AwardTitleProps } from './AwardTitle.props';
import cn from 'classnames';
import { ImageDefault } from '@/core/presenter/ui/icons/ImageDefault';
import { timeConverter } from '@/core/utils/timeConverter';
import P from '@/core/presenter/ui/P/P';
import ButtonCircleIcon from '@/core/presenter/ui/ButtonCircleIcon/ButtonCircleIcon';
import Htag from '@/core/presenter/ui/Htag/Htag';
import EditPanel from '@/core/presenter/ui/EditPanel/EditPanel';
import { useState } from 'react';
import { useAwardAdmin } from '../useAwardAdmin';
import ButtonIcon from '@/core/presenter/ui/ButtonIcon/ButtonIcon';
import { declOfNum } from '@/core/utils/declOfNum';
import { getAwardEditUrl } from '@/core/config/api.config';
import AuthComponent from '@/core/providers/AuthProvider/AuthComponent';
import { useAuthState } from '@/auth/data/auth.slice';
import Button from '@/core/presenter/ui/Button/Button';

const AwardTitle = ({
  award,
  className,
  ...props
}: AwardTitleProps): JSX.Element => {
  const { user: currentUser } = useAuthState();
  let convertDate = timeConverter(award.endDate);
  let currentDateNumber = +new Date();

  const [visible, setVisible] = useState<boolean>(false);

  const { deleteAsync } = useAwardAdmin(award.id);

  // console.log(award);

  return (
    <div className={cn(styles.wrapper, className)} {...props}>
      <div className={styles.img}>
        <ImageDefault
          src={award.imageUrl}
          width={400}
          height={400}
          alt='award img'
          objectFit='cover'
          className='rounded-[27px]'
        />
      </div>

      <div className={styles.awardDescription}>
        <div className={styles.title}>
          <Htag tag='h1' className={styles.header}>
            {award.name}
          </Htag>
          <AuthComponent minRole={'director'}>
            <ButtonCircleIcon
              onClick={() => setVisible(!visible)}
              icon='dots'
              appearance='transparent'
            />
            <EditPanel
              getUrl={getAwardEditUrl}
              onMouseLeave={() => setVisible(!visible)}
              id={award.id}
              deleteAsync={deleteAsync}
              visible={visible}
            />
          </AuthComponent>
        </div>

        <P size='m' fontstyle='thin' className={styles.description}>
          {award.description}
        </P>
        <P size='m'>Требования</P>
        <P size='s' fontstyle='thin' className={styles.criteria}>
          {award.criteria}
        </P>
        <div className={styles.date}>
          {award.state == 'AWARD' && (
            <P size='m'>Награда выдана {convertDate}</P>
          )}
        </div>
        <div className={styles.date}>
          {award.state == 'NOMINEE' && award.endDate != undefined && (
            <P size='s' color='gray' fontstyle='thin'>
              Осталось
              <ButtonIcon className='ml-[10px]' appearance='gray'>
                {Math.floor(
                  (award.endDate - currentDateNumber) / 1000 / 60 / 60 / 24
                )}{' '}
                {declOfNum(
                  Math.floor(
                    (award.endDate - currentDateNumber) / 1000 / 60 / 60 / 24
                  ),
                  ['день', 'дня', 'дней']
                )}
              </ButtonIcon>
            </P>
          )}
          {award.state == 'NOMINEE' && currentUser?.role == 'user' ? 
          (
          <Button onClick={() => console.log('Хочу участвовать')} appearance='blackWhite' size='l'>Хочу участвовать</Button>
          ) : ''}
        </div>
      </div>
    </div>
  );
};

export default AwardTitle;
