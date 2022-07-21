import { ReactElement } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Flex, HStack, Img, Spacer } from '@chakra-ui/react';

import { HomePageLayout } from '@coop/myra/components';
import { useGetNewIdMutation } from '@coop/shared/data-access';
import { Avatar, Box, Grid, GridItem, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

const data = [
  {
    avatar: '/dashboardmain/avatar.png',
    text: 'Fill Out KYC for NIC Asia Bank',
    subtext: 'I’ve attached an image for the task. Please go through it.',
    status: 'Due Today',
    importance: '/dashboardmain/importance.png',
    icon: '/dashboardmain/redellipse.png',
  },
  {
    avatar: '/dashboardmain/avatar2.png',
    text: 'Invoice Correction',
    subtext: 'Check the attachments to fix the errors',
    status: 'Due in 2 days',
    importance: '/dashboardmain/importance.png',
    icon: '/dashboardmain/greyellipse.svg',
  },
  {
    avatar: '/dashboardmain/avatar3.png',
    text: 'Process all approvals today',
    subtext: 'All the files must be approved today',
    status: 'Done',
    importance: '/dashboardmain/importance.png',
    icon: '/dashboardmain/check.png',
  },
  {
    avatar: '/dashboardmain/avatar.png',
    text: 'Fill Out KYC for NIC Asia Bank',
    subtext: 'I’ve attached an image for the task. Please go through it.',
    status: 'Due Today',
    importance: '/dashboardmain/importance.png',
    icon: '/dashboardmain/check.png',
  },
  {
    avatar: '/dashboardmain/avatar2.png',
    text: 'Invoice Correction',
    subtext: 'Check the attachments to fix the errors',
    status: 'Due in 2 days',
    importance: '/dashboardmain/importance.png',
    icon: '/dashboardmain/greyellipse.svg',
  },
  {
    avatar: '/dashboardmain/avatar3.png',
    text: 'Process all approvals today',
    subtext: 'All the files must be approved today',
    status: 'Done',
    importance: '/dashboardmain/importance.png',
    icon: '/dashboardmain/check.png',
  },
];

const dataKeys = Object.keys(data);

const Dashboard = () => {
  const { t } = useTranslation();
  const newId = useGetNewIdMutation();
  const router = useRouter();

  return (
    <Box height="fit-content" mt="70px" p="0" pb="55px">
      <Box display="flex" flexDir="column" gap="s16">
        <Box>
          <Flex>
            <Box>
              <Text
                fontSize="12px"
                fontFamily="Inter"
                fontWeight="600"
                color="#636972"
              >
                {t.quickLinks}
              </Text>
            </Box>
            <Spacer />
            <Box>
              <Text
                fontSize="14px"
                fontFamily="Inter"
                fontWeight="500"
                color="#636972"
              >
                {t.editLinks}
              </Text>
            </Box>
          </Flex>
        </Box>
        <Box>
          <Grid templateColumns="repeat(3, 1fr)" gap="9px">
            <GridItem>
              <Box
                w="100%"
                h="58px"
                bg="#FFFFFF"
                p="20px"
                alignItems="center"
                justifyContent="center"
              >
                <HStack spacing="14px">
                  <Box>
                    <Img src="/Icon_Add.svg" alt="add icon" />
                  </Box>
                  <Box>
                    <Text
                      fontSize="12px"
                      fontWeight="500"
                      color="#343C46"
                      cursor="pointer"
                      onClick={() =>
                        newId
                          .mutateAsync({})
                          .then((res) => router.push(`members/list`))
                      }
                    >
                      {t.addNewMember}
                    </Text>
                  </Box>
                </HStack>
              </Box>
            </GridItem>
            <GridItem>
              <Box
                w="100%"
                h="58px"
                bg="#FFFFFF"
                p="12px"
                alignItems="center"
                justifyContent="center"
              >
                <HStack spacing="14px">
                  <Box>
                    <Img src="/list_icon.svg" alt="add icon" />
                  </Box>
                  <Box>
                    <Text fontSize="12px" fontWeight="400" color="#343C46">
                      {t.transactionHistory}
                    </Text>
                    <Text fontSize="12px" fontWeight="400" color="#91979F">
                      {t.transactionHistoryReport}
                    </Text>
                  </Box>
                </HStack>
              </Box>
            </GridItem>
            <GridItem>
              <Box
                w="100%"
                h="58px"
                bg="#FFFFFF"
                p="12px"
                alignItems="center"
                justifyContent="center"
              >
                <HStack spacing="14px">
                  <Box>
                    <Img src="/bxs_user.svg" alt="user icon" />
                  </Box>
                  <Box>
                    <Text fontSize="12px" fontWeight="400" color="#343C46">
                      Ram Krishna (CA2234)
                    </Text>
                    <Text fontSize="12px" fontWeight="400" color="#91979F">
                      {t.memberProfile}
                    </Text>
                  </Box>
                </HStack>
              </Box>
            </GridItem>
            <GridItem>
              <Box
                w="100%"
                h="58px"
                bg="#FFFFFF"
                p="12px"
                alignItems="center"
                justifyContent="center"
              >
                <HStack spacing="14px">
                  <Box>
                    <Img src="/list_icon.svg" alt="list icon" />
                  </Box>
                  <Box>
                    <Text fontSize="12px" fontWeight="400" color="#343C46">
                      {t.shareInformation}
                    </Text>
                    <Text fontSize="12px" fontWeight="400" color="#91979F">
                      {t.shareInformationReport}
                    </Text>
                  </Box>
                </HStack>
              </Box>
            </GridItem>
            <GridItem>
              <Box
                w="100%"
                h="58px"
                bg="#FFFFFF"
                p="20px"
                alignItems="center"
                justifyContent="center"
              >
                <HStack spacing="14px">
                  <Box>
                    <Img src="/Icon_Add.svg" alt="add icon" />
                  </Box>
                  <Box>
                    <Text fontSize="12px" fontWeight="400" color="#343C46">
                      {t.addNewLoan}
                    </Text>
                  </Box>
                </HStack>
              </Box>
            </GridItem>
            <GridItem>
              <Box
                w="100%"
                h="58px"
                bg="#FFFFFF"
                p="20px"
                alignItems="center"
                justifyContent="center"
              >
                <HStack spacing="14px">
                  <Box>
                    <Img src="/Icon_Add.svg" alt="add icon" />
                  </Box>
                  <Box>
                    <Text fontSize="12px" fontWeight="500" color="#343C46">
                      {t.addDeposit}
                    </Text>
                  </Box>
                </HStack>
              </Box>
            </GridItem>
          </Grid>
        </Box>
      </Box>

      <Box mt="s32" display="flex" flexDir="column" gap="s16">
        <Box>
          <Flex>
            <Box>
              <Text fontSize="13px" fontWeight="600" color="#636972">
                {t.today}
              </Text>
            </Box>
          </Flex>
        </Box>

        <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap="s16">
          <Box h="173px" bg="#FFFFFF">
            <Flex>
              <Box mt="16px" ml="16px">
                <Text fontSize="12px" fontWeight="500" color="#343C46">
                  {t.deposits}
                </Text>

                <Box mt="24px">
                  <HStack spacing="20px">
                    <Box>
                      {' '}
                      <Text fontSize="20px" fontWeight="500" color="#006837">
                        {' '}
                        4,96,934.00
                      </Text>
                    </Box>
                    <Box>
                      <Img
                        src="/dashboardmain/1.greenuparrow.svg"
                        alt="up arrow"
                      />
                    </Box>
                  </HStack>
                </Box>
                <Box mt="24px">
                  <HStack spacing="4px">
                    <Box>
                      <Text fontSize="12px" fontWeight="400" color="#636972F">
                        Yesterday
                      </Text>
                    </Box>
                    <Box>
                      <Text fontSize="12px" fontWeight="500" color="#343C46">
                        5,67,800.00
                      </Text>
                    </Box>
                  </HStack>
                </Box>
              </Box>
              <Spacer />
              <Box mt="55px" w="185px" h="95px" mr="15px">
                <Img src="/dashboardmain/2.greenchart.svg" alt="chart" />
              </Box>
            </Flex>
          </Box>
          <Box h="173px" bg="#FFFFFF">
            <Flex>
              <Box mt="16px" ml="16px">
                <Text fontSize="12px" fontWeight="500" color="#343C46">
                  {t.withdraws}
                </Text>

                <Box mt="24px">
                  <HStack spacing="20px">
                    <Box>
                      {' '}
                      <Text fontSize="20px" fontWeight="500" color="#FC814A">
                        {' '}
                        96,934.00
                      </Text>
                    </Box>
                    <Box>
                      <Img
                        src="/dashboardmain/3.reduparrow.svg"
                        alt="down arrow"
                      />
                    </Box>
                  </HStack>
                </Box>
                <Box mt="24px">
                  <HStack spacing="4px">
                    <Box>
                      <Text fontSize="12px" fontWeight="400" color="#636972F">
                        Yesterday
                      </Text>
                    </Box>
                    <Box>
                      <Text fontSize="12px" fontWeight="500" color="#343C46">
                        67,800.00
                      </Text>
                    </Box>
                  </HStack>
                </Box>
              </Box>
              <Spacer />
              <Box mt="55px" w="185px" h="95px" mr="15px">
                <Img src="/dashboardmain/4.redChart.svg" alt="chart" />
              </Box>
            </Flex>
          </Box>

          <Box h="173px" bg="#FFFFFF">
            <Flex>
              <Box mt="16px" ml="16px">
                <Text fontSize="12px" fontWeight="500" color="#343C46">
                  {t.loan}
                </Text>

                <Box mt="24px">
                  <HStack spacing="20px">
                    <Box>
                      {' '}
                      <Text fontSize="20px" fontWeight="500" color="#006837">
                        {' '}
                        4,96,934.00
                      </Text>
                    </Box>
                    <Box>
                      <Img
                        src="/dashboardmain/1.greenuparrow.svg"
                        alt="up arrow"
                      />
                    </Box>
                  </HStack>
                </Box>
                <Box mt="24px">
                  <HStack spacing="4px">
                    <Box>
                      <Text fontSize="12px" fontWeight="400" color="#636972F">
                        Yesterday
                      </Text>
                    </Box>
                    <Box>
                      <Text fontSize="12px" fontWeight="500" color="#343C46">
                        5,67,800.00
                      </Text>
                    </Box>
                  </HStack>
                </Box>
              </Box>
              <Spacer />
              <Box mt="55px" w="185px" h="95px" mr="15px">
                <Img src="/dashboardmain/2.greenchart.svg" alt="chart" />
              </Box>
            </Flex>
          </Box>

          <Box h="173px" bg="#FFFFFF">
            <Flex>
              <Box mt="16px" ml="16px">
                <Text fontSize="12px" fontWeight="500" color="#343C46">
                  {t.transactions}
                </Text>

                <Box mt="24px">
                  <HStack spacing="20px">
                    <Box>
                      {' '}
                      <Text fontSize="20px" fontWeight="500" color="#006837">
                        {' '}
                        96,934.00
                      </Text>
                    </Box>
                    <Box>
                      <Img
                        src="/dashboardmain/1.greenuparrow.svg"
                        alt="up arrow"
                      />
                    </Box>
                  </HStack>
                </Box>
                <Box mt="24px">
                  <HStack spacing="4px">
                    <Box>
                      <Text fontSize="12px" fontWeight="400" color="#636972F">
                        Yesterday
                      </Text>
                    </Box>
                    <Box>
                      <Text fontSize="12px" fontWeight="500" color="#343C46">
                        67,800.00
                      </Text>
                    </Box>
                  </HStack>
                </Box>
              </Box>
              <Spacer />
              <Box mt="55px" w="185px" h="95px" mr="15px">
                <Img src="/dashboardmain/2.greenchart.svg" alt="chart" />
              </Box>
            </Flex>
          </Box>
        </Box>
      </Box>

      <Box
        mt="s32"
        height="283px"
        display="flex"
        justifyContent="space-around"
        borderRadius="br4"
        bgImage="linear-gradient(180deg, #006837 0%, #025250 100% )"
      >
        <Box
          w="66px"
          h="66px"
          borderRadius="50%"
          bg="#FD7A3D"
          mt="85px"
          mb="85px"
          ml="58.61px"
          display="flex"
          justifyContent="center"
        >
          <Flex justifyContent="center" alignItems="center">
            <Image
              height={46}
              width={41}
              src="/dashboardhome/logoAtMiddle.png"
              alt="cetral chakra"
            />
          </Flex>
        </Box>
        <Box mt="85px" mb="104px" ml="33.78px" maxW="418.22px">
          <Text
            fontFamily="Mukta"
            fontSize="36px"
            fontWeight="500"
            color="#FD7A3D"
          >
            आफ्नो सदस्यहरु सहज रूपले व्यवस्थापन गर्नुहोस्
          </Text>
          <Box mt="6px">
            <Text
              fontFamily="Mukta"
              fontSize="20px"
              fontWeight="500"
              color="#FFFFFF"
            >
              Customer Relationship Management Software
            </Text>
          </Box>
        </Box>
        <Box mt="204px" ml="163.63px" mb="31.18px">
          <Img src="/dashboardhome/MyraLogo.png" alt="Main Logo" />
        </Box>
      </Box>

      <Box mt="32px" bg="#FFFFFF" p="16px" pt="24px">
        <Text fontSize="14px" fontWeight="500" color="#343C46">
          {t.tasks}
        </Text>
      </Box>
      <Box mt="1px" bg="#FFFFFF">
        {dataKeys.map((keys) => {
          return (
            <Box
              key={keys}
              borderBottom="1px solid #CBD0D6"
              pl="45px"
              pr="20px"
              h="79px"
              display={'flex'}
              alignItems="center"
              justifyContent="flex-start"
            >
              <Box w="470px" display={'flex'} flexDirection="row">
                <Avatar src={data[keys].avatar} />
                <Box
                  display={'flex'}
                  flexDirection="column"
                  alignItems={'flex-start'}
                  px="16px"
                >
                  <Text fontSize="13px" fontWeight="600" color="#37474F">
                    {data[keys].text}
                  </Text>
                  <Text fontSize="13px" fontWeight="400" color="#607D8B">
                    {data[keys].subtext}
                  </Text>
                </Box>
              </Box>

              <Box>
                <Flex>
                  <Box w="24px" h="24px">
                    <Img src={data[keys].importance} alt="importance" />
                  </Box>
                  <Box minW="10px" minH="10px" ml="19px" mt="6px">
                    <Img src={data[keys].icon} alt="check" />
                  </Box>
                  <Box mt="2px" ml="8px">
                    <Text fontSize="13px" fontWeight="400" color="#343C46">
                      {data[keys].status}
                    </Text>
                  </Box>
                </Flex>
              </Box>
              <Spacer />
              <Box display={'flex'} justifyContent="flex-end">
                <Avatar src={data[keys].avatar} mr="45px" />

                <Box pt="15px">
                  <Img src="/dashboardmain/options.svg" alt="more options" />
                </Box>
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <HomePageLayout>{page}</HomePageLayout>;
};
export default Dashboard;
