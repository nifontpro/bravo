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

const AwardTitle = ({
  award,
  className,
  ...props
}: AwardTitleProps): JSX.Element => {
  let URL = '/manage/award/edit/';

  let convertDate = timeConverter(award.endDate);

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
          <ButtonCircleIcon
            onClick={() => setVisible(!visible)}
            icon='dots'
            appearance='transparent'
          />
          <EditPanel
            URL={URL}
            onMouseLeave={() => setVisible(!visible)}
            id={award.id}
            deleteAsync={deleteAsync}
            visible={visible}
          />
        </div>

        <P size='m' fontstyle='thin' className={styles.description}>
          {award.description}
        </P>
        <P size='m'>Требования</P>
        <P size='s' fontstyle='thin' className={styles.criteria}>
          {award.criteria}
        </P>
        <P size='m' className={styles.date}>
          Награда выдана {convertDate}
        </P>
      </div>
    </div>
  );
};

export default AwardTitle;
