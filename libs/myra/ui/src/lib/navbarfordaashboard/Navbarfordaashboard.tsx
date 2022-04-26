/* eslint-disable-next-line */
import {
  Box,
  Text,
  Tabs,
  TabList,
  Tab,
  Image,
  Flex,
  Spacer,
  Avatar,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export interface NavbarfordaashboardProps {}

export function Navbarfordaashboard(props: NavbarfordaashboardProps) {
  return (
    <Box h="60px" px="5" background={'primary.dark'}>
      <Flex>
        <Box>
          <Image src="/dashboardnavbar/MyraLogo.png" alt="logo" />
        </Box>
        <Spacer />
        <Box display="flex" alignItems="flex-end">
          <Tabs variant="line" colorScheme="green">
            <TabList>
              <Link href="/dashboard">
                <Tab
                  _selected={{
                    color: 'white',
                    boxShadow: ' inset 0px -4px 0px #8CC63F',
                  }}
                  h="60px"
                  w="100px"
                >
                  <Text
                    fontFamily="inter"
                    fontSize="14px"
                    fontWeight="600"
                    color="#FFFFFF"
                  >
                    Home
                  </Text>
                </Tab>
              </Link>
              <Link href="/dashboardMain">
                <Tab
                  _selected={{
                    color: 'white',
                    boxShadow: ' inset 0px -4px 0px #8CC63F',
                  }}
                  h="60px"
                  w="100px"
                >
                  <Text
                    fontFamily="inter"
                    fontSize="14px"
                    fontWeight="600"
                    color="#FFFFFF"
                  >
                    Dashboard
                  </Text>
                </Tab>
              </Link>
            </TabList>
          </Tabs>
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
              <Image src="/dashboardnavbar/help.png" alt="help" />
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
