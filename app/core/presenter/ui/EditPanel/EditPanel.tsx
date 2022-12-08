
import styles from './EditPanel.module.scss'
import cn from 'classnames';
import { EditPanelProps } from './EditPanel.props';
import { useRouter } from 'next/router';

const EditPanel = ({
  getUrl,
  id,
  deleteAsync,
  children,
  visible,
  className,
  ...props
}: EditPanelProps): JSX.Element => {

  const { push } = useRouter()

  return (
    <div
      className={cn(styles.editPanel, {
        [styles.visible]: visible,
      })}
      {...props}
    >
      <div onClick={() => push(getUrl(`/${id}`))} className='cursor-pointer'>Edit</div>
      {id && <div onClick={() => deleteAsync(id)} className='cursor-pointer'>Remove</div>}
    </div>
  );
};
export default EditPanel;
