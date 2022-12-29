
import Link from 'next/link';
import { FC } from 'react';

import LogoImage from '@/core/presenter/images/logo.svg';

const Logo: FC = () => {
  return (
    <Link href='/'>
      <a className='px-layout mb-10'>
        <LogoImage className='w-[200px] mt-2' />
      </a>
    </Link>
  );
};

export default Logo;
