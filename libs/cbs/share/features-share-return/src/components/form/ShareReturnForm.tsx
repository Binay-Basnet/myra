import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { BsFillTelephoneFill } from 'react-icons/bs';
import { GrMail } from 'react-icons/gr';
import { IoLocationSharp } from 'react-icons/io5';
import { RiShareBoxFill } from 'react-icons/ri';
import { useRouter } from 'next/router';
import { debounce, omit } from 'lodash';

import {
  NatureOfDepositProduct,
  Payment_Mode,
  useAddShareReturnMutation,
  useGetAccountTableListQuery,
  useGetBankListQuery,
  useGetMemberIndividualDataQuery,
  useGetMemberListQuery,
  useGetShareHistoryQuery,
} from '@coop/cbs/data-access';
import {
  FormCustomSelect,
  FormMemberSelect,
} from '@coop/cbs/transactions/ui-components';
import { SharePurchaseHistoryTable } from '@coop/myra/components';
import { FieldCardComponents } from '@coop/shared/components';
import {
  FormCheckbox,
  FormInput,
  FormSelect,
  FormSwitchTab,
} from '@coop/shared/form';
import {
  asyncToast,
  Avatar,
  Box,
  Container,
  DEFAULT_PAGE_SIZE,
  FormFooter,
  FormHeader,
  Grid,
  GridItem,
  Icon,
  Input,
  Navbar,
  TabMenu,
  Text,
  TextFields,
  TextInput,
} from '@coop/shared/ui';
import {
  amountConverter,
  getRouterQuery,
  useTranslation,
} from '@coop/shared/utils';

// TODO! use Layout
const Header = () => {
  return (
    <>
      <Navbar />
      <TabMenu />
    </>
  );
};

