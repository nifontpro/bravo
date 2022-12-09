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
import Spinner from '@/core/presenter/ui/Spinner/Spinner';
import Link from 'next/link';
import { getAwardCreateUrl } from '@/core/config/api.config';
import { useRouter } from 'next/router';

const Awards = ({ company, className, ...props }: AwardsProps): JSX.Element => {
  const { data: awards, isLoading } =
    awardApi.useGetAwardsByCompanyWithUserQuery({
      companyId: company.id,
    });

  const { push } = useRouter();

  const [active, setActive] = useState<'' | 'AWARD' | 'NOMINEE'>('');

  const [state, setState] = useState<1 | -1>(1);

  const filteredValue = awards?.filter((item) => item.state?.includes(active));

  // Сотртировка по startDate
  if (filteredValue !== undefined) {
    filteredValue.sort((prev, next): number => {
      if (prev.startDate !== undefined && next.startDate !== undefined) {
        if (prev?.startDate > next?.startDate) return state; //(-1)
      }
      return 1;
    });
  }

  // console.log(awards);

  return (
    <Meta title='Медали'>
      <div {...props} className={styles.wrapper}>
        <Htag
          tag='h2'
          className={styles.headTitle}
        >{`Награды компании ${company.name}`}</Htag>
        <div className={styles.header}>
          <ButtonRadio
            onClick={() => setActive('')}
            className={cn(styles.all, {
              [styles.active]: active == '',
            })}
          >
            Все
          </ButtonRadio>
          <ButtonRadio
            onClick={() => setActive('AWARD')}
            className={cn(styles.award, {
              [styles.active]: active == 'AWARD',
            })}
          >
            Награды
          </ButtonRadio>
          <ButtonRadio
            onClick={() => setActive('NOMINEE')}
            className={cn(styles.nominee, {
              [styles.active]: active == 'NOMINEE',
            })}
          >
            Номинации
          </ButtonRadio>
          <SortButton
            state={state}
            onClick={() => (state == 1 ? setState(-1) : setState(1))}
            className={styles.sort}
          >
            Сначала новые
          </SortButton>

          <Button
            onClick={() => push(getAwardCreateUrl())}
            appearance='blackWhite'
            size='m'
            className={styles.btn}
          >
            +&nbsp;&nbsp;&nbsp;Создать
          </Button>
        </div>

        {
          isLoading ? (
            <Spinner />
          ) : (
            <div className={styles.cards}>
              {filteredValue?.map((item) => {
                return (
                  <Link key={item.id} href={'/award/' + item.id}>
                    <a>
                      <SingleAward award={item} />
                    </a>
                  </Link>
                );
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
