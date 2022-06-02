import { CloseIcon } from '@chakra-ui/icons';
import { Form, SharePurchaseHistoryTable } from '@saccos/myra/components';
import { IPurchaseFormValues } from '@saccos/myra/types';
import {
  Avatar,
  BaseSelect,
  Box,
  Container,
  Grid,
  GridItem,
  MainLayout,
  Navbar,
  TabMenu,
  Text,
  SwitchTabs,
  TextInput,
  TextFields,
  Icon,
} from '@saccos/myra/ui';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { GrMail, GrShare } from 'react-icons/gr';
import { BsFillTelephoneFill } from 'react-icons/bs';
import { IoLocationSharp } from 'react-icons/io5';
import { RiShareBoxFill } from 'react-icons/ri';

const Header = () => {
  return (
    <>
      <Navbar />
      <TabMenu />
    </>
  );
};

const accountList = ['Bank Voucher', 'Account', 'Cash'];

const SharePurchase = () => {
  const methods = useForm<IPurchaseFormValues>();
  const { getValues } = methods;
  const [selectedTab, setSelectedTab] = useState<string | null>('Cash');

  const switchTabsFxn = (data: string) => {
    setSelectedTab(data);
  };

  console.log(selectedTab);

  return (
    <Form<IPurchaseFormValues>
      methods={methods}
      onChange={() => {
        console.log('getValues', getValues());
      }}
      onSubmit={(data) => {
        console.log('data', data);
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
        minW="container.md"
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
            New Share Purchase
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
              />

              <br />
              <br />

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
                          name="Ajit Nepal"
                        />
                      </Box>
                      <Box>
                        <TextFields
                          color="neutralColorLight.Gray-80"
                          variant="profileHeader"
                        >
                          Ajit Nepal
                        </TextFields>
                        <Text
                          color="neutralColorLight.Gray-80"
                          fontSize="s3"
                          fontWeight="Regular"
                        >
                          ID: 23524364456
                        </Text>

                        <Text
                          color="neutralColorLight.Gray-60"
                          fontWeight="Regular"
                          fontSize="s3"
                        >
                          Member Since: 2078/10/04
                        </Text>

                        <Text
                          color="neutralColorLight.Gray-60"
                          fontWeight="Regular"
                          fontSize="s3"
                        >
                          Branch: Tokha
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
                          981234567
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
                          Kathmandu, Tokha Municipality-10
                        </TextFields>
                      </Box>
                    </GridItem>

                    <GridItem display="flex" justifyContent="center">
                      <Text
                        fontWeight="Medium"
                        color="primary.500"
                        fontSize="s2"
                        mr="5px"
                      >
                        View Profile
                      </Text>
                      <Icon size="sm" as={RiShareBoxFill} color="primary.500" />
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
                  <SharePurchaseHistoryTable />
                </Box>
              </Box>
            </Box>

            <Box
              display="flex"
              flexDirection="column"
              p="5"
              background="white"
              borderBottom="1px solid #E6E6E6"
              borderTopRadius={5}
            >
              <Text>Share Information</Text>
              <br />

              <Grid gap={5} templateColumns="repeat(2,1fr)">
                <GridItem>
                  <TextInput
                    id="noOfShares"
                    label="No of Shares"
                    placeholder="No of Shares"
                  />
                </GridItem>
                <GridItem>
                  <Box borderRadius="br2" p="s16" bg="background.500">
                    <Grid templateRows="repeat(4,1fr)">
                      <GridItem>
                        <Box display="flex" justifyContent="space-between">
                          <Text
                            color="neutralLightColor.Gray-60"
                            fontWeight="Medium"
                            fontSize="s3"
                          >
                            Share Amount
                          </Text>

                          <Text
                            color="neutralLightColor.Gray-80"
                            fontWeight="SemiBold"
                            fontSize="r1"
                          >
                            25,000.00
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
                          />
                        </Box>
                      </GridItem>

                      <GridItem>
                        <Box display="flex" justifyContent="space-between">
                          <Text
                            color="neutralLightColor.Gray-60"
                            fontWeight="Medium"
                            fontSize="s3"
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
                          />
                        </Box>
                      </GridItem>

                      <GridItem>
                        <Box display="flex" justifyContent="space-between">
                          <Text
                            color="neutralLightColor.Gray-80"
                            fontWeight="SemiBold"
                            fontSize="s3"
                          >
                            Total Amount
                          </Text>

                          <Text
                            color="neutralLightColor.Gray-80"
                            fontWeight="SemiBold"
                            fontSize="r1"
                          >
                            25,000.00
                          </Text>
                        </Box>
                      </GridItem>
                    </Grid>
                  </Box>
                </GridItem>
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
    </Form>
  );
};

SharePurchase.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default SharePurchase;
