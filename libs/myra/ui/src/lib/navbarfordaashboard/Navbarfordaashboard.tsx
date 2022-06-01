/* eslint-disable-next-line */
import { Box, Text, Image, Flex, Spacer, Avatar } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import React from 'react';
import { useTranslation } from '@saccos/myra/util';

/* eslint-disable-next-line */
export interface NavbarfordaashboardProps {}
function ActiveLink(props: { children: React.ReactNode; href: string }) {
  const { children, href } = props;
  const router = useRouter();
  const style = {
    marginRight: 10,
    height: '60px',
    width: '100px',
    boxShadow: router?.asPath === href ? ' inset 0px -4px 0px #8CC63F' : 'none',
  };

  return (
    <Link href={href}>
      <Text
        fontFamily="Inter"
        fontSize="14px"
        fontWeight="600"
        color="#FFFFFF"
        display={'flex'}
        justifyContent="center"
        cursor={'pointer'}
        alignItems={'center'}
        style={style}
      >
        {children}
      </Text>
    </Link>
  );
}

export function Navbarfordaashboard() {
  const { t } = useTranslation();
  return (
    <Box h="60px" px="5" background={'primary.dark'}>
      <Flex>
        <Box cursor={'pointer'}>
          <Image src="/dashboardnavbar/MyraLogo.png" alt="logo" />
        </Box>
        <Spacer />
        <Box display="flex" alignItems="flex-end" h="60px">
          <ActiveLink href="/">{t.home}</ActiveLink>
          <ActiveLink href="/dashboardMain">{t.dashboard}</ActiveLink>
        </Box>
        <Spacer />
        <Box>
          <Flex justify="flex-end">
            <Box flex={1} mt="20px" mb="20px">
              <Image
                src="/dashboardnavbar/bellwithNotification.png"
                alt="Notification bell"
              />
            </Box>

            <Box flex={1} mt="21px" mb="21px" ml="34.85px">
              <Image src="/dashboardnavbar/Help.png" alt="help" />
            </Box>
            <Box flex={1} m="12px 12px 12px 25px">
              <Avatar
                name="Avatar"
                src="/dashboardnavbar/avatar.png"
                h="36px"
                w="36px"
              />
            </Box>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}

export default Navbarfordaashboard;
