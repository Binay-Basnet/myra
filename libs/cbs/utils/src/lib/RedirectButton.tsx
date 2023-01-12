/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { ReactNode } from 'react';
import { useRouter } from 'next/router';

import { Button } from '@myra-ui';

interface IProps {
  label?: string | ReactNode;
  link: string;
}

export const RedirectButton = ({ label, link }: IProps) => {
  const router = useRouter();
  return (
    <Button px="0" minW="0" variant="link" onClick={() => router.push(link)}>
      {label}
    </Button>
  );
};
