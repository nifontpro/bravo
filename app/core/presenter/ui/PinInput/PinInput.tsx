import styles from './PinInput.module.scss';
import { PinInputProps } from './PinInput.props';
import { useEffect, useRef, useState } from 'react';
import uniqid from 'uniqid';
import cn from 'classnames';

const PinInput = ({
  digits,
  setState,
  className,
  ...props
}: PinInputProps): JSX.Element => {
  const inputRefs = useRef(new Array(digits.length));
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    inputRefs.current[currentIndex].focus();
  }, [currentIndex]);

  const updateArray = (array: string[], index: number, newValue: string) => {
    const copy = [...array];
    copy[index] = newValue;
    console.log(copy);
    return copy;
  };

  console.log('reRender');

  const handleChange = (index: number, newValue: string) => {
    const oldDigit = digits[index];
    const newDigit = newValue.trim().replace(oldDigit, '');

    if (newDigit < '0' || newDigit > '9') {
      return;
    }

    setState(updateArray(digits, index, newDigit));

    const inputs = inputRefs.current;
    if (index < inputs.length - 1) {
      inputs[index + 1].focus();
      setCurrentIndex(index + 1);
    } else {
      inputs[index].blur();
    }
  };

  const handleKeyDown = (index: number, keyPressed: string) => {
    if (keyPressed !== 'Backspace') {
      return;
    }
    if (digits[index]) {
      setState(updateArray(digits, index, ''));
      if (index > 0) {
        setCurrentIndex(index - 1);
      }
    } else if (index > 0) {
      inputRefs.current[index - 1].focus();
      setCurrentIndex(index - 1);
    }
  };

  return (
    <div className={cn(styles.wrapper, className)} {...props}>
      {digits.map((d, index) => {
        return (
          <input
            key={uniqid()}
            className={styles.wrapperInput}
            value={d}
            onChange={(event) => handleChange(index, event.target.value)}
            onKeyDown={(event) => handleKeyDown(index, event.nativeEvent.key)}
            ref={(ref) => (inputRefs.current[index] = ref)}
          />
        );
      })}
    </div>
  );
};

export default PinInput;
