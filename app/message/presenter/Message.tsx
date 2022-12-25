import styles from './Message.module.scss';
import Meta from '@/core/utils/meta/Meta';
import { MessageProps } from './Message.props';
import { useAward } from 'award/presenter/useAward';
import { useMyUser } from '@/user/presenter/useMyUsers';
import Htag from '@/core/presenter/ui/Htag/Htag';
import SelectCustom from '@/core/presenter/ui/SelectCustom/SelectCustom';
import { useState } from 'react';
import { useRouter } from 'next/router';
import P from '@/core/presenter/ui/P/P';
import { useAuthState } from '@/auth/data/auth.slice';
import { messageApi } from 'message/data/message.api';

const Message = ({
  company,
  className,
  ...props
}: MessageProps): JSX.Element => {
  const { user: currentUser } = useAuthState();

  const { data: allMessage } = messageApi.useGetByUserQuery(currentUser?.id || '', {skip: !currentUser?.id});
//  console.log(allMessage)
  // const { awardsLight, awardsFullCompany } = useAward('');
  // const { usersCountAwardsOnDepCompany } = useMyUser('');
  // const { usersWithAwardsUnion: users } = useMyUser('');
  // const { push } = useRouter();
  // const [departSort, setDepartSort] = useState<string>('');

  return (
    <Meta title='Статистика'>
      <div {...props} className={styles.wrapper}>
        <div className={styles.title}>
          <Htag tag='h3' className={styles.header}>
            Статистика
          </Htag>
        </div>

        
      </div>
    </Meta>
  );
};

export default Message;
