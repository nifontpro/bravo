import styles from './Awards.module.scss';
import Meta from '@/core/utils/meta/Meta';
import { awardApi } from 'award/data/award.api';
import Htag from '@/core/presenter/ui/Htag/Htag';
import ButtonRadio from '@/core/presenter/ui/ButtonRadio/ButtonRadio';
import { AwardsProps } from './Awards.props';
import { useState } from 'react';
import cn from 'classnames';
import Button from '@/core/presenter/ui/Button/Button';
import SortButton from '@/core/presenter/ui/SortButton/EditPanel/SortButton';
import SingleAward from './SingleAward/SingleAward';

const Awards = ({ company, className, ...props }: AwardsProps): JSX.Element => {
  const { data: awards, isLoading } = awardApi.useGetAwardsByCompanyQuery({
    companyId: company.id,
  });

  const [active, setActive] = useState<'All' | 'Award' | 'Nominee'>('All');

  const [state, setState] = useState<1 | -1>(1);

  console.log(awards);

  return (
    <Meta title='Медали'>
      <div {...props} className={styles.wrapper}>
        <Htag
          tag='h2'
          className={styles.headTitle}
        >{`Награды компании ${company.name}`}</Htag>
        <div className={styles.header}>
          <ButtonRadio
            onClick={() => setActive('All')}
            className={cn(styles.all, {
              [styles.active]: active == 'All',
            })}
          >
            Все
          </ButtonRadio>
          <ButtonRadio
            onClick={() => setActive('Award')}
            className={cn(styles.award, {
              [styles.active]: active == 'Award',
            })}
          >
            Медали
          </ButtonRadio>
          <ButtonRadio
            onClick={() => setActive('Nominee')}
            className={cn(styles.nominee, {
              [styles.active]: active == 'Nominee',
            })}
          >
            Награды
          </ButtonRadio>
          <SortButton
            state={state}
            onClick={() => (state == 1 ? setState(-1) : setState(1))}
            className={styles.sort}
          >
            Сначала новые
          </SortButton>
          <Button appearance='blackWhite' size='m' className={styles.btn}>
            + Создать
          </Button>
        </div>

        {
          isLoading ? (
            <p>Загрузка...</p>
          ) : (
            <div className={styles.cards}>
              {awards?.map((item) => {
                return <SingleAward award={item} key={item.id} />;
              })}
            </div>
          )
          // <Catalog
          // 	data={medals || []}
          // 	prefix='/medal'
          // 	title="Медали"
          // 	description={`Медали, созданные в компании ${company.name}`}
          // />
        }
      </div>
    </Meta>
  );
};

export default Awards;
