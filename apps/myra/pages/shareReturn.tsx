import { CloseIcon } from '@chakra-ui/icons';
import { Form, ShareReturnHistoryTable } from '@saccos/myra/components';
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
  Checkbox,
  TextFields,
} from '@saccos/myra/ui';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { GrPhone, GrLocation, GrMail } from 'react-icons/gr';

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
                    templateColumns="repeat(4,1fr)"
                  >
                    {/* <GridItem display="flex" alignSelf="center">
                      <Avatar
                        src="https://www.kindpng.com/picc/m/483-4834603_daniel-hudson-passport-size-photo-bangladesh-hd-png.png"
                        size="lg"
                        name="John Doe"
                        border="1px solid"
                        borderColor="gray.0"
                      />
                    </GridItem> */}

                    <GridItem display="flex">
                      <Avatar
                        src="https://www.kindpng.com/picc/m/483-4834603_daniel-hudson-passport-size-photo-bangladesh-hd-png.png"
                        size="lg"
                        name="John Doe"
                        border="1px solid"
                        borderColor="gray.0"
                        ml="10px"
                        mr="10px"
                      />
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
                          Membership Since: 2078/10/04
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

                    <GridItem>
                      <GrPhone color="primary.500" />
                      <TextFields variant="profileBody" fontSize="12px">
                        981234567
                      </TextFields>
                      <GrMail color="primary.500" />
                      <TextFields variant="profileBody" fontSize="12px">
                        ajitnepal65@gmail.com
                      </TextFields>
                      <GrLocation color="primary.500" />
                      <TextFields variant="profileBody" fontSize="12px">
                        Kathmandu, Tokha Municipality-10
                      </TextFields>
                    </GridItem>

                    <GridItem
                      display="flex"
                      justifyContent="center"
                      colSpan={2}
                    >
                      <Text
                        fontWeight="Medium"
                        color="primary.500"
                        fontSize="s2"
                      >
                        View Profile
                      </Text>
                    </GridItem>
                  </Grid>
                </Box>
                <br />

                <Box>
                  <Text
                    color="neutralColorLight.Gray-80"
                    fontWeight="SemiBold"
                    fontSize="r1"
                    ml="s24"
                  >
                    Share History
                  </Text>
                  <ShareReturnHistoryTable />
                </Box>

                {/* <Box p={2} bg="background.500">
                  <Grid templateColumns="repeat(2,1fr)" bg="red">
                    <GridItem colSpan={1}>
                      <Avatar
                        src="https://www.kindpng.com/picc/m/483-4834603_daniel-hudson-passport-size-photo-bangladesh-hd-png.png"
                        size="lg"
                        name="John Doe"
                        border="1px solid"
                        borderColor="gray.0"
                      />
                    </GridItem>
                  </Grid>
                  <Grid
                    display="flex"
                    templateColumns="repeat(4, 1fr)"
                    justifyContent="space-around"
                    alignContent="center"
                  >
                    <GridItem>
                      <Text
                        color="neutralColorLight.Gray-80"
                        fontWeight="Medium"
                        fontSize="r2"
                      >
                        Ajit Nepal
                      </Text>
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
                        Membership Since: 2078/10/04
                      </Text>

                      <Text
                        color="neutralColorLight.Gray-60"
                        fontWeight="Regular"
                        fontSize="s3"
                      >
                        Branch: Tokha
                      </Text>
                    </GridItem>

                    <GridItem>
                      <GrPhone color="primary.500" />
                      <Text fontSize="12px">981234567</Text>
                      <GrMail color="primary.500" />
                      <Text fontSize="12px">ajitnepal65@gmail.com</Text>
                      <GrLocation color="primary.500" />
                      <Text fontSize="12px">
                        Kathmandu, Tokha Municipality-10
                      </Text>
                    </GridItem>

                    <GridItem>
                      <Text
                        fontWeight="Medium"
                        color="primary.500"
                        fontSize="s2"
                      >
                        View Profile
                      </Text>
                    </GridItem>
                  </Grid>
                </Box> */}
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
                  <Grid templateRows="repeat(3,1fr)">
                    <GridItem>
                      <TextInput
                        id="noOfShares"
                        label="No of Shares to Return"
                        placeholder="No of Shares"
                      />
                    </GridItem>

                    <GridItem>
                      <Checkbox mt="5px">Select All Shares</Checkbox>
                    </GridItem>

                    <GridItem>
                      <Box
                        display="flex"
                        justifyContent="space-around"
                        borderRadius="br2"
                        p="s16"
                        bg="background.500"
                      >
                        <Box>
                          <Text>Remaining Share</Text>
                          <Text>20</Text>
                        </Box>

                        <Box>
                          <Text>Remaining Share Value </Text>
                          <Text>200</Text>
                        </Box>
                      </Box>
                    </GridItem>
                  </Grid>
                </GridItem>

                <GridItem>
                  <Box h="100%" borderRadius="br2" p="s16" bg="background.500">
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

ShareReturn.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default ShareReturn;
