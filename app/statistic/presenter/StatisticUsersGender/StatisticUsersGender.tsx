import styles from './StatisticUsersGender.module.scss';

import { StatisticUsersGenderProps } from './StatisticUsersGender.props';
import cn from 'classnames';

import P from '@/core/presenter/ui/P/P';
import DoughnutCircle from '@/core/presenter/ui/DoughnutCircle/DoughnutCircle';

const StatisticUsersGender = ({
  users,
  className,
  ...props
}: StatisticUsersGenderProps): JSX.Element => {
  // console.log(users);
  let countAll = users.length;
  let countMale = users.filter((user) => user.gender == 'MALE').length;
  let countMalePercent = Math.ceil((countMale * 100) / countAll);
  let countFemale = users.filter((user) => user.gender == 'FEMALE').length;
  let countFemalePercent = Math.floor((countFemale * 100) / countAll);

  return (
    <div {...props} className={cn(styles.wrapper, className)}>
      <P size='l' className={styles.title}>
        Сотрудники
      </P>
      <DoughnutCircle
        className={styles.doughnut}
        dataOne={countMale}
        colorOne='rgba(179, 179, 179, 1)'
        dataTwo={countFemale}
        colorTwo='rgba(57, 57, 57, 1)'
      />
      <div className={styles.description}>
        <div className={styles.gender}>
          <div className={styles.genderInfo}>
            <div className={styles.dotFemale}></div>
            <P size='l' color='gray'>
              Женщин
            </P>
          </div>
          <div className={styles.genderPercent}>
            <P size='xl' className={styles.count}>
              {countFemale}
            </P>
            <P size='s' className={styles.percent}>
              {countFemalePercent}%
            </P>
          </div>
        </div>
        <div className={styles.gender}>
          <div className={styles.genderInfo}>
            <div className={styles.dotMale}></div>
            <P size='l' color='gray'>
              Мужчин
            </P>
          </div>
          <div className={styles.genderPercent}>
            <P size='xl' className={styles.count}>
              {countMale}
            </P>
            <P size='s' className={styles.percent}>
              {countMalePercent}%
            </P>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticUsersGender;
