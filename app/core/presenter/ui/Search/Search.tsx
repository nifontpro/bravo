import styles from './Search.module.scss';
import cn from 'classnames';
import { SearchProps } from './Search.props';
import Input from '../Input/Input';
import Button from '../Button/Button';
import SearchIcon from './search.svg';

const Search = ({ color, search, button, placeholder, className, ...props }: SearchProps): JSX.Element => {
  return (
    <div className={cn(className, styles.search, {
      [styles.searchWithoutBtn]: button == false
    })} {...props}>
      <div className={styles.window}>
        <Input color={color} search={search} placeholder={placeholder} />
        <div className={styles.svg}>
          <SearchIcon />
        </div>
      </div>
      <Button size='m' appearance='blackGray' className={cn(styles.button, {
        [styles.buttonHidden]: button == false
      })}>
        Найти
      </Button>
    </div>
  );
};

export default Search;
