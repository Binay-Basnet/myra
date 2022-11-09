import Image from "next/legacy/image";

import Box from '../box/Box';

/* eslint-disable-next-line */
export interface ChangePasswordLayoutProps {
  children: React.ReactNode;
}

export const ChangePasswordLayout = (props: ChangePasswordLayoutProps) => {
  const { children } = props;
  return (
    <>
      <Box h="s60" bg="white" p="s16">
        <Box position="relative" w="80px" h="32px">
          <Image src="/loginLogo.png" layout="fill" alt="logo" />
        </Box>
      </Box>
      <Box display="flex" justifyContent="center">
        {children}
      </Box>
    </>
  );
};

export default ChangePasswordLayout;
