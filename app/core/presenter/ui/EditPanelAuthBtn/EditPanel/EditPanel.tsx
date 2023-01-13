import styles from './EditPanel.module.scss';
import cn from 'classnames';
import { EditPanelProps } from './EditPanel.props';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import P from '../../P/P';
import { ForwardedRef, forwardRef } from 'react';

const EditPanel = forwardRef(
  (
    {
      getUrl,
      id,
      deleteAsync,
      children,
      visible,
      className,
      onlyRemove,
      ...props
    }: EditPanelProps,
    ref: ForwardedRef<HTMLDivElement>
  ): JSX.Element => {
    const { push } = useRouter();

    const variants = {
      visible: {
        opacity: 1,
        height: !onlyRemove ? '129.9px' : 'auto',
        padding: '20px',
      },
      hidden: {
        opacity: 0,
        height: 0,
        padding: 0,
      },
    };

    if (onlyRemove) {
      return (
        <motion.div
          animate={visible ? 'visible' : 'hidden'}
          variants={variants}
          initial='hidden'
          transition={{ duration: 0.2 }}
          className={cn(styles.editPanel, className)}
          ref={ref}
          {...props}
        >
          {id && (
            <P
              size='xs'
              fontstyle='thin'
              onClick={() => deleteAsync(id)}
              className={styles.item}
            >
              Удалить
            </P>
          )}
        </motion.div>
      );
    } else {
      return (
        <motion.div
          animate={visible ? 'visible' : 'hidden'}
          variants={variants}
          initial='hidden'
          transition={{ duration: 0.2 }}
          className={cn(styles.editPanel, className)}
          ref={ref}
          {...props}
        >
          {getUrl && (
            <P
              size='xs'
              fontstyle='thin'
              onClick={() => push(getUrl(`/${id}`))}
              className={styles.item}
            >
              Редактировать
            </P>
          )}
          {id && (
            <P
              size='xs'
              fontstyle='thin'
              onClick={() => deleteAsync(id)}
              className={styles.item}
            >
              Удалить
            </P>
          )}
        </motion.div>
      );
    }
  }
);

EditPanel.displayName = 'EditPanel';
export default EditPanel;
