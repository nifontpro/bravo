import styles from './StatisticUsersGender.module.scss';

import { StatisticUsersGenderProps } from './StatisticUsersGender.props';
import cn from 'classnames';

import P from '@/core/presenter/ui/P/P';

const StatisticUsersGender = ({
  users,
  className,
  ...props
}: StatisticUsersGenderProps): JSX.Element => {
  console.log(users)
  let countAll = users.length
  let countMale = users.filter(user => user.gender == 'MALE').length
  let countFemale = users.filter(user => user.gender == 'FEMALE').length
  let countMalePercent = Math.floor((countMale * 100) / countAll)
  let countFemalePercent = Math.floor((countFemale * 100) / countAll)

  return (
    <div {...props} className={cn(styles.wrapper, className)}>
      <P size='l'>Сотрудники</P>
      <div className='w-[215px] h-[215px] bg-black'></div>
      <div className='flex justify-between'>
        <div>
          <div className='flex'>
            <div className='w-[15px] h-[15px] bg-black'></div>
            <P size='l'>Женщин</P>
          </div>
          <div className='flex'>
            <P size='l'>{countFemale}</P>
            <P size='xs'>{countFemalePercent}%</P>
          </div>
        </div>
        <div>
          <div className='flex'>
            <div className='w-[15px] h-[15px] bg-black'></div>
            <P size='l'>Мужчин</P>
          </div>
          <div className='flex'>
            <P size='l'>{countMale}</P>
            <P size='xs'>{countMalePercent}%</P>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticUsersGender;
