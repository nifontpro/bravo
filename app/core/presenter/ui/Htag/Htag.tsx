import { HtagProps } from "./Htag.props"
import styles from './Htag.module.scss'
import cn from 'classnames'

const Htag = ({ tag = 'h2', children, className, ...props }: HtagProps): JSX.Element => {
    return (
      <h1
        className={cn(className, {
          [styles.h1]: tag == 'h1',
          [styles.h2]: tag == 'h2',
          [styles.h3]: tag == 'h3',
        })}
        {...props}
      >
        {children}
      </h1>
    );
}

export default Htag