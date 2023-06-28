/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { ReactNode } from 'react';
import { useRouter } from 'next/router';

import { Text } from '@myra-ui';

interface IProps {
  label?: string | ReactNode;
  link: string;
}

export const RedirectButton = ({ label, link }: IProps) => {
  const router = useRouter();
  return (
    <Text
      px="0"
      minW="0"
      color="primary.500"
      fontWeight="600"
      cursor="pointer"
      _hover={{ textDecoration: 'underline' }}
      onClick={() => router.push(link)}
      overflowWrap="anywhere"
      // noOfLines={1}
    >
      {label}
    </Text>
  );
};
