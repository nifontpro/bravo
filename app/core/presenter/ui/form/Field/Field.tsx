import { forwardRef } from 'react';
import cn from 'classnames';
import styles from './Field.module.scss'
import { IField } from '@/core/presenter/ui/form/form.interface';
import Input from '../../Input/Input';
import P from '../../P/P';

const Field = forwardRef<HTMLInputElement, IField>(
  ({ placeholder, error, type = 'text', style, className, ...rest }, ref) => {
    return (
      <div className={cn(className, styles.common, styles.field)} style={style}>
        <P className={styles.placeholder}>{placeholder}</P>
        <Input error={error} ref={ref} type={type} {...rest} className={styles.input} placeholder='yourname@email.com'/>
        {/* <input ref={ref} type={type} {...rest}/> */}
        {/* {error && <div className={styles.error}>{error.message}</div>} */}
      </div>
    );
  }
);

Field.displayName = 'Field';

export default Field;
