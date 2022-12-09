import { FC } from 'react';
import styles from './SelectCustom.module.scss';
import { IOption, ISelect } from './SelectCustom.interface';
import Select, { OnChangeValue } from 'react-select';
import makeAnimated from 'react-select/animated';
import cn from 'classnames';

const animatedComponents = makeAnimated();

const SelectCustom: FC<ISelect> = ({
  setDepartSort,
  isMulti,
  options,
  field,
  isLoading,
  placeholder,
  className,
  ...props
}) => {
  const onChange = (newValue: unknown | OnChangeValue<IOption, boolean>) => {
    setDepartSort((newValue as IOption).value)
  	// field.onChange(
  	// 	isMulti
  	// 		? (newValue as IOption[]).map((item: IOption) => item.value)
  	// 		: (newValue as IOption).value
  	// )
  }

  // const getValue = () => {
  // 	if (field.value) {
  // 		return isMulti
  // 			? options.filter((option) => field.value.indexOf(option.value) >= 0)
  // 			: options.find((option) => option.value === field.value)
  // 	} else {
  // 		return isMulti ? [] : ''
  // 	}
  // }

  return (
    // <div className={cn(styles.wrapper, className)} {...props}>
    <Select
      className={className}
      classNamePrefix='custom-select-rating'
      placeholder={placeholder}
      options={options}
      // value={getValue()}
      onChange={onChange}
      isMulti={isMulti} // false
      components={animatedComponents}
      isLoading={isLoading}
      // theme={(theme) => ({
      //   ...theme,
      //   borderRadius: 10,
      //   colors: {
      //     ...theme.colors,
      //     neutral80: '#101010',
      //   },
      // })}
    />
    // </div>
  );
};

export default SelectCustom;
