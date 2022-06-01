import {
  Avatar,
  Box,
  Container,
  Flex,
  Grid,
  GridItem,
  HStack,
  Img,
  Spacer,
  Text,
} from '@chakra-ui/react';
import { Navbarfordaashboard } from '@saccos/myra/ui';
import { useTranslation } from '@saccos/myra/util';
import { useRouter } from 'next/router';

import { useGetNewIdMutation } from '../generated/graphql';

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
const DashboardMain = () => {
  const { t } = useTranslation();
  const newId = useGetNewIdMutation();
  const router = useRouter();

  return (
    <>
      <Box position="fixed" width="100%" zIndex={2} top="0">
        <Navbarfordaashboard />
      </Box>
      <Container maxW="904px" height="fit-content" mt="100px" p="0" pb="55px">
        <Box>
          <Flex>
            <Text
              fontSize="20px"
              fontFamily="inter"
              fontWeight="500"
              color="#07073F"
            >
              {t.yourDashboard}
            </Text>
          </Flex>
        </Box>
        <Box mt="33px">
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
        <Box mt="25px">
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
                          .then((res) =>
                            router.push(`members/addMember/${res?.newId}`)
                          )
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
        <Box mt="32px">
          <Flex>
            <Box>
              <Text fontSize="13px" fontWeight="600" color="#636972">
                {t.today}
              </Text>
            </Box>
          </Flex>
        </Box>

        <Box mt="24px">
          <Flex>
            <Box h="173px" w="444px" bg="#FFFFFF">
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
            <Spacer />
            <Box h="173px" w="444px" bg="#FFFFFF">
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
          </Flex>
        </Box>
        <Box mt="16px">
          <Flex>
            <Box h="173px" w="444px" bg="#FFFFFF">
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
            <Spacer />
            <Box h="173px" w="444px" bg="#FFFFFF">
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
          </Flex>
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
      </Container>
    </>
  );
};
export default DashboardMain;
