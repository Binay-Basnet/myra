import { ReactElement, useState } from 'react';
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from 'react-beautiful-dnd';
import {
  AiFillInfoCircle,
  AiOutlineBarcode,
  AiOutlineUnorderedList,
  AiOutlineUser,
  AiOutlineUserAdd,
} from 'react-icons/ai';
import { BsLockFill } from 'react-icons/bs';
import { FiSettings } from 'react-icons/fi';
import { IoMdPersonAdd } from 'react-icons/io';
import { RiNewspaperLine } from 'react-icons/ri';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Flex, HStack, Img, Spacer } from '@chakra-ui/react';

import { Id_Type, useGetNewIdMutation } from '@coop/cbs/data-access';
import { HomePageLayout } from '@coop/myra/components';
import {
  Box,
  Button,
  ChakraModal,
  Grid,
  GridItem,
  QuickLinks,
  Text,
} from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

const Charts = dynamic(() => import('react-apexcharts'), { ssr: false });

const Dashboard = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const newId = useGetNewIdMutation();
  const quickLinksList = [
    {
      id: 'a',
      text: 'Add New Member',
      icon: IoMdPersonAdd,
      onclick: () =>
        newId
          .mutateAsync({ idType: Id_Type.Kymindividual })
          .then((res) => router.push(`/members/individual/add/${res?.newId}`)),
    },
    {
      id: 'b',
      text: 'Ledgers',
      icon: RiNewspaperLine,
    },
    {
      id: 'c',
      text: 'Applications',
      icon: AiOutlineBarcode,
    },
    {
      id: 'd',
      text: 'List Pages',
      icon: AiOutlineUnorderedList,
    },
    {
      id: 'e',
      text: 'Items',
      icon: BsLockFill,
    },
    {
      id: 'f',
      text: 'Settings',
      icon: FiSettings,
    },
    {
      id: 'g',
      text: 'Ram Krishna',
      subText: 'Member Profile',
      icon: AiOutlineUser,
    },
    {
      id: 'h',
      text: 'Form Pages',
      icon: AiOutlineUserAdd,
    },
    {
      id: 'i',
      text: 'Reports',
      icon: AiFillInfoCircle,
    },
  ];
  const [characters, setCharacters] = useState(quickLinksList);

  const [openModal, setOpenModal] = useState(false);

  const onOpenModal = () => {
    setOpenModal(true);
  };

  const onCloseModal = () => {
    setOpenModal(false);
  };

  const handleOnDragEnd = async (result: DropResult) => {
    const items = Array.from(characters);
    const [reorderedItem] = items.splice(result.source.index, 1);

    if (result.destination) {
      items.splice(result.destination.index, 0, reorderedItem);
      setCharacters(items);
      // if (reorderedItem.id) {
      //   await moveOption({
      //     fieldId: reorderedItem.id,
      //     to: result.destination.index,
      //   });
      // }
    }
  };

  return (
    <Box height="fit-content" p="0" pb="55px">
      <Box display="flex" flexDir="column" gap="s8">
        <Box display="flex" justifyContent="space-between">
          <Text
            fontSize={'s3'}
            color="gray.600"
            fontWeight={'SemiBold'}
            textTransform={'uppercase'}
          >
            {t.quickLinks}
          </Text>
          <Button
            pb="0"
            variant="link"
            shade="neutral"
            onClick={() => {
              onOpenModal();
            }}
          >
            {t.editLinks}
          </Button>
        </Box>

        <Grid templateColumns="repeat(3,1fr)" columnGap="s16" rowGap="s8">
          {quickLinksList?.map((item, index) => (
            <GridItem key={index}>
              <QuickLinks
                icon={item.icon}
                text={item.text}
                subText={item.subText}
                onclick={item.onclick}
              />
            </GridItem>
          ))}
        </Grid>
      </Box>

      <ChakraModal
        open={openModal}
        onClose={onCloseModal}
        isCentered={true}
        title="editQuickLink"
        primaryButtonLabel="save"
        secondaryButtonLabel="cancel"
        size="5xl"
      >
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="characters">
            {(provided) => (
              <Grid
                templateColumns="repeat(3,1fr)"
                py="s16"
                columnGap="s16"
                rowGap="s8"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {characters?.map((item, index) => (
                  <Draggable
                    key={item?.id}
                    draggableId={item?.id}
                    index={index}
                  >
                    {(provided) => (
                      <Box
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <QuickLinks
                          // key={index}
                          editable={true}
                          icon={item.icon}
                          text={item.text}
                          subText={item.subText}
                          onclick={item.onclick}
                          editLinks
                        />
                      </Box>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </Grid>
            )}
          </Droppable>
        </DragDropContext>
      </ChakraModal>

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
                      <Text fontSize="20px" fontWeight="500" color="#006837">
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
                      <Text fontSize="20px" fontWeight="500" color="#FC814A">
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
