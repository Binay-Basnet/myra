import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { BiSave } from 'react-icons/bi';
import { useRouter } from 'next/router';
import { CloseIcon } from '@chakra-ui/icons';

import { Payment_Mode } from '@coop/cbs/data-access';
import { FieldCardComponents } from '@coop/shared/components';
import {
  FormInput,
  FormNumberInput,
  FormSelect,
  FormSwitchTab,
} from '@coop/shared/form';
import {
  Box,
  Button,
  Container,
  FormFooter,
  Grid,
  GridItem,
  Icon,
  MainLayout,
  Navbar,
  TabMenu,
  Text,
} from '@coop/shared/ui';
import { amountConverter, useTranslation } from '@coop/shared/utils';

// TODO! use layout
const Header = () => {
  return (
    <>
      <Navbar />
      <TabMenu />
    </>
  );
};

const SharePurchase = () => {
  const { t } = useTranslation();
  const router = useRouter();
  // const { mutate } = useAddSharePurchaseMutation();
  // TODO! Change this!!
  const methods = useForm();
  const { watch } = methods;

  const accountList = [
    { label: t['sharePurchaseBankVoucher'], value: Payment_Mode.BankVoucher },
    { label: t['sharePurchaseAccount'], value: Payment_Mode.Account },
    { label: t['sharePurchaseCash'], value: Payment_Mode.Cash },
  ];

  // const memberIdQuery = watch('memberId');
  const noOfShares = watch('shareCount');
  const printingFee = watch('printingFee');
  const adminFee = watch('adminFee');
  const paymentModes = watch('paymentMode');

  // const { data: memberData } = useGetMemberDataQuery({
  //   id: memberIdQuery ? memberIdQuery : null,
  // });
  //
  // const data = memberData?.members?.individual?.get?.data?.member;

  // const submitForm = () => {
  //   const { memberId, bankId, paymentMode, voucherNumber } = getValues();
  //   const formData = {
  //     memberId,
  //     shareCount: Number(noOfShares),
  //     shareAmount: noOfShares * 100,
  //     accountId: '12',
  //     extraFee: [
  //       { name: 'Administration fee', value: Number(adminFee) },
  //       { name: 'Printing fee', value: Number(printingFee) },
  //       { name: '“Others”', value: 10 },
  //     ],
  //     totalAmount: noOfShares * 100 + Number(adminFee) + Number(printingFee),
  //     bankId,
  //     paymentMode,
  //     voucherNumber,
  //   };
  //   const id = 'asdsad';
  //   mutate({ id, data: formData });
  // };

  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    setTotalAmount(
      noOfShares * 1000 + Number(adminFee ?? 0) + Number(printingFee ?? 0)
    );
  }, [noOfShares, adminFee, printingFee]);

  return (
    <>
      <FormProvider {...methods}>
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
          <Container minW="container.lg" p="0">
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
                {t['sharePurchaseNewSharePurchase']}
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

                  {/* {data && (
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
                              {t['sharePurchaseID']}:
                              {data?.personalInformation?.panNumber}
                            </Text>

                            <Text
                              color="neutralColorLight.Gray-60"
                              fontWeight="Regular"
                              fontSize="s3"
                            >
                              {t['sharePurchaseMemberSince']}:
                              {data?.personalInformation?.dateOfBirth}
                            </Text>

                            <Text
                              color="neutralColorLight.Gray-60"
                              fontWeight="Regular"
                              fontSize="s3"
                            >
                              {t['sharePurchaseBranch']}:
                              {data?.address?.temporary?.state}
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
                             {t['sharePurchaseViewProfile']}
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
                         {t['sharePurchaseShareHistory']}
                      </Text>
                      <SharePurchaseHistoryTable id={memberIdQuery} />
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
                    {t['sharePurchaseShareInformation']}
                  </Text>

                  <Grid mt="s16" gap={5} templateColumns="repeat(2,1fr)">
                    <GridItem>
                      <FormNumberInput
                        id="noOfShares"
                        name="shareCount"
                        label={t['sharePurchaseNoOfShares']}
                        // placeholder={t['sharePurchaseNoOfShares']}
                      />
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
                            {t['sharePurchaseShareAmount']}
                          </Text>

                          <Box p="s12">
                            <Text
                              color="neutralLightColor.Gray-80"
                              fontWeight="SemiBold"
                              fontSize="r1"
                            >
                              {amountConverter(noOfShares * 100)}
                            </Text>
                          </Box>
                        </GridItem>

                        <GridItem display="flex" justifyContent="space-between">
                          <Text
                            color="neutralLightColor.Gray-60"
                            fontWeight="Medium"
                            fontSize="s3"
                            display="flex"
                            alignItems="center"
                          >
                            {t['sharePurchaseAdministrationFees']}
                          </Text>
                          <Box width="300px">
                            {/* <FormInput
                              name="adminFee"
                              id="administrationFees"
                              label=""
                              placeholder="34000.00"
                              bg="gray.0"
                              textAlign="right"
                            /> */}

                            <FormNumberInput
                              name="adminFee"
                              id="administrationFees"
                              label=""
                              placeholder="34000.00"
                              bg="gray.0"
                            />
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
                            {t['sharePurchasePrintingFees']}
                          </Text>
                          <Box width="300px">
                            {/* <FormInput
                              name="printingFee"
                              id="printingFees"
                              label=""
                              placeholder="54.00"
                              bg="gray.0"
                              textAlign="right"
                            /> */}

                            <FormNumberInput
                              name="printingFee"
                              id="printingFees"
                              label=""
                              placeholder="54.00"
                              bg="gray.0"
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
                            fontWeight="SemiBold"
                            fontSize="s3"
                          >
                            {t['sharePurchaseTotalAmount']}
                          </Text>

                          <Box p="s12">
                            <Text
                              color="neutralLightColor.Gray-80"
                              fontWeight="SemiBold"
                              fontSize="r1"
                            >
                              {t['rs']} {amountConverter(totalAmount)}
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
                    {t['sharePurchasePaymentInformation']}
                  </Text>
                  <Text
                    color="neutralColorLight.Gray-80"
                    fontSize="s3"
                    fontWeight="500"
                    mb="s16"
                  >
                    {t['sharePurchasePaymentMode']}
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
                    <Box mt="s16" mb="s16" w="25%">
                      <FormSelect
                        name="accountId"
                        label={t['sharePurchaseSelectAccount']}
                        placeholder={t['sharePurchaseSelectAccount']}
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

                      <Box
                        px="s16"
                        py="s8"
                        bg="background.500"
                        color="neutralColorLight.Gray-70"
                        mt="s16"
                      >
                        <Text fontWeight="400" fontSize="s2">
                          {t['sharePurchaseAvailableBalance']}
                        </Text>
                        <Text fontWeight="600" fontSize="r1">
                          Rs. 12,342
                        </Text>
                      </Box>
                    </Box>
                  )}
                  {paymentModes === Payment_Mode.BankVoucher && (
                    <Box
                      w="25%"
                      mt="s16"
                      mb="s16"
                      display="flex"
                      flexDirection="column"
                      gap="s16"
                    >
                      <FormSelect
                        name="bankId"
                        label={t['sharePurchaseSelectBank']}
                        placeholder={t['sharePurchaseSelectBank']}
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
                          placeholder={t['sharePurchaseEnterVoucherNumber']}
                          label={t['sharePurchaseEnterVoucherNumber']}
                        />
                      </Box>
                    </Box>
                  )}

                  {paymentModes === Payment_Mode.Cash && (
                    <Box mt="s16" w="25%">
                      <FormInput
                        type="text"
                        name="totalAmount"
                        placeholder={t['sharePurchaseEnterCashAmount']}
                        label={t['sharePurchaseEnterCashAmount']}
                      />
                    </Box>
                  )}
                </Box>
              </Box>
            </Box>
          </Container>
        </form>
      </FormProvider>
      <Box position="relative" margin="0px auto">
        <Box bottom="0" position="fixed" width="100%" bg="gray.100" zIndex={10}>
          <Container minW="container.lg" height="fit-content" p="0">
            <FormFooter
              status={
                <Box display="flex" gap="s8">
                  <Text as="i" fontSize="r1">
                    {t['formDetails']}
                  </Text>
                  <Text as="i" fontSize="r1">
                    09:41 AM
                  </Text>
                </Box>
              }
              draftButton={
                <Button type="submit" variant="ghost">
                  <Icon as={BiSave} color="primary.500" />
                  <Text
                    alignSelf="center"
                    color="primary.500"
                    fontWeight="Medium"
                    fontSize="s2"
                    ml="5px"
                  >
                    {t['saveDraft']}
                  </Text>
                </Button>
              }
              mainButtonLabel={t['done']}
              mainButtonHandler={() => router.push(`/share/balance`)}
            />
          </Container>
        </Box>
      </Box>
    </>
  );
};

SharePurchase.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default SharePurchase;
