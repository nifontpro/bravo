import { AwardProps } from './Award.props';
import cn from 'classnames';
import ButtonCircleIcon from '@/core/presenter/ui/ButtonCircleIcon/ButtonCircleIcon';
import { useRouter } from 'next/router';
import AwardTitle from './AwardTitle/AwardTitle';
import AwardWasAwarded from './AwardWasAwarded/AwardWasAwarded';
import AwardWasNominee from './AwardWasNominee/AwardWasNominee';
import AwardNominee from './AwardNominee/AwardNominee';
import ButtonScrollUp from '@/core/presenter/ui/ButtonScrollUp/ButtonScrollUp';
import { awardApi } from '@/award/data/award.api';

const Award = ({ award, className, ...props }: AwardProps): JSX.Element => {
  const { push } = useRouter();

  // Для инвалидациии пришлось делать запрос еще один тут а не использовать то что приходит выше award
  const { data: awardId } = awardApi.useGetAwardByIdWithUsersQuery(award.id);
  if (awardId) {
    if (awardId.state == 'AWARD' || awardId.state == 'NONE') {
      return (
        <div {...props} className={cn(className)}>
          <ButtonCircleIcon
            onClick={() => push('/award')}
            appearance='black'
            icon='down'
          >
            Вернуться назад
          </ButtonCircleIcon>

          <AwardTitle award={awardId} />
          <AwardWasAwarded award={awardId} />
          <AwardWasNominee award={awardId} className='mb-[50px]' />
          <ButtonScrollUp />
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

          <AwardTitle award={awardId} />
          <AwardNominee award={awardId} />
          <ButtonScrollUp />
        </div>
      );
    }
  } else {
    return <></>
  }

  // Ниже это просто для award без инвалидации (исправить)
  // if (award.state == 'AWARD' || award.state == 'NONE') {
  //   return (
  //     <div {...props} className={cn(className)}>
  //       <ButtonCircleIcon
  //         onClick={() => push('/award')}
  //         appearance='black'
  //         icon='down'
  //       >
  //         Вернуться назад
  //       </ButtonCircleIcon>

  //       <AwardTitle award={award} />
  //       <AwardWasAwarded award={award} />
  //       <AwardWasNominee award={award} className='mb-[50px]' />
  //       <ButtonScrollUp />
  //     </div>
  //   );
  // } else {
  //   return (
  //     <div {...props} className={cn(className)}>
  //       <ButtonCircleIcon
  //         onClick={() => push('/award')}
  //         appearance='black'
  //         icon='down'
  //       >
  //         Вернуться назад
  //       </ButtonCircleIcon>

  //       <AwardTitle award={award} />
  //       <AwardNominee award={award} />
  //       <ButtonScrollUp />
  //     </div>
  //   );
  // }
};

export default Award;
