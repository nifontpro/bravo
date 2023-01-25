import { useRouter } from 'next/router';
import { FC } from 'react';
import Button from '../Button/Button';

interface IHeading {
  title: string;
  className?: string;
}

const Heading: FC<IHeading> = ({ title, className }) => {
  const { push } = useRouter();
  return (
    <div className='h-[100vh] flex flex-col items-center justify-center'>
      {' '}
      <h1
        className={`text-opacity-80 font-semibold mb-4
		${className?.includes('xl') ? '' : 'text-3xl'} ${className}`}
      >
        {title}
      </h1>
      <Button appearance='whiteBlack' size='s' onClick={() => push('/auth')}>
        Вернуться на главную
      </Button>
    </div>
  );
};

export default Heading;
