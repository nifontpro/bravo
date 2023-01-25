import { useAuthState } from '@/auth/data/auth.slice';
import Heading from '@/core/presenter/ui/heading/Heading';
import Meta from '@/core/utils/meta/Meta';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Error404() {

  return (
    <Meta title='Page not found'>
      <Heading title='404 - Page Not Found' />
    </Meta>
  );
}
