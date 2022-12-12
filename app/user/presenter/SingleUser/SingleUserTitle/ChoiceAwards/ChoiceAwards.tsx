import styles from './ChoiceAwards.module.scss';
import { ChoiceAwardsProps } from './ChoiceAwards.props';
import cn from 'classnames';
import Search from '@/core/presenter/ui/Search/Search';
import P from '@/core/presenter/ui/P/P';
import Checkbox from '@/core/presenter/ui/Checkbox/Checkbox';
import UserList from './AwardList/AwardList';
import { useState } from 'react';
import { declOfNum } from '@/core/utils/declOfNum';
import AwardList from './AwardList/AwardList';

const ChoiceAwards = ({
  awards,
  arrChoiceAward,
  setArrChoiceAward,
  className,
  ...props
}: ChoiceAwardsProps): JSX.Element => {
  const [allChecked, setAllChecked] = useState<boolean>(false);
  const [visibleCheckbox, setVisibleCheckbox] = useState<boolean>(false);

  const [searchValue, setSearchValue] = useState<string>('');

  const filteredValue = awards.filter((item) =>
    item.name?.toLowerCase().includes(searchValue)
  );

  const handleChoiceAllAwards = () => {
    setAllChecked(!allChecked);
    setVisibleCheckbox(!visibleCheckbox);
    if (!allChecked && arrChoiceAward.length != awards.length) {
      let arr: string[] = [];
      awards.forEach((item) => arr.push(item.id));
      setArrChoiceAward(arr);
      setSearchValue('');
    }
    if (allChecked) {
      setArrChoiceAward([]);
      setSearchValue('');
    }
  };

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    setSearchValue(event.currentTarget.value);
  };

  return (
    <div className={cn(styles.wrapper, className)} {...props}>
      <P className={styles.searchTitle}>Поиск</P>
      <Search
        onChange={handleChange}
        placeholder='Поиск награды'
        button={false}
        search={true}
        color='white'
      />
      <div className={styles.searchPanel}>
        <P size='s' fontstyle='thin' color='gray'>
          Выбрано {arrChoiceAward.length}{' '}
          {declOfNum(arrChoiceAward.length, ['медаль', 'медали', 'медалей'])}
        </P>

        <Checkbox
          setVisibleCheckbox={setVisibleCheckbox}
          visibleCheckbox={visibleCheckbox}
          icon='check'
          onClick={handleChoiceAllAwards}
        >
          <P size='s' fontstyle='thin'>
            Выбрать все
          </P>
        </Checkbox>
      </div>
      <div className={styles.searchUsers}>
        {filteredValue?.map((award) => {
          return (
            <AwardList
              arrChoiceUser={arrChoiceAward}
              setArrChoiceUser={setArrChoiceAward}
              key={award.id}
              award={award}
              setVisibleCheckbox={setVisibleCheckbox}
              allChecked={allChecked}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ChoiceAwards;
