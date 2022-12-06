
import { AwardProps } from './Award.props';
import cn from 'classnames';
import ButtonCircleIcon from '@/core/presenter/ui/ButtonCircleIcon/ButtonCircleIcon';
import { useRouter } from 'next/router';
import AwardTitle from './AwardTitle/AwardTitle';
import AwardWasAwarded from './AwardWasAwarded/AwardWasAwarded';
import AwardWasNominee from './AwardWasNominee/AwardWasNominee';

const Award = ({ award, className, ...props }: AwardProps): JSX.Element => {
  const { push } = useRouter();

  // console.log(award);

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
