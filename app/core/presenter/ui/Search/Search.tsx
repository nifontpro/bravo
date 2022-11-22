import styles from './Search.module.scss';
import cn from 'classnames';
import { SearchProps } from './Search.props';
import Input from '../Input/Input';
import Button from '../Button/Button';
import SearchIcon from './search.svg';

const Search = ({ className, ...props }: SearchProps): JSX.Element => {
  return (
    <div className={cn(className, styles.search)} {...props}>
      <div className={styles.window}>
        <Input search={true} placeholder='Сотрудник, отдел, медаль...' />
        <div className={styles.svg}>
          <SearchIcon />
        </div>
      </div>
      <Button size='m' appearance='blackGray' className={styles.button}>
        Найти
      </Button>
    </div>
  );
};

export default Search;
