import { AwardProps } from './Award.props';
import cn from 'classnames';
import ButtonCircleIcon from '@/core/presenter/ui/ButtonCircleIcon/ButtonCircleIcon';
import { useRouter } from 'next/router';
import AwardTitle from './AwardTitle/AwardTitle';
import AwardWasAwarded from './AwardWasAwarded/AwardWasAwarded';
import AwardWasNominee from './AwardWasNominee/AwardWasNominee';
import AwardNominee from './AwardNominee/AwardNominee';

const Award = ({ award, className, ...props }: AwardProps): JSX.Element => {
  const { push } = useRouter();

  if (award.state == 'AWARD' || award.state == 'NONE') {
    return (
      <div {...props} className={cn(className)}>
        <ButtonCircleIcon
          onClick={() => push('/award')}
          appearance='black'
          icon='down'
        >
          Вернуться назад
        </ButtonCircleIcon>

        <AwardTitle award={award} />
        <AwardWasAwarded award={award} />
        <AwardWasNominee award={award} className='mb-[50px]' />
      </div>
    );
  } else {
    return (
      <div {...props} className={cn(className)}>
        <ButtonCircleIcon
          onClick={() => push('/award')}
          appearance='black'
          icon='down'
        >
          Вернуться назад
        </ButtonCircleIcon>

        <AwardTitle award={award} />
        <AwardNominee award={award} />
      </div>
    );
  }
};

export default Award;