const ShareReturnForm = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const methods = useForm();
  const { watch, getValues, reset } = methods;

  const { mutateAsync } = useAddShareReturnMutation();

  const accountList = [
    { label: t['shareReturnBankVoucher'], value: Payment_Mode.BankVoucher },
    { label: t['shareReturnAccount'], value: Payment_Mode.Account },
    { label: t['shareReturnCash'], value: Payment_Mode.Cash },
  ];

  const memberId = watch('memberId');
  const noOfShares = watch('noOfReturnedShares');
  const allShares = watch('selectAllShares');
  const printingFees = watch('printingFee');
  const adminFees = watch('adminFee');
  const paymentModes = watch('paymentMode');
  const accountId = watch('accountId');

  const [totalAmount, setTotalAmount] = useState(0);
  const [IDMember, setIDMember] = useState('');
  const [trigger, setTrigger] = useState(false);

  const { data } = useGetMemberIndividualDataQuery({ id: memberId });

  const { data: bankData } = useGetBankListQuery();

  const bankListArr = bankData?.bank?.bank?.list;

  const bankList = bankListArr?.map((item) => {
    return {
      label: item?.name as string,
      value: item?.id as string,
    };
  });

  const onSubmit = () => {
    const values = getValues();
    const updatedValues = {
      ...omit(values, ['printingFee', 'adminFee', 'selectAllShares']),
      extraFee: [
        {
          name: 'adminFee',
          value: adminFees,
        },
        {
          name: 'printFee',
          value: printingFees,
        },
      ],
      totalAmount: totalAmount.toString(),
      noOfReturnedShares: Number(values['noOfReturnedShares']),
      memberId,
    };

    asyncToast({
      id: 'share-return-id',
      msgs: {
        success: 'Share Returned',
        loading: 'Returning Share',
      },
      onSuccess: () => router.push('/share/register'),
      promise: mutateAsync({ data: updatedValues }),
    });
  };

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

  const { data: memberList } = useGetMemberListQuery(
    {
      pagination: getRouterQuery({ type: ['PAGINATION'] }),
      filter: {
        query: IDMember,
      },
    },
    {
      staleTime: 0,
      enabled: trigger,
    }
  );

  const memberListData = memberList?.members?.list?.edges;

  const memberDetail =
    memberListData &&
    memberListData?.filter((item) => memberId === item?.node?.id)[0]?.node;

  useEffect(() => {
    setTotalAmount(
      noOfShares * 100 + Number(adminFees ?? 0) + Number(printingFees ?? 0)
    );
  }, [noOfShares, adminFees, printingFees]);

  const { data: shareHistoryTableData } = useGetShareHistoryQuery({
    memberId,
  });

  const balanceData = shareHistoryTableData?.share?.history?.balance;

  useEffect(() => {
    if (balanceData) {
      if (allShares) {
        reset({
          ...getValues(),
          noOfReturnedShares: balanceData?.count ?? 0,
        });
      } else {
        reset({
          ...getValues(),
          noOfReturnedShares: 0,
        });
      }
    }
  }, [allShares, balanceData, getValues, memberListData, methods, reset]);

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
              <FormHeader title={t['shareReturnNewShareReturn']} />
            </Box>
            <Box
              mb="50px"
              display="flex"
              width="100%"
              background="white"
              minH="calc(100vh - 170px)"
            >
              <Box w="100%" minHeight="100vh">
                <Box borderBottom="1px solid #E6E6E6" p={5}>
                  <Box w="50%">
                    <FormMemberSelect
                      name="memberId"
                      label={t['sharePurchaseSelectMember']}
                      placeholder={t['sharePurchaseEnterMemberID']}
                      onInputChange={debounce((id) => {
                        setIDMember(id);
                        setTrigger(true);
                      }, 800)}
                      options={
                        memberListData?.map((member) => ({
                          memberInfo: {
                            memberName: member?.node?.name?.local,
                            memberId: member?.node?.id,
                            gender:
                              member?.node?.profile?.data?.formData
                                ?.basicInformation?.gender?.local,
                            age: member?.node?.profile?.data?.formData
                              ?.basicInformation?.age,
                            maritialStatus:
                              member?.node?.profile?.data?.formData
                                ?.maritalStatus?.local,
                            address: member?.node?.address,
                          },
                          value: member?.node?.id as string,
                        })) ?? []
                      }
                    />
                    {/* <FormSelect
                      name="memberId"
                      label={t['sharePurchaseSelectMember']}
                      placeholder={t['sharePurchaseEnterMemberID']}
                      onInputChange={debounce((id) => {
                        setIDMember(id);
                        setTrigger(true);
                      }, 800)}
                      options={memberOptions ?? []}
                    /> */}
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
                                src="/passport.jpg"
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
                                {t['sharePurchaseID']}:&nbsp;{memberDetail?.id}
                              </Text>

                              <Text
                                color="neutralColorLight.Gray-60"
                                fontWeight="Regular"
                                fontSize="s3"
                              >
                                {t['sharePurchaseMemberSince']}: 2054/10/12
                              </Text>

                              <Text
                                color="neutralColorLight.Gray-60"
                                fontWeight="Regular"
                                fontSize="s3"
                              >
                                {t['sharePurchaseBranch']}:&nbsp;
                                {memberDetail?.address?.district?.local ?? '-'}
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
                                {memberDetail?.contact ?? '-'}
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
                                {memberDetail?.profile?.data?.formData
                                  ?.contactDetails?.email ?? '-'}
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
                                {memberDetail?.address?.district?.local ?? '-'}{' '}
                                ,{memberDetail?.address?.locality?.local} -
                                {memberDetail?.address?.wardNo}
                              </TextFields>
                            </Box>
                          </GridItem>
                          <GridItem
                            display="flex"
                            justifyContent="flex-end"
                            mr="s32"
                          >
                            <TextFields mr="5px" variant="link">
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
                            {t['shareReturnShareHistory']}
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
                    {t['shareReturnShareInformation']}
                  </Text>

                  <Grid mt="s16" gap={5} templateColumns="repeat(2,1fr)">
                    <GridItem>
                      <Grid
                        templateRows={
                          noOfShares ? 'repeat(3,1fr)' : 'repeat(2,0fr)'
                        }
                        gap="s16"
                      >
                        <GridItem>
                          {/* <FormNumberInput
                            id="noOfShares"
                            name="noOfReturnedShares"
                            label={t['shareReturnNoOfShares']}
                            isDisabled={allShares}
                          /> */}
                          <Input
                            textAlign="right"
                            id="noOfShares"
                            label={t['shareReturnNoOfShares']}
                            isDisabled={allShares}
                            type="number"
                            {...methods.register('noOfReturnedShares')}
                          />
                        </GridItem>

                        <GridItem>
                          <FormCheckbox
                            name="selectAllShares"
                            label={t['shareReturnSelectAllShares']}
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
                                  {balanceData
                                    ? allShares
                                      ? 0
                                      : Number(balanceData?.count) -
                                        Number(noOfShares)
                                    : 0}
                                </Text>
                              </Box>

                              <Box>
                                <Text fontWeight="400" fontSize="s2">
                                  {t['shareReturnRemainingShareValue']}
                                </Text>
                                <Text fontWeight="600" fontSize="r1">
                                  {balanceData
                                    ? allShares
                                      ? 0
                                      : (Number(balanceData?.count) -
                                          Number(noOfShares)) *
                                        100
                                    : 0}
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
                              {amountConverter(noOfShares * 100)}
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
                              type="number"
                              textAlign={'right'}
                              placeholder="0.00"
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
                              type="number"
                              textAlign={'right'}
                              placeholder="0.00"
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
                              {t['rs']} {amountConverter(totalAmount)}
                            </Text>
                          </Box>
                        </GridItem>
                      </FieldCardComponents>
                    ) : null}
                  </Grid>
                </Box>

                <Box background="white" p={5}>
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
                    options={accountList}
                  />

                  {paymentModes === Payment_Mode.Account && (
                    <Box
                      mt="s16"
                      mb="200px"
                      w="40%"
                      display="flex"
                      flexDirection="column"
                      gap="s16"
                    >
                      <FormCustomSelect
                        name="accountId"
                        label={t['shareReturnSelectAccount']}
                        placeholder={t['shareReturnSavingAccount']}
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
                          {t['shareReturnAvailableBalance']}
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
                        options={bankList}
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

export default ShareReturnForm;
