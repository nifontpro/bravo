import styles from './ModalWindowExcelAddUsers.module.scss';
import { ModalWindowExcelAddUsersProps } from './ModalWindowExcelAddUsers.props';
import cn from 'classnames';
import ExitIcon from '@/core/presenter/images/close.svg';
import { ForwardedRef, forwardRef, useState } from 'react';
import { useModalWindowExcelAddUsers } from './useModalWindowExcelAddUsers';
import { AnimatePresence, motion, PanInfo } from 'framer-motion';
import { useWindowSize } from '@/core/hooks/useWindowSize';
import Button from '../../Button/Button';
import uniqid from 'uniqid';
import SelectCustom from '../../SelectCustom/SelectCustom';
import { IOption } from '../../SelectArtem/SelectArtem.interface';
import { useDepartment } from '@/department/presenter/useDepartment';
import P from '../../P/P';

const ModalWindowExcelAddUsers = forwardRef(
  (
    {
      textBtn,
      data,
      visibleModal,
      fileName,
      setVisibleModal,
      className,
      ...props
    }: ModalWindowExcelAddUsersProps,
    ref: ForwardedRef<HTMLDivElement>
  ): JSX.Element => {
    const { departmentInCompany: departments } = useDepartment('');
    const [departSort, setDepartSort] = useState<string>('');

    const { handleCancel, onSubmitAdded } = useModalWindowExcelAddUsers(
      setVisibleModal,
      departSort,
      data
    );

    let arrDeparts: IOption[] = [];
    departments?.forEach((item) => {
      arrDeparts.push({
        label: item.name,
        value: item.id,
      });
    });

    const { windowSize } = useWindowSize();

    const variants = {
      visible: {
        opacity: 1,
      },
      hidden: {
        opacity: 0,
      },
      exit: {
        opacity: 0,
      },
    };

    const variantsMedia = {
      visible: {
        opacity: 1,
        y: 0,
      },
      hidden: {
        opacity: 0,
        y: '460px',
      },
      exit: {
        opacity: 0,
        y: '460px',
      },
    };

    const handleDrag = (
      event: globalThis.MouseEvent | TouchEvent | PointerEvent,
      info: PanInfo
    ) => {
      if (info.offset.y > 100 && info.offset.y < 1000) {
        setVisibleModal(false);
      }
    };

    return (
      <AnimatePresence mode='wait'>
        {visibleModal && (
          <motion.div
            initial='hidden'
            animate='visible'
            exit='exit'
            variants={windowSize.winWidth <= 768 ? variantsMedia : variants}
            transition={{ duration: 0.4 }}
            className={cn(styles.modalWindow, className)}
            drag={windowSize.winWidth < 768 ? 'y' : undefined}
            onDragEnd={(event, info) => handleDrag(event, info)}
            dragSnapToOrigin={true}
            {...props}
          >
            <div className={styles.slash} onClick={handleCancel} />
            <ExitIcon onClick={handleCancel} className={styles.exit} />

            <div className={styles.module} ref={ref}>
              <div>
                <P size='s' className={styles.fileName}>
                  {fileName}
                </P>
                <div className={styles.header}>
                  <P size='s'>Выберите отдел куда будут добалены сотрудники</P>
                  <SelectCustom
                    placeholder={'Выберите отдел'}
                    options={arrDeparts}
                    setDepartSort={setDepartSort}
                  />
                </div>

                {data ? (
                  <ul>
                    {data?.map((user) => {
                      return (
                        <li key={uniqid()} className={styles.item}>
                          №&nbsp;{user['№']}
                          <P size='s'>
                            {user.Фамилия} {user.Имя} {user.Отчество}
                          </P>
                          <P
                            size='xs'
                            fontstyle='thin'
                            className={styles.itemProps}
                          >
                            <P size='xs'>Email:&nbsp;</P>
                            {user.email}
                          </P>
                          <P
                            size='xs'
                            fontstyle='thin'
                            className={styles.itemProps}
                          >
                            <P size='xs'>Телефон:&nbsp;</P>
                            {user.Телефон}
                          </P>
                          <P
                            size='xs'
                            fontstyle='thin'
                            className={styles.itemProps}
                          >
                            <P size='xs'>Должность:&nbsp;</P>
                            {user.Должность}
                          </P>
                          <P
                            size='xs'
                            fontstyle='thin'
                            className={styles.itemProps}
                          >
                            <P size='xs'>О&nbsp;сотруднике:&nbsp;</P>
                            {user['О сотруднике']}
                          </P>
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <P size='s'>Файл не распознан</P>
                )}
              </div>

              <div className={styles.buttons}>
                <Button
                  onClick={handleCancel}
                  appearance='whiteBlack'
                  size='l'
                  className={styles.cancel}
                >
                  Отменить
                </Button>
                <Button
                  onClick={onSubmitAdded}
                  appearance='blackWhite'
                  size='l'
                  className={styles.confirm}
                  disabled={!data || !departSort.length}
                >
                  {textBtn}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }
);

ModalWindowExcelAddUsers.displayName = 'ModalWindowExcelAddUsers';
export default ModalWindowExcelAddUsers;
