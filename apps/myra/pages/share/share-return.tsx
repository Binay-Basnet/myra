import React from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { CloseIcon } from '@chakra-ui/icons';

import { Form, FormFooter } from '@coop/myra/components';
import { FieldCardComponents } from '@coop/shared/components';
import {
  Payment_Mode,
  ShareReturnInput,
  useAddShareReturnMutation,
} from '@coop/shared/data-access';
import {
  FormCheckbox,
  FormInput,
  FormSelect,
  FormSwitchTab,
} from '@coop/shared/form';
import {
  Box,
  Container,
  Grid,
  GridItem,
  MainLayout,
  Navbar,
  TabMenu,
  Text,
  TextInput,
} from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

// TODO! use Layout
const Header = () => {
  return (
    <>
      <Navbar />
      <TabMenu />
    </>
  );
};

const ShareReturn = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const { mutate } = useAddShareReturnMutation();
  // TODO! CHANGE THIS ANY
  const methods = useForm<any>();
  const { getValues, watch } = methods;

  const accountList = [
    { label: t['sharePurchaseBankVoucher'], value: Payment_Mode.BankVoucher },
    { label: t['sharePurchaseAccount'], value: Payment_Mode.Account },
    { label: t['sharePurchaseCash'], value: Payment_Mode.Cash },
  ];

  // const memberIdQuery = watch('memberId');
  const noOfShares = watch('noOfReturnedShares');
  const allShares = watch('selectAllShares');
  const printingFees = watch('printingFee');
  const adminFees = watch('adminFee');
  const paymentModes = watch('paymentMode');

  // const { data: memberData } = useGetMemberDataQuery({
  //   id: memberIdQuery ? memberIdQuery : null,
  // });
  // const data = memberData?.members?.individual?.get?.data?.member;

  const submitForm = () => {
    const {
      memberId,
      selectAllShares,
      noOfReturnedShares,
      withdrawAmount,
      totalAmount,
      // remainingShare,
      // remainingShareValue,
      bankId,
      voucherNumber,
      accountId,
      paymentMode,
    } = getValues();

    const formData = {
      memberId,
      selectAllShares,
      noOfReturnedShares: Number(noOfReturnedShares),
      withdrawAmount,
      extraFee: [
        { name: 'Administration fee', value: Number(adminFees) },
        { name: 'Printing fee', value: Number(printingFees) },
        { name: 'Others', value: 10 },
      ],
      totalAmount,
      remainingShare: 29,
      remainingShareValue: 200,
      paymentMode,
      bankId,
      voucherNumber,
      accountId,
    };
    console.log(formData);
    mutate({ id: '12', data: formData });
  };

  return (
    <Form<ShareReturnInput>
      methods={methods}
      onChange={() => {
        console.log('getValues', getValues());
      }}
      onSubmit={(datasss) => {
        console.log('datasss', datasss);
      }}
    >
      <form>
        <Box
          position="fixed"
          width="100%"
          top={0}
          zIndex={2}
          backdropFilter="saturate(180%) blur(5px)"
        >
          <Header />
        </Box>
        <Container minW="container.xl" p="0">
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
              {t['shareReturnNewShareReturn']}
            </Text>
            <CloseIcon cursor="pointer" onClick={() => router.back()} />
          </Box>
          <Box mb="50px" display="flex" width="100%">
            <Box w="100%" minHeight="100vh">
              <Box background="white" borderBottom="1px solid #E6E6E6" p={5}>
                <Box w="50%">
                  <FormSelect
                    // rightElement={
                    //   <Icon as={IoSearch} color="gray.500" fontSize={'s3'} />
                    // }
                    name="memberId"
                    label={t['sharePurchaseSelectMember']}
                    placeholder={t['sharePurchaseEnterMemberID']}
                    options={[
                      {
                        label: '1',
                        value: '1',
                      },
                      {
                        label: '2',
                        value: '2',
                      },
                      {
                        label: '3',
                        value: '3',
                      },
                    ]}
                  />
                </Box>

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
                            {t['shareReturnID']}: {data?.personalInformation?.panNumber}
                          </Text>

                          <Text
                            color="neutralColorLight.Gray-60"
                            fontWeight="Regular"
                            fontSize="s3"
                          >
                            {t['shareReturnMemberSince']}:{' '}
                            {data?.personalInformation?.dateOfBirth}
                          </Text>

                          <Text
                            color="neutralColorLight.Gray-60"
                            fontWeight="Regular"
                            fontSize="s3"
                          >
                            {t['shareReturnBranch']}: {data?.address?.temporary?.state}
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
                          {t['shareReturnViewProfile']}
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
                      {t['shareReturnShareHistory']}
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
                  {t['shareReturnShareInformation']}
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
                          label={t['shareReturnNoOfShares']}
                          placeholder={t['shareReturnNoOfShares']}
                        />
                      </GridItem>

                      <GridItem>
                        <FormCheckbox
                          name="selectAllShares"
                          label={t['shareReturnSelectAllShares']}
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
                                {t['shareReturnRemainingShare']}
                              </Text>
                              <Text fontWeight="600" fontSize="r1">
                                {allShares ? 0 : 20}
                              </Text>
                            </Box>

                            <Box>
                              <Text fontWeight="400" fontSize="s2">
                                {t['shareReturnRemainingShareValue']}
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
                    <FieldCardComponents rows={'repeat(4,1fr)'}>
                      <GridItem
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Text
                          color="neutralLightColor.Gray-60"
                          fontWeight="Medium"
                          fontSize="s3"
                        >
                          {t['shareReturnWithdrawAmount']}
                        </Text>

                        <Box p="s12">
                          <Text
                            color="neutralLightColor.Gray-80"
                            fontWeight="SemiBold"
                            fontSize="r1"
                          >
                            {noOfShares * 100}
                          </Text>
                        </Box>
                      </GridItem>

                      <GridItem
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Text
                          color="neutralLightColor.Gray-60"
                          fontWeight="Medium"
                          fontSize="s3"
                        >
                          {t['shareReturnAdministrationFees']}
                        </Text>
                        <Box width="300px">
                          <FormInput
                            name="adminFee"
                            label=""
                            placeholder="34000.00"
                            textAlign="right"
                            bg="gray.0"
                          />
                        </Box>
                      </GridItem>

                      {/* todo */}
                      <GridItem
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Text
                          color="neutralLightColor.Gray-60"
                          fontWeight="Medium"
                          fontSize="s3"
                        >
                          {t['shareReturnPrintingFees']}
                        </Text>
                        <Box width="300px">
                          <FormInput
                            name="printingFee"
                            label=""
                            placeholder="54.00"
                            bg="gray.0"
                            textAlign="right"
                          />
                        </Box>
                      </GridItem>

                      <GridItem
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Text
                          color="neutralLightColor.Gray-80"
                          fontWeight="600"
                          fontSize="s3"
                        >
                          {t['shareReturnTotalAmount']}
                        </Text>

                        <Box p="s12">
                          <Text
                            color="neutralLightColor.Gray-80"
                            fontWeight="SemiBold"
                            fontSize="r1"
                          >
                            {t['rs']}{' '}
                            {adminFees && printingFees
                              ? noOfShares * 1000 +
                                Number(adminFees) +
                                Number(printingFees)
                              : 0.0}
                          </Text>
                        </Box>
                      </GridItem>
                    </FieldCardComponents>
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
                  {t['shareReturnPaymentInformation']}
                </Text>
                <Text
                  color="neutralColorLight.Gray-60"
                  fontSize="s3"
                  fontWeight="500"
                  mb="s16"
                >
                  {t['shareReturnPaymentMode']}
                </Text>
                <FormSwitchTab
                  // TODO ( USE FORM SWITCH TAB)
                  name="paymentMode"
                  options={accountList.map((value) => ({
                    label: value.label,
                    value: value.value,
                  }))}
                />

                {paymentModes === Payment_Mode.Account && (
                  <Box
                    mt="s16"
                    mb="s16"
                    w="25%"
                    display="flex"
                    flexDirection="column"
                    gap="s16"
                  >
                    <FormSelect
                      name="accountId"
                      label={t['shareReturnSelectAccount']}
                      placeholder={t['shareReturnSavingAccount']}
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
                        {t['shareReturnAvailableBalance']}
                      </Text>
                      <Text fontWeight="600" fontSize="r1">
                        {t['rs']} 12,342
                      </Text>
                    </Box>
                  </Box>
                )}
                {paymentModes === Payment_Mode.BankVoucher && (
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
                      label={t['shareReturnSelectBank']}
                      placeholder={t['shareReturnSelectBank']}
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
                        placeholder={t['shareReturnEnterVoucherNumber']}
                        label={t['shareReturnEnterVoucherNumber']}
                      />
                    </Box>
                  </Box>
                )}

                {paymentModes === Payment_Mode.Cash && (
                  <Box mt="s16" mb="s16" w="25%">
                    <TextInput
                      type="text"
                      name="name"
                      placeholder={t['shareReturnEnterCashAmount']}
                      label={t['shareReturnEnterCashAmount']}
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
      </form>
    </Form>
  );
};

ShareReturn.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default ShareReturn;
