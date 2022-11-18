import styles from './Search.module.scss';
import cn from 'classnames';
import { SearchProps } from './Search.props';
import Input from '../Input/Input';
import Button from '../Button/Button';

const Search = ({ className, ...props }: SearchProps): JSX.Element => {
  return (
    <div className={cn(className, styles.search)} {...props}>
      <Input
        className={styles.input}
        placeholder='Сотрудник, отдел, медаль...'
      />
      <Button size='m' appearance='blackGray' className={styles.button}>Найти</Button>
      {/* <SeachIcon /> */}
    </div>
  );
};

export default Search;
