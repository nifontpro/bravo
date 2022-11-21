import styles from './TitleSingleCompany.module.scss';
import cn from 'classnames';
import { TitleSingleCompanyProps } from './TitleSingleCompany.props';
import { ImageDefault } from '@/core/presenter/ui/icons/ImageDefault';
import Htag from '@/core/presenter/ui/Htag/Htag';
import P from '@/core/presenter/ui/P/P';
import ButtonCircleIcon from '@/core/presenter/ui/ButtonCircleIcon/ButtonCircleIcon';

const TitleSingleCompany = ({
  company,
  children,
  className,
  ...props
}: TitleSingleCompanyProps): JSX.Element => {
  // console.log(company);
  return (
    <div className={styles.titleCompany}>
      <div>
        <ImageDefault
          src={company.imageUrl}
          width={400}
          height={400}
          alt='company img'
          objectFit='cover'
          className='rounded-[27px]'
        />
      </div>

      <div className={styles.companyDescription}>
        <div className={styles.title}>
          <Htag tag='h1' className={styles.header}>
            {company.name}
          </Htag>
          <ButtonCircleIcon
                icon='dots'
                appearance='transparent'
              />
        </div>

        <P size='s' className={styles.description}>
          {company.description}
        </P>
        <div className={styles.contacts}>
          <a href='tel:+74999228594'>+74999228594</a>
          <a href='mailto:hello@familyagency.ru'>hello@familyagency.ru</a>
        </div>
        <div className={styles.colUsers}>
          <P className={styles.numberUsers}>
            Какое то колличество пользователей
          </P>
        </div>
      </div>
    </div>
  );
};
export default TitleSingleCompany;
