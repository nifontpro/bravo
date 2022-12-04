import styles from './Award.module.scss';
import { AwardProps } from './Award.props';
import cn from 'classnames';
import { ImageDefault } from '@/core/presenter/ui/icons/ImageDefault';
import { timeConverter } from '@/core/utils/timeConverter';
import P from '@/core/presenter/ui/P/P';
import ButtonCircleIcon from '@/core/presenter/ui/ButtonCircleIcon/ButtonCircleIcon';
import { useRouter } from 'next/router';
import Htag from '@/core/presenter/ui/Htag/Htag';
import EditPanel from '@/core/presenter/ui/EditPanel/EditPanel';
import { useState } from 'react';
import AwardTitle from './AwardTitle/AwardTitle';
import AwardWasAwarded from './AwardWasAwarded/AwardWasAwarded';
import AwardWasNominee from './AwardWasNominee/AwardWasNominee';

const Award = ({ award, className, ...props }: AwardProps): JSX.Element => {
  const { push } = useRouter();

  console.log(award);

  return (
    <div {...props} className={cn(className)}>
      <ButtonCircleIcon
        onClick={() => push('/award')}
        appearance='black'
        icon='down'
        className='mb-[50px]'
      >
        Вернуться назад
      </ButtonCircleIcon>

      <AwardTitle award={award} />
      <AwardWasAwarded award={award} />
      <AwardWasNominee award={award} className='mb-[50px]'/>
    </div>
  );
};

export default Award;
