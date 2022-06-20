import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { CloseIcon } from '@chakra-ui/icons';

import { Form, FormFooter } from '@coop/myra/components';
import { IPurchaseFormValues } from '@coop/myra/types';
import {
  Payment_Mode,
  ShareReturnInput,
  useSetShareReturnMutation,
} from '@coop/shared/data-access';
import { FormCheckbox, FormInput, FormSelect } from '@coop/shared/form';
import {
  Box,
  Container,
  Grid,
  GridItem,
  MainLayout,
  Navbar,
  Select,
  SwitchTabs,
  TabMenu,
  Text,
  TextInput,
} from '@coop/shared/ui';

// TODO! use Layout
const Header = () => {
  return (
    <>
      <Navbar />
      <TabMenu />
    </>
  );
};

const accountList = [
  { label: 'Bank Voucher', value: Payment_Mode.BankVoucher },
  { label: 'Account', value: Payment_Mode.Account },
  { label: 'Cash', value: Payment_Mode.Cash },
];

const ShareReturn = () => {
  const router = useRouter();
  const { mutate } = useSetShareReturnMutation();
  const methods = useForm<ShareReturnInput>();
  const { getValues, watch } = methods;

  const memberIdQuery = watch('memberId');
  const noOfShares = watch('noOfReturnedShares');
  const allShares = watch('selectAllShares');

  const [selectedPaymentMode, setSelectedPaymentMode] = useState<Payment_Mode>(
    Payment_Mode.BankVoucher
  );
  const [adminFees, setAdminFees] = useState(34000.0);
  const [printingFees, setPrintingFees] = useState(540.0);

  // const { data: memberData } = useGetMemberDataQuery({
  //   id: memberIdQuery ? memberIdQuery : null,
  // });
  // const data = memberData?.members?.individual?.get?.data?.member;

  const switchTabsFxn = (datas: Payment_Mode) => {
    setSelectedPaymentMode(datas);
  };

  const submitForm = () => {
    const formData = {
      ...getValues(),
      paymentMode: selectedPaymentMode,
    };
    mutate({ id: '12', data: formData });
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
      <Container minW="container.xl" height="fit-content">
        <Box
          height="60px"
          display="flex"
          justifyContent="space-between"
          alignItems={'center'}
          px="5"
          background="white"
          borderBottom="1px solid #E6E6E6"
        >
          <Text fontSize="r2" fontWeight="600">
            New Share Return
          </Text>
          <CloseIcon cursor="pointer" onClick={() => router.back()} />
        </Box>
        <Box display="flex" width="100%">
          <Box w="100%">
            <Box background="white" borderBottom="1px solid #E6E6E6" p={5}>
              <FormInput
                mb="20px"
                w="50%"
                name="memberId"
                label=" Select Member"
                placeholder="Enter Member ID"
              />

              {/*  {data && (
                <Box
                  mt="s16"
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
                      mt="s20"
                      mb="s20"
                      ml="s16"
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
                            fontWeight="Medium"
                            fontSize="s3"
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
                            color="neutralColorLight.Gray-80"
                            fontSize="s3"
                            fontWeight="Regular"
                          >
                            {data?.contact?.mobile}
                          </TextFields>
                        </Box>

                        <Box display="flex">
                          <Icon size="sm" as={GrMail} color="primary.500" />
                          <TextFields
                            ml="10px"
                            color="neutralColorLight.Gray-80"
                            fontSize="s3"
                            fontWeight="Regular"
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
                            color="neutralColorLight.Gray-80"
                            fontSize="s3"
                            fontWeight="Regular"
                          >
                            {data?.address?.permanent?.district}
                            {','}
                            {data?.address?.permanent?.state}
                          </TextFields>
                        </Box>
                      </GridItem>

                      <GridItem
                        display="flex"
                        justifyContent="flex-end"
                        mr="s32"
                      >
                        <Text
                          fontWeight="Medium"
                          color="primary.500"
                          fontSize="s2"
                          mr="5px"
                        >
                          View Profile
                        </Text>
                        <Icon
                          size="sm"
                          as={RiShareBoxFill}
                          color="primary.500"
                        />
                      </GridItem>
                    </Grid>
                  </Box>

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
              )}*/}
            </Box>

            <Box
              display="flex"
              flexDirection="column"
              p="5"
              pb="28px"
              background="white"
              borderBottom="1px solid #E6E6E6"
              borderTopRadius={5}
            >
              <Text
                fontWeight="SemiBold"
                fontSize="r1"
                color="neutralColorLight.Gray-60"
              >
                Share Information
              </Text>

              <Grid mt="s16" gap={5} templateColumns="repeat(2,1fr)">
                <GridItem>
                  <Grid
                    templateRows={
                      noOfShares ? 'repeat(3,1fr)' : 'repeat(2,0fr)'
                    }
                    gap={3}
                  >
                    <GridItem>
                      <FormInput
                        id="noOfShares"
                        name="noOfReturnedShares"
                        label="No of Shares"
                        placeholder="No of Shares"
                      />
                    </GridItem>

                    <GridItem>
                      <FormCheckbox
                        name="selectAllShares"
                        label="Select All Shares"
                        mt="20px"
                      />
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
                              {allShares ? 0 : 20}
                            </Text>
                          </Box>

                          <Box>
                            <Text fontWeight="400" fontSize="s2">
                              Remaining Share Value
                            </Text>
                            <Text fontWeight="600" fontSize="r1">
                              {' '}
                              {allShares ? 0 : 2000}
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
                              {noOfShares * 100}
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
                            <FormInput
                              name="extraFee"
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

                        {/* todo */}
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
                            <FormInput
                              name="extraFee"
                              id="administrationFees"
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
                mb="s16"
              >
                Payment Mode
              </Text>
              <SwitchTabs
                onClick={switchTabsFxn}
                list={accountList.map((value) => ({
                  label: value.label,
                  value: value.value,
                }))}
              />

              {selectedPaymentMode === Payment_Mode.Account && (
                <Box
                  mt="s16"
                  mb="s16"
                  w="25%"
                  display="flex"
                  flexDirection="column"
                  gap="s16"
                >
                  <Select
                    name="accountId"
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
                    mt="s16"
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
              {selectedPaymentMode === Payment_Mode.BankVoucher && (
                <Box
                  mt="s16"
                  mb="s16"
                  w="25%"
                  display="flex"
                  flexDirection="column"
                  gap="s16"
                >
                  <FormSelect
                    name="bankId"
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
                    <FormInput
                      type="text"
                      name="voucherNumber"
                      placeholder="Enter Voucher Number"
                      label="Enter Voucher Number"
                    />
                  </Box>
                </Box>
              )}

              {selectedPaymentMode === Payment_Mode.Cash && (
                <Box mt="s16" mb="s16" w="25%">
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
        <Box position="relative" width="100%">
          <FormFooter onClick={submitForm} />
        </Box>
      </Container>
    </Form>
  );
};

ShareReturn.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default ShareReturn;
