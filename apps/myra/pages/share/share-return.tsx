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
} from '@coop/myra/components';
import { useGetMemberDataQuery } from '@coop/myra/graphql';
import { IPurchaseFormValues } from '@coop/myra/types';
import {
  Avatar,
  Box,
  Checkbox,
  Container,
  Grid,
  GridItem,
  Icon,
  MainLayout,
  Navbar,
  Select,
  SwitchTabs,
  TabMenu,
  Text,
  TextFields,
  TextInput,
} from '@coop/myra/ui';
import { useRouter } from 'next/router';

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
  const router = useRouter();
  const methods = useForm<IPurchaseFormValues>();
  const { getValues } = methods;

  const [selectedTab, setSelectedTab] = useState<string | null>('Bank Voucher');
  const [memberIdQuery, setMemberIdQuery] = useState<string | null>('');
  const [noOfShares, setNoOfShares] = useState<number | null>();
  const [adminFees, setAdminFees] = useState<number | null>(34000.0);
  const [printingFees, setPrintingFees] = useState<number | null>(540.0);
  const [allShare, setAllShare] = useState<boolean>(false);

  const { data: memberData } = useGetMemberDataQuery({
    id: memberIdQuery ? memberIdQuery : null,
  });
  const data = memberData?.members?.individual?.get?.data?.member;

  const switchTabsFxn = (datas: string) => {
    setSelectedTab(datas);
  };

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
          <CloseIcon cursor="pointer" onClick={() => router.back()} />
        </Box>
        <Box display="flex" width="100%">
          <Box w="100%">
            <Box background="white" p={5} borderBottom="1px solid #E6E6E6">
              <TextInput
                w="50%"
                label=" Member Search"
                placeholder="Enter Member ID"
                onChange={(e) => setMemberIdQuery(e.target.value)}
              />

              <br />
              <br />

              {data && (
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
                            name={data?.personalInformation?.name?.firstName}
                          />
                        </Box>
                        <Box>
                          <TextFields
                            color="neutralColorLight.Gray-80"
                            variant="profileHeader"
                          >
                            {data?.personalInformation?.name?.firstName}{' '}
                            {data?.personalInformation?.name?.middleName}{' '}
                            {data?.personalInformation?.name?.lastName}
                          </TextFields>
                          <Text
                            color="neutralColorLight.Gray-80"
                            fontSize="s3"
                            fontWeight="Regular"
                          >
                            ID: {data?.personalInformation?.panNumber}
                          </Text>

                          <Text
                            color="neutralColorLight.Gray-60"
                            fontWeight="Regular"
                            fontSize="s3"
                          >
                            Member Since:{' '}
                            {data?.personalInformation?.dateOfBirth}
                          </Text>

                          <Text
                            color="neutralColorLight.Gray-60"
                            fontWeight="Regular"
                            fontSize="s3"
                          >
                            Branch: {data?.address?.temporary?.state}
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
                            {data?.contact?.mobile}
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
                            {data?.address?.permanent?.district}
                            {','}
                            {data?.address?.permanent?.state}
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
                    <ShareReturnHistoryTable id={memberIdQuery} />
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

              <Grid mt="20px" gap={5} templateColumns="repeat(2,1fr)">
                <GridItem>
                  <Grid
                    templateRows={
                      noOfShares ? 'repeat(3,1fr)' : 'repeat(2,0fr)'
                    }
                    gap={3}
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
                          borderRadius="br2"
                          gap="s60"
                          p="s16"
                          bg="background.500"
                        >
                          <Box>
                            <Text fontWeight="400" fontSize="s2">
                              Remaining Share
                            </Text>
                            <Text fontWeight="600" fontSize="r1">
                              {allShare ? 0 : 20}
                            </Text>
                          </Box>

                          <Box>
                            <Text fontWeight="400" fontSize="s2">
                              Remaining Share Value
                            </Text>
                            <Text fontWeight="600" fontSize="r1">
                              {' '}
                              {allShare ? 0 : 2000}
                            </Text>
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
                            <Text
                              color="neutralLightColor.Gray-60"
                              fontWeight="Medium"
                              fontSize="s3"
                            >
                              Withdraw Amount
                            </Text>

                            <Text
                              color="neutralLightColor.Gray-80"
                              fontWeight="SemiBold"
                              fontSize="r1"
                            >
                              Rs. {noOfShares * 100}
                            </Text>
                          </Box>
                        </GridItem>

                        <GridItem>
                          <Box
                            mb="10px"
                            display="flex"
                            justifyContent="space-between"
                          >
                            <Text
                              color="neutralLightColor.Gray-60"
                              fontWeight="Medium"
                              fontSize="s3"
                              display="flex"
                              alignItems="center"
                            >
                              Administration Fees
                            </Text>
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
                            <Text
                              color="neutralLightColor.Gray-60"
                              fontWeight="Medium"
                              fontSize="s3"
                              display="flex"
                              alignItems="center"
                            >
                              Printing Fees
                            </Text>
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

                        <GridItem mt="22px">
                          <Box display="flex" justifyContent="space-between">
                            <Text
                              color="neutralLightColor.Gray-80"
                              fontWeight="600"
                              fontSize="s3"
                            >
                              Total Amount
                            </Text>

                            <Text
                              color="neutralLightColor.Gray-80"
                              fontWeight="SemiBold"
                              fontSize="r1"
                            >
                              Rs. {noOfShares * 1000 + adminFees + printingFees}
                            </Text>
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
                fontWeight="600"
                mb="8px"
              >
                Payment Information
              </Text>
              <Text
                color="neutralColorLight.Gray-60"
                fontSize="s3"
                fontWeight="500"
                mb="8px"
              >
                Payment Mode
              </Text>

              <br />

              <SwitchTabs
                onclick={switchTabsFxn}
                list={accountList.map((value) => ({
                  key: value,
                  value: value,
                }))}
              />

              <br />
              {selectedTab === 'Account' && (
                <Box w="25%" display="flex" flexDirection="column" gap="s16">
                  <Select
                    label="Select Account"
                    placeholder="Saving Account"
                    options={[
                      {
                        label: 'Nabil Bank',
                        value: 'option-1',
                      },
                      {
                        label: 'Civil Bank',
                        value: 'option-2',
                      },
                      {
                        label: 'Sky Bank',
                        value: 'option-3',
                      },
                    ]}
                  />
                  <Box
                    px="s16"
                    py="s8"
                    bg="background.500"
                    color="neutralColorLight.Gray-70"
                  >
                    <Text fontWeight="400" fontSize="s2">
                      Available balance
                    </Text>
                    <Text fontWeight="600" fontSize="r1">
                      Rs. 12,342
                    </Text>
                  </Box>
                </Box>
              )}
              {selectedTab === 'Bank Voucher' && (
                <Box w="25%" display="flex" flexDirection="column" gap="s16">
                  <Select
                    label="Select Bank"
                    placeholder="Select Bank"
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
                  />
                  <Box>
                    <TextInput
                      type="text"
                      name="name"
                      placeholder="Enter Voucher Number"
                      label="Enter Voucher Number"
                    />
                  </Box>
                </Box>
              )}

              {selectedTab === 'Cash' && (
                <Box w="25%">
                  <TextInput
                    type="text"
                    name="name"
                    placeholder="Enter Cash Amount"
                    label="Enter Cash Amount"
                  />
                </Box>
              )}
            </Box>
          </Box>
        </Box>
        <br />
      </Container>
      <Container minW="container.md" height="fit-content" p="0">
        <FormFooter onClick={() => router.push('/share/balance')} />
      </Container>
    </Form>
  );
};

ShareReturn.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default ShareReturn;
