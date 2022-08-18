import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { BsFillTelephoneFill } from 'react-icons/bs';
import { GrMail } from 'react-icons/gr';
import { IoLocationSharp } from 'react-icons/io5';
import { RiShareBoxFill } from 'react-icons/ri';
import { useRouter } from 'next/router';
import { debounce } from 'lodash';
import omit from 'lodash/omit';

import {
  Arrange,
  NatureOfDepositProduct,
  Payment_Mode,
  useAddSharePurchaseMutation,
  useGetAccountTableListQuery,
  useGetBankListQuery,
  useGetMemberIndividualDataQuery,
  useGetMemberListQuery,
} from '@coop/cbs/data-access';
import { FormCustomSelect } from '@coop/cbs/transactions/ui-components';
import { SharePurchaseHistoryTable } from '@coop/myra/components';
import { FieldCardComponents } from '@coop/shared/components';
import {
  FormInput,
  FormNumberInput,
  FormSelect,
  FormSwitchTab,
} from '@coop/shared/form';
import {
  Avatar,
  Box,
  Container,
  DEFAULT_PAGE_SIZE,
  FormFooter,
  FormHeader,
  Grid,
  GridItem,
  Icon,
  Navbar,
  TabMenu,
  Text,
  TextFields,
} from '@coop/shared/ui';
import { amountConverter, useTranslation } from '@coop/shared/utils';

const Header = () => {
  return (
    <>
      <Navbar />
      <TabMenu />
    </>
  );
};

