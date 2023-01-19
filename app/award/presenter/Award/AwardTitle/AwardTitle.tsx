import styles from './AwardTitle.module.scss';
import { AwardTitleProps } from './AwardTitle.props';
import cn from 'classnames';
import { ImageDefault } from '@/core/presenter/ui/icons/ImageDefault';
import { timeConverter } from '@/core/utils/timeConverter';
import P from '@/core/presenter/ui/P/P';
import ButtonCircleIcon from '@/core/presenter/ui/ButtonCircleIcon/ButtonCircleIcon';
import Htag from '@/core/presenter/ui/Htag/Htag';
import EditPanel from '@/core/presenter/ui/EditPanelAuthBtn/EditPanel/EditPanel';
import { useRef, useState } from 'react';
import { useAwardAdmin } from '../useAwardAdmin';
import ButtonIcon from '@/core/presenter/ui/ButtonIcon/ButtonIcon';
import { declOfNum } from '@/core/utils/declOfNum';
import { getAwardEditUrl } from '@/core/config/api.config';
import AuthComponent from '@/core/providers/AuthProvider/AuthComponent';
import { useAuthState } from '@/auth/data/auth.slice';
import Button from '@/core/presenter/ui/Button/Button';
import useOutsideClick from '@/core/hooks/useOutsideClick';
import EditPanelAuthBtn from '@/core/presenter/ui/EditPanelAuthBtn/EditPanelAuthBtn';

const AwardTitle = ({
  award,
  className,
  ...props
}: AwardTitleProps): JSX.Element => {
  const { user: currentUser } = useAuthState();
  let convertDate = timeConverter(award.endDate);
  let currentDateNumber = +new Date();

  const { deleteAsync } = useAwardAdmin(award.id);

  //Закрытие модального окна нажатием вне его
  const [visible, setVisible] = useState<boolean>(false);
  const ref = useRef(null);
  const refOpen = useRef(null);
  const handleClickOutside = () => {
    setVisible(false);
  };
  useOutsideClick(ref, refOpen, handleClickOutside, visible);

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
          priority={true}
        />
      </div>

      <div className={styles.awardDescription}>
        <div className={styles.title}>
          <Htag tag='h1' className={styles.header}>
            {award.name}
          </Htag>
          <EditPanelAuthBtn
            onlyRemove={false}
            handleRemove={deleteAsync}
            id={award.id}
            getUrl={getAwardEditUrl}
          />
          {/* <AuthComponent minRole={'director'}>
            <ButtonCircleIcon
              onClick={() => setVisible(!visible)}
              icon='dots'
              appearance='transparent'
              className={styles.dots}
              ref={refOpen}
            />
            <EditPanel
              getUrl={getAwardEditUrl}
              onMouseLeave={() => setVisible(!visible)}
              id={award.id}
              deleteAsync={deleteAsync}
              visible={visible}
              ref={ref}
            />
          </AuthComponent> */}
        </div>

        <P
          size='xs'
          fontstyle='thin'
          type='silverBtn'
          className={styles.description}
        >
          {award.description}
        </P>

        <div className={styles.dateAward}>
          {/* {award.state == 'AWARD' && ( */}
          <P size='m' color='gray'>
            Награда выдана {convertDate}
          </P>
          {/* )} */}
        </div>

        <P size='m' className={styles.criteriaTitle}>
          Требования
        </P>
        <P size='s' fontstyle='thin' className={styles.criteria}>
          {award.criteria}
        </P>

        <div className={styles.date}>
          {award.state == 'NOMINEE' && award.endDate != undefined && (
            <P size='s' fontstyle='thin'>
              Осталось
              <ButtonIcon className='ml-[10px]' appearance='lime'>
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
          {award.state == 'NOMINEE' && currentUser?.role == 'user' ? (
            <Button
              onClick={() => console.log('Хочу участвовать')}
              appearance='blackWhite'
              size='l'
            >
              Хочу участвовать
            </Button>
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  );
};

export default AwardTitle;
