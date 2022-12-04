import Image from 'next/legacy/image';

import { Box } from '@myra-ui/foundations';

/* eslint-disable-next-line */
export interface ChangePasswordLayoutProps {
  children: React.ReactNode;
}

export const ChangePasswordLayout = (props: ChangePasswordLayoutProps) => {
  const { children } = props;
  return (
    <>
      <Box h="s60" bg="white" display="flex" alignItems="center" px="s16">
        <Box position="relative" w="80px" h="32px">
          <Image src="/loginLogo.svg" layout="fill" alt="logo" />
        </Box>
      </Box>
      <Box display="flex" justifyContent="center">
        {children}
      </Box>
    </>
  );
};

export default ChangePasswordLayout;
