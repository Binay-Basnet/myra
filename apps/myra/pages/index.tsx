import { ReactElement } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Flex, HStack, Img, Spacer } from '@chakra-ui/react';

import { useGetNewIdMutation } from '@coop/cbs/data-access';
import { HomePageLayout } from '@coop/myra/components';
import { Box, Button, Grid, GridItem, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';
const Charts = dynamic(() => import('react-apexcharts'), { ssr: false });

const Dashboard = () => {
  const { t } = useTranslation();
  const newId = useGetNewIdMutation();
  const router = useRouter();

  return (
    <Box height="fit-content" p="0" pb="55px">
      <Box display="flex" flexDir="column" gap="s16">
        <Box>
          <Flex>
            <Box>
              <Text
                fontSize={'s3'}
                color="gray.600"
                fontWeight={'600'}
                textTransform={'uppercase'}
              >
                {t.quickLinks}
              </Text>
            </Box>
            <Spacer />
            <Box>
              <Button variant="link" shade="neutral">
                {t.editLinks}
              </Button>
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
                          .then(() => router.push(`members/list`))
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
              <Text
                fontSize={'s3'}
                color="gray.600"
                fontWeight={'600'}
                textTransform={'uppercase'}
              >
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

      <Box display="flex" flexDirection={'column'} gap="s16" pt="s32">
        <Text fontSize={'r2'} fontWeight="600">
          {' '}
          Member Insights
        </Text>
        <Grid templateColumns={'repeat(2,1fr)'} gap="s16">
          <Box
            bg="white"
            p="s16"
            display={'flex'}
            flexDirection="column"
            gap="s16"
            borderRadius={'6px'}
          >
            <Text fontSize={'r1'} fontWeight="500">
              Age
            </Text>
            <Charts
              series={[
                {
                  name: 'Age',
                  data: [
                    {
                      x: '1-10',
                      y: 10,
                    },
                    {
                      x: '11-16',
                      y: 30,
                    },
                    {
                      x: '16-25',
                      y: 300,
                    },
                    {
                      x: '26-45',
                      y: 700,
                    },
                    {
                      x: '46-60',
                      y: 300,
                    },
                    {
                      x: 'Above 60',
                      y: 175,
                    },
                  ],
                },
              ]}
              type="bar"
              height={'400px'}
              w="100%"
              options={{
                chart: {
                  toolbar: {
                    show: false,
                  },
                  type: 'bar',
                },
                colors: ['#82CA9D'],
                legend: {
                  show: true,
                  horizontalAlign: 'right',
                  position: 'bottom',

                  showForSingleSeries: true,
                },
                // fill: {
                //   colors: ['#82CA9D'],
                // },
                dataLabels: {
                  enabled: false,
                },
                grid: {
                  borderColor: '#cccccc',
                  strokeDashArray: 2,
                  yaxis: {
                    lines: {
                      show: true,
                    },
                  },
                  xaxis: {
                    lines: {
                      show: true,
                    },
                  },
                },
              }}
            />
          </Box>
          <Box
            bg="white"
            p="s16"
            display={'flex'}
            flexDirection="column"
            gap="s16"
            borderRadius={'6px'}
          >
            <Text fontSize={'r1'} fontWeight="500">
              Type
            </Text>
            <Charts
              series={[750, 630, 250, 33]}
              type="donut"
              height={'400px'}
              w="100%"
              options={{
                labels: ['Male', 'Female', 'Institutions', 'Other'],
                colors: ['#8CC63F', '#FC814A', '#143E9F', '#474F5C'],
                chart: {
                  type: 'donut',
                  toolbar: {
                    show: false,
                  },
                },

                legend: {
                  show: true,
                  horizontalAlign: 'right',
                  position: 'bottom',
                },
                // fill: {
                //   colors: ['#8CC63F', '#FF8596', '#143E9F', '#474F5C'],
                // },
                dataLabels: {
                  // style: {
                  //   colors: ['#8CC63F', '#FF8596', '#143E9F', '#474F5C'],
                  // },
                  enabled: true,
                },
              }}
            />
          </Box>
        </Grid>
      </Box>
    </Box>
  );
};

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <HomePageLayout>{page}</HomePageLayout>;
};
export default Dashboard;
