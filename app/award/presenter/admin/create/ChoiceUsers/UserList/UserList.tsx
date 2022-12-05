import styles from './UserList.module.scss';
import { UserListProps } from './UserList.props';
import cn from 'classnames';
import UserPreview from '@/core/presenter/ui/UserPreview/UserPreview';
import CheckedIcon from './checked.svg';
import { useEffect, useState } from 'react';

const UserList = ({ setArrChoiceUser, arrChoiceUser, allChecked, setVisibleCheckbox, user, className, ...props }: UserListProps): JSX.Element => {

const [visible, setVisible] = useState<boolean>(allChecked)

useEffect(() => {
  setVisible(allChecked)
}, [allChecked])

const handleClick = () => {
  setVisible(!visible)
  setVisibleCheckbox(false)
  let arr = [...arrChoiceUser]
  if (arrChoiceUser.findIndex(item => item == user.id) >= 0) {
    arr.splice(arr.findIndex(item => item == user.id), 1)
    setArrChoiceUser(arr)
  } else if (arrChoiceUser.findIndex(item => item == user.id) < 0) {
    arr.push(user.id)
    setArrChoiceUser(arr)
  }
}

  return (
    <div onClick={handleClick} className={cn(styles.userList, className)} {...props}>
      <UserPreview user={user} />
      <CheckedIcon className={cn(styles.searchIcon, {
        [styles.visible]: visible,
        [styles.hidden]: !visible,
      })} />
    </div>
  );
};

export default UserList;
