import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { BsFillTelephoneFill } from 'react-icons/bs';
import { GrMail } from 'react-icons/gr';
import { IoLocationSharp } from 'react-icons/io5';
import { RiShareBoxFill } from 'react-icons/ri';
import { CloseIcon } from '@chakra-ui/icons';
import {
  Form,
  FormFooter,
  ShareReturnHistoryTable,
} from '@saccos/myra/components';
import { useGetMemberDataQuery } from '@saccos/myra/graphql';
import { IPurchaseFormValues } from '@saccos/myra/types';
import {
  Avatar,
  BaseSelect,
  Box,
  Checkbox,
  Container,
  Grid,
  GridItem,
  Icon,
  MainLayout,
  Navbar,
  SwitchTabs,
  TabMenu,
  Text,
  TextFields,
  TextInput,
  // Button,
} from '@saccos/myra/ui';

// TODO! use Layout
const Header = () => {
  return (
    <>
      <Navbar />
      <TabMenu />
    </>
  );
};

const accountList = ['Bank Voucher', 'Account', 'Cash'];

const ShareReturn = () => {
  const methods = useForm<IPurchaseFormValues>();
  const { getValues } = methods;
  const { data } = useGetMemberDataQuery({ id: '123123' });
  const [selectedTab, setSelectedTab] = useState<string | null>('Cash');

  const [memberIdQuery, setMemberIdQuery] = useState<string | null>('');
  const [noOfShares, setNoOfShares] = useState<number | null>();
  const [adminFees, setAdminFees] = useState<number | null>(34000.0);
  const [printingFees, setPrintingFees] = useState<number | null>(540.0);
  const [allShare, setAllShare] = useState<boolean>(false);

  const switchTabsFxn = (datas: string) => {
    setSelectedTab(datas);
  };

  console.log(selectedTab);

  return (
    <Form<IPurchaseFormValues>
      methods={methods}
      onChange={() => {
        console.log('getValues', getValues());
      }}
      onSubmit={(datasss) => {
        console.log('datasss', datasss);
      }}
    >
      <Box
        position="fixed"
        width="100%"
        top={0}
        zIndex={2}
        backdropFilter="saturate(180%) blur(5px)"
      >
        <Header />
      </Box>
      <Container
        minW="container.xl"
        height="fit-content"
        mt="130"
        p="0"
        pb="55px"
      >
        <Box
          height="60px"
          display="flex"
          justifyContent="space-between"
          alignItems={'center'}
          px="5"
          background="white"
          borderBottom="1px solid #E6E6E6"
          borderTopRadius={5}
        >
          <Text fontSize="r2" fontWeight="600">
            New Share Return
          </Text>
          <CloseIcon />
        </Box>
        <Box display="flex" width="100%">
          <Box w="100%">
            <Box background="white" p={5} borderBottom="1px solid #E6E6E6">
              <TextInput
                w="50%"
                label=" Member ID"
                placeholder="Enter Member ID"
                onChange={(e) => setMemberIdQuery(e.target.value)}
              />

              <br />
              <br />

              {memberIdQuery && (
                <Box
                  border="1px solid"
                  borderColor="border.layout"
                  borderTopLeftRadius="br2"
                  borderTopRightRadius="br2"
                >
                  <Box p={2} bg="background.500">
                    <Grid
                      templateRows="repeat(1,1fr)"
                      templateColumns="repeat(5,1fr)"
                      gap={2}
                    >
                      <GridItem display="flex" alignSelf="center" colSpan={2}>
                        <Box m="10px">
                          <Avatar
                            src="https://www.kindpng.com/picc/m/483-4834603_daniel-hudson-passport-size-photo-bangladesh-hd-png.png"
                            size="lg"
                            name={
                              data?.members?.individual?.get?.data?.member
                                ?.personalInformation?.name?.firstName
                            }
                          />
                        </Box>
                        <Box>
                          <TextFields
                            color="neutralColorLight.Gray-80"
                            variant="profileHeader"
                          >
                            {
                              data?.members?.individual?.get?.data?.member
                                ?.personalInformation?.name?.firstName
                            }{' '}
                            {
                              data?.members?.individual?.get?.data?.member
                                ?.personalInformation?.name?.middleName
                            }{' '}
                            {
                              data?.members?.individual?.get?.data?.member
                                ?.personalInformation?.name?.lastName
                            }
                          </TextFields>
                          <Text
                            color="neutralColorLight.Gray-80"
                            fontSize="s3"
                            fontWeight="Regular"
                          >
                            ID:{' '}
                            {
                              data?.members?.individual?.get?.data?.member
                                ?.personalInformation?.panNumber
                            }
                          </Text>

                          <Text
                            color="neutralColorLight.Gray-60"
                            fontWeight="Regular"
                            fontSize="s3"
                          >
                            Member Since:{' '}
                            {
                              data?.members?.individual?.get?.data?.member
                                ?.personalInformation?.dateOfBirth
                            }
                          </Text>

                          <Text
                            color="neutralColorLight.Gray-60"
                            fontWeight="Regular"
                            fontSize="s3"
                          >
                            Branch:{' '}
                            {
                              data?.members?.individual?.get?.data?.member
                                ?.address?.temporary?.state
                            }
                          </Text>
                        </Box>
                      </GridItem>

                      <GridItem
                        display="flex"
                        flexDirection="column"
                        alignSelf="center"
                        colSpan={2}
                        gap={3}
                      >
                        <Box display="flex">
                          <Icon
                            size="sm"
                            as={BsFillTelephoneFill}
                            color="primary.500"
                          />
                          <TextFields
                            ml="10px"
                            variant="profileBody"
                            fontSize="12px"
                          >
                            {
                              data?.members?.individual?.get?.data?.member
                                ?.contact?.mobile
                            }
                          </TextFields>
                        </Box>

                        <Box display="flex">
                          <Icon size="sm" as={GrMail} color="primary.500" />
                          <TextFields
                            ml="10px"
                            variant="profileBody"
                            fontSize="12px"
                          >
                            ajitnepal65@gmail.com
                          </TextFields>
                        </Box>

                        <Box display="flex">
                          <Icon
                            size="sm"
                            as={IoLocationSharp}
                            color="primary.500"
                          />
                          <TextFields
                            ml="10px"
                            variant="profileBody"
                            fontSize="12px"
                          >
                            {
                              data?.members?.individual?.get?.data?.member
                                ?.address?.permanent?.district
                            }
                            {','}
                            {
                              data?.members?.individual?.get?.data?.member
                                ?.address?.permanent?.state
                            }
                          </TextFields>
                        </Box>
                      </GridItem>

                      <GridItem display="flex" justifyContent="center">
                        {/* <Button variant="link"> */}
                        <Text
                          fontWeight="Medium"
                          color="primary.500"
                          fontSize="s2"
                          mr="5px"
                        >
                          View Profile
                        </Text>
                        {/* </Button> */}
                        <Icon
                          size="sm"
                          as={RiShareBoxFill}
                          color="primary.500"
                        />
                      </GridItem>
                    </Grid>
                  </Box>
                  <br />

                  <Box p="2px">
                    <Text
                      color="neutralColorLight.Gray-80"
                      fontWeight="SemiBold"
                      fontSize="r1"
                      ml="s24"
                    >
                      Share History
                    </Text>
                    <ShareReturnHistoryTable memberId={memberIdQuery} />
                  </Box>
                </Box>
              )}
            </Box>

            <Box
              display="flex"
              flexDirection="column"
              p="5"
              background="white"
              borderBottom="1px solid #E6E6E6"
              borderTopRadius={5}
            >
              <TextFields variant="tableHeader">Share Information</TextFields>
              <br />

              <Grid gap={5} templateColumns="repeat(2,1fr)">
                <GridItem>
                  <Grid
                    templateRows={
                      noOfShares ? 'repeat(3,1fr)' : 'repeat(2,0fr)'
                    }
                    gap={1}
                  >
                    <GridItem>
                      <TextInput
                        id="noOfShares"
                        label="No of Shares to Return"
                        placeholder="No of Shares"
                        onChange={(e) => setNoOfShares(Number(e.target.value))}
                      />
                    </GridItem>

                    <GridItem>
                      <Checkbox
                        onChange={() => setAllShare(!allShare)}
                        mt="20px"
                      >
                        Select All Shares
                      </Checkbox>
                    </GridItem>
                    {noOfShares ? (
                      <GridItem>
                        <Box
                          display="flex"
                          justifyContent="space-around"
                          borderRadius="br2"
                          p="s16"
                          bg="background.500"
                        >
                          <Box>
                            <TextFields>Remaining Share</TextFields>
                            <TextFields>{allShare ? 0 : 20}</TextFields>
                          </Box>

                          <Box>
                            <TextFields>Remaining Share Value </TextFields>
                            <TextFields>{allShare ? 0 : 2000}</TextFields>
                          </Box>
                        </Box>
                      </GridItem>
                    ) : null}
                  </Grid>
                </GridItem>

                {noOfShares ? (
                  <GridItem>
                    <Box
                      h="100%"
                      borderRadius="br2"
                      p="s16"
                      bg="background.500"
                    >
                      <Grid templateRows="repeat(4,1fr)">
                        <GridItem>
                          <Box display="flex" justifyContent="space-between">
                            <TextFields
                              color="neutralLightColor.Gray-60"
                              fontWeight="Medium"
                              fontSize="s3"
                            >
                              Withdraw Amount
                            </TextFields>

                            <Text
                              color="neutralLightColor.Gray-80"
                              fontWeight="SemiBold"
                              fontSize="r1"
                            >
                              {noOfShares * 1000}
                            </Text>
                          </Box>
                        </GridItem>

                        <GridItem>
                          <Box
                            mb="10px"
                            display="flex"
                            justifyContent="space-between"
                          >
                            <TextFields
                              color="neutralLightColor.Gray-60"
                              fontWeight="Medium"
                              fontSize="s3"
                            >
                              Administration Fees
                            </TextFields>
                            <TextInput
                              w="50%"
                              id="administrationFees"
                              label=""
                              placeholder="34000.00"
                              bg="gray.0"
                              textAlign="right"
                              onChange={(e) =>
                                setAdminFees(Number(e.target.value))
                              }
                            />
                          </Box>
                        </GridItem>

                        <GridItem>
                          <Box display="flex" justifyContent="space-between">
                            <TextFields
                              color="neutralLightColor.Gray-60"
                              fontWeight="Medium"
                              fontSize="s3"
                            >
                              Printing Fees
                            </TextFields>
                            <TextInput
                              w="50%"
                              id="printingFees"
                              label=""
                              placeholder="54.00"
                              bg="gray.0"
                              textAlign="right"
                              onChange={(e) =>
                                setPrintingFees(Number(e.target.value))
                              }
                            />
                          </Box>
                        </GridItem>

                        <GridItem>
                          <Box display="flex" justifyContent="space-between">
                            <TextFields
                              color="neutralLightColor.Gray-80"
                              fontWeight="SemiBold"
                              fontSize="s3"
                            >
                              Total Amount
                            </TextFields>

                            <TextFields
                              color="neutralLightColor.Gray-80"
                              fontWeight="SemiBold"
                              fontSize="r1"
                            >
                              {noOfShares * 1000 + adminFees + printingFees}
                            </TextFields>
                          </Box>
                        </GridItem>
                      </Grid>
                    </Box>
                  </GridItem>
                ) : null}
              </Grid>
            </Box>

            <Box background="white" p={5} borderBottom="1px solid #E6E6E6">
              <Text
                color="neutralColorLight.Gray-60"
                fontSize="r2"
                fontWeight="SemiBold"
                mb="8px"
              >
                Payment Information
              </Text>
              <Text
                color="neutralColorLight.Gray-60"
                fontSize="s3"
                fontWeight="Medium"
                mb="8px"
              >
                Payment Mode
              </Text>

              <br />

              <SwitchTabs onclick={switchTabsFxn} list={accountList} />

              <br />
              <Text>Select Account</Text>
              <BaseSelect
                w="25%"
                placeholder="Select Account"
                options={[
                  {
                    label: 'Option 1',
                    value: 'option-1',
                  },
                  {
                    label: 'Option 2',
                    value: 'option-2',
                  },
                  {
                    label: 'Option 3',
                    value: 'option-3',
                  },
                ]}
                variant="outline"
              />
              <br />
              <Box p={2} w="25%" bg="background.500">
                <Text>Available balance</Text>
                <Text
                  fontWeight="SemiBold"
                  fontSize="r1"
                  color="neutralColorLight.Gray-70"
                >
                  Rs. 12,342
                </Text>
              </Box>
            </Box>
          </Box>
        </Box>
        <br />
      </Container>
      <Container minW="container.md" height="fit-content" p="0">
        <FormFooter />
      </Container>
    </Form>
  );
};

ShareReturn.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default ShareReturn;
