
import { UserLogoProps } from './UserLogo.props';
import { ImageDefault } from '@/core/presenter/ui/icons/ImageDefault';
import UserPanelModalWindow from './UserPanelModalWindow/UserPanelModalWindow';
import { useRef, useState } from 'react';
import useOutsideClick from '@/core/hooks/useOutsideClick';

const UserLogo = ({
  user,
  className,
  ...props
}: UserLogoProps): JSX.Element => {
  const [visibleModal, setVisibleModal] = useState<boolean>(false);
  //Закрытие модального окна пользователя нажатием вне
  const ref = useRef(null);
  const refOpen = useRef(null);
  const handleClickOutside = () => {
    setVisibleModal(false);
  };
  useOutsideClick(ref, refOpen, handleClickOutside, visibleModal);
  return (
    <>
      <div className={className} ref={refOpen} {...props} onClick={() => setVisibleModal(!visibleModal)}>
        <ImageDefault
          src={user?.imageUrl}
          width={64}
          height={64}
          alt='preview image'
          objectFit='cover'
          className='rounded-[10px]'
          priority={true}
        />
      </div>
      <UserPanelModalWindow
        visibleModal={visibleModal}
        setVisibleModal={setVisibleModal}
        user={user}
        ref={ref}
      />
    </>
  );
};

export default UserLogo;