const SharePurchaseForm = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const methods = useForm();
  const { watch, getValues } = methods;

  const { mutate } = useAddSharePurchaseMutation();

  const accountList = [
    { label: t['sharePurchaseBankVoucher'], value: Payment_Mode.BankVoucher },
    { label: t['sharePurchaseAccount'], value: Payment_Mode.Account },
    { label: t['sharePurchaseCash'], value: Payment_Mode.Cash },
  ];

  const memberId = watch('memberId');
  const noOfShares = watch('shareCount');
  const printingFee = watch('printingFee');
  const adminFee = watch('adminFee');
  const paymentModes = watch('paymentMode');
  const accountId = watch('accountId');

  const [totalAmount, setTotalAmount] = useState(0);
  const [IDMember, setIDMember] = useState('');
  const [trigger, setTrigger] = useState(false);

  const { data: bankData } = useGetBankListQuery();

  const bankListArr = bankData?.bank?.bank?.list;

  const bankList = bankListArr?.map((item) => {
    return {
      label: item?.name as string,
      value: item?.id as string,
    };
  });

  const { data } = useGetMemberIndividualDataQuery(
    {
      id: memberId,
    },
    {
      staleTime: 0,
      enabled: trigger,
    }
  );

  const { data: memberList } = useGetMemberListQuery(
    {
      first: 10,
      after: '',
      column: 'ID',
      arrange: Arrange.Asc,
      query: IDMember,
    },
    {
      staleTime: 0,
      enabled: trigger,
    }
  );

  const { data: accountListData } = useGetAccountTableListQuery(
    {
      paginate: {
        first: DEFAULT_PAGE_SIZE,
        after: '',
      },
      filter: { memberId },
    },
    {
      staleTime: 0,
      enabled: !!memberId,
    }
  );

  const availableBalance = accountListData?.account?.list?.edges?.filter(
    (item) => item?.node?.id === accountId
  );

  const accountTypes = {
    [NatureOfDepositProduct.Mandatory]: 'Mandatory Saving Account',
    [NatureOfDepositProduct.RecurringSaving]: 'Recurring Saving Account',
    [NatureOfDepositProduct.TermSavingOrFd]: 'Term Saving Account',
    [NatureOfDepositProduct.VoluntaryOrOptional]: 'Voluntary Saving Account',
  };

  const memberListData = memberList?.members?.list?.edges;

  type optionType = { label: string; value: string };

  const memberDetail =
    memberListData &&
    memberListData?.filter((item) => memberId === item?.node?.id)[0]?.node;

  const memberOptions = memberListData?.reduce((prevVal, curVal) => {
    return [
      ...prevVal,
      {
        label: `${curVal?.node?.name?.local} (ID:${curVal?.node?.id})`,
        value: curVal?.node?.id as string,
      },
    ];
  }, [] as optionType[]);

  useEffect(() => {
    setTotalAmount(
      noOfShares * 100 + Number(adminFee ?? 0) + Number(printingFee ?? 0)
    );
  }, [noOfShares, adminFee, printingFee]);

  const onSubmit = () => {
    const values = getValues();

    const updatedValues = {
      ...omit(values, ['printingFee', 'adminFee']),
      extraFee: [
        {
          name: 'adminFee',
          value: adminFee,
        },
        {
          name: 'printFee',
          value: printingFee,
        },
      ],
      totalAmount: totalAmount.toString(),
      shareCount: Number(values['shareCount']),
      memberId,
    };

    mutate(
      { data: updatedValues },
      {
        onSuccess: () => router.push(`/share/register`),
      }
    );
  };

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
          <Container minW="container.lg" p="0" mb="60px">
            <Box
              position="sticky"
              top="110px"
              bg="gray.100"
              width="100%"
              zIndex="10"
            >
              <FormHeader title={t['sharePurchaseNewSharePurchase']} />
            </Box>
            <Box
              mb="50px"
              display="flex"
              width="100%"
              background="white"
              minH="calc(100vh - 170px)"
            >
              <Box w="100%">
                <Box background="white" borderBottom="1px solid #E6E6E6" p={5}>
                  <Box w="50%">
                    <FormSelect
                      name="memberId"
                      label={t['sharePurchaseSelectMember']}
                      placeholder={t['sharePurchaseEnterMemberID']}
                      onInputChange={debounce((id) => {
                        setIDMember(id);
                        setTrigger(true);
                      }, 800)}
                      options={memberOptions ?? []}
                    />
                  </Box>

                  {data && (
                    <Box
                      mt="s16"
                      border="1px solid"
                      borderColor="border.layout"
                      borderTopLeftRadius="br2"
                      borderTopRightRadius="br2"
                      display="flex"
                      flexDirection="column"
                      gap="s16"
                    >
                      <Box bg="background.500">
                        <Grid
                          templateRows="repeat(1,1fr)"
                          templateColumns="repeat(5,1fr)"
                          gap={2}
                          p="s16"
                        >
                          <GridItem
                            display="flex"
                            alignSelf="center"
                            colSpan={2}
                          >
                            <Box m="10px">
                              <Avatar
                                src="https://www.kindpng.com/picc/m/483-4834603_daniel-hudson-passport-size-photo-bangladesh-hd-png.png"
                                size="lg"
                                name={memberDetail?.name?.local}
                              />
                            </Box>
                            <Box>
                              <TextFields
                                color="neutralColorLight.Gray-80"
                                fontWeight="Medium"
                                fontSize="s3"
                              >
                                {memberDetail?.name?.local}
                              </TextFields>
                              <Text
                                color="neutralColorLight.Gray-80"
                                fontSize="s3"
                                fontWeight="Regular"
                              >
                                {t['sharePurchaseID']}:{memberDetail?.id}
                              </Text>

                              <Text
                                color="neutralColorLight.Gray-60"
                                fontWeight="Regular"
                                fontSize="s3"
                              >
                                {t['sharePurchaseMemberSince']}:
                                {/* {memberDetail?.personalInformation?.dateOfBirth} */}
                                2054/10/12
                              </Text>

                              <Text
                                color="neutralColorLight.Gray-60"
                                fontWeight="Regular"
                                fontSize="s3"
                              >
                                {t['sharePurchaseBranch']}:
                                {memberDetail?.address?.district?.local}
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
                                {memberDetail?.contact}
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
                                {memberDetail?.address?.district?.local},
                                {/* {memberDetail?.address?.locality?.local} -
                                {memberDetail?.address?.wardNo} */}
                              </TextFields>
                            </Box>
                          </GridItem>
                          <GridItem
                            display="flex"
                            justifyContent="flex-end"
                            mr="s32"
                          >
                            <TextFields variant="link">
                              {t['sharePurchaseViewProfile']}{' '}
                            </TextFields>
                            <Icon
                              ml="5px"
                              size="sm"
                              as={RiShareBoxFill}
                              color="primary.500"
                            />
                          </GridItem>
                        </Grid>
                      </Box>

                      <Box p="2px">
                        <Box p="s16">
                          <Text
                            color="neutralColorLight.Gray-80"
                            fontWeight="SemiBold"
                            fontSize="r1"
                          >
                            {t['sharePurchaseShareHistory']}
                          </Text>
                        </Box>
                        <SharePurchaseHistoryTable id={memberId} />
                      </Box>
                    </Box>
                  )}
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
                        max={10}
                        label={t['sharePurchaseNoOfShares']}
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
                            <FormInput
                              name="adminFee"
                              type="number"
                              textAlign={'right'}
                              placeholder="0.00"
                            />

                            {/* <FormNumberInput
                              name="adminFee"
                              id="administrationFees"
                              placeholder="34000.00"
                              bg="gray.0"
                            /> */}
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
                            <FormInput
                              name="printingFee"
                              type="number"
                              textAlign={'right'}
                              placeholder="0.00"
                            />

                            {/* <FormNumberInput
                              name="printingFee"
                              id="printingFees"
                              label=""
                              placeholder="54.00"
                              bg="gray.0"
                            /> */}
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
                    name="paymentMode"
                    options={accountList.map((value) => ({
                      label: value.label,
                      value: value.value,
                    }))}
                  />

                  {paymentModes === Payment_Mode.Account && (
                    <Box mt="s16" mb="220px" w="40%">
                      <FormCustomSelect
                        name="accountId"
                        label={t['sharePurchaseSelectAccount']}
                        placeholder={t['sharePurchaseSelectAccount']}
                        options={accountListData?.account?.list?.edges?.map(
                          (account) => ({
                            accountInfo: {
                              accountName: account.node?.product.productName,
                              accountId: account.node?.product?.id,
                              accountType: account?.node?.product?.nature
                                ? accountTypes[account?.node?.product?.nature]
                                : '',
                            },
                            value: account.node?.id as string,
                          })
                        )}
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
                          Rs.
                          {(availableBalance &&
                            availableBalance[0]?.node?.balance) ??
                            0}
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
                        options={bankList}
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
                  <Text
                    color="neutralColorLight.Gray-60"
                    fontWeight="Regular"
                    as="i"
                    fontSize="r1"
                  >
                    Press Done to save form
                  </Text>
                </Box>
              }
              mainButtonLabel={t['done']}
              mainButtonHandler={onSubmit}
            />
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default SharePurchaseForm;
