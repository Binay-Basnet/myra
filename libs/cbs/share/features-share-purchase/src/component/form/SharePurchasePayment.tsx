import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import omit from 'lodash/omit';

import {
  Member,
  NatureOfDepositProduct,
  Payment_Mode,
  useAddSharePurchaseMutation,
  useGetAccountTableListQuery,
  useGetBankListQuery,
  useGetMemberIndividualDataQuery,
} from '@coop/cbs/data-access';
import { FormCustomSelect } from '@coop/cbs/transactions/ui-components';
import {
  FormEditableTable,
  FormFileInput,
  FormInput,
  FormSelect,
  FormSwitch,
  FormSwitchTab,
  FormTextArea,
} from '@coop/shared/form';
import {
  asyncToast,
  Box,
  Button,
  Container,
  DEFAULT_PAGE_SIZE,
  FormFooter,
  FormHeader,
  FormSection,
  Grid,
  GridItem,
  Navbar,
  ShareMemberCard,
  TabMenu,
  Text,
} from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

const Header = () => {
  return (
    <>
      <Navbar />
      <TabMenu />
    </>
  );
};

type PaymentTableType = {
  value: string;
  quantity: string;
  amount: string;
};

const denominationsOptions = [
  { label: '1000x', value: '1000' },
  { label: '500x', value: '500' },
  { label: '100x', value: '100' },
  { label: '50x', value: '50' },
  { label: '25x', value: '25' },
  { label: '20x', value: '20' },
  { label: '10x', value: '10' },
  { label: '5x', value: '5' },
  { label: '2x', value: '2' },
  { label: '1x', value: '1' },
];

const SharePurchaseForm = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const methods = useForm();

  const id = String(router?.query?.['id']);
  const { watch, getValues } = methods;

  const disableDenomination = watch('disableDenomination');

  const { mutateAsync } = useAddSharePurchaseMutation();

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
  // const accountId = watch('accountId');

  const [totalAmount, setTotalAmount] = useState(0);

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
      id,
    },
    {
      staleTime: 0,
    }
  );

  const { data: accountListData } = useGetAccountTableListQuery(
    {
      paginate: {
        first: DEFAULT_PAGE_SIZE,
        after: '',
      },
      filter: { id },
    },
    {
      staleTime: 0,
      enabled: !!id,
    }
  );

  // const availableBalance = accountListData?.account?.list?.edges?.filter(
  //   (item) => item?.node?.id === accountId
  // );

  const accountTypes = {
    [NatureOfDepositProduct.Mandatory]: 'Mandatory Saving Account',
    [NatureOfDepositProduct.RecurringSaving]: 'Recurring Saving Account',
    [NatureOfDepositProduct.TermSavingOrFd]: 'Term Saving Account',
    [NatureOfDepositProduct.VoluntaryOrOptional]: 'Voluntary Saving Account',
  };

  const memberDetail = data?.members?.details?.data;

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

    asyncToast({
      id: 'share-purchase-id',
      msgs: {
        success: 'Share Purchased',
        loading: 'Purchasing Share',
      },
      onSuccess: () => router.push('/share/register'),
      promise: mutateAsync({ data: updatedValues }),
    });
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
              <FormHeader title={t['sharePurchaseShareIssue']} />
            </Box>

            <Grid templateColumns="repeat(6,1fr)">
              <GridItem colSpan={memberDetail ? 4 : 6}>
                <Box
                  background="gray.0"
                  border="1px solid"
                  borderColor={'border.layout'}
                >
                  <Box p="s20">
                    <Text
                      color="neutralColorLight.Gray-80"
                      fontSize="s3"
                      fontWeight="Medium"
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
                  </Box>

                  {paymentModes === Payment_Mode.BankVoucher && (
                    <FormSection templateColumns={2}>
                      <GridItem colSpan={2}>
                        <FormSelect
                          name="bankId"
                          label={t['sharePurchaseBankName']}
                          __placeholder={t['sharePurchaseSelectBank']}
                          options={bankList}
                        />
                      </GridItem>

                      <GridItem colSpan={1}>
                        <FormInput
                          type="text"
                          name="voucherNumber"
                          __placeholder={t['sharePurchaseEnterVoucherNumber']}
                          label={t['sharePurchaseVoucherId']}
                        />
                      </GridItem>

                      <GridItem colSpan={1}>
                        <FormInput
                          type="text"
                          name="amount"
                          __placeholder={t['sharePurchaseEnterVoucherNumber']}
                          label={t['sharePurchaseAmount']}
                        />
                      </GridItem>

                      <GridItem colSpan={1}>
                        <FormInput
                          type="date"
                          name="depositedDate"
                          __placeholder={t['sharePurchaseEnterVoucherNumber']}
                          label={t['sharePurchaseDepositedDate']}
                        />
                      </GridItem>

                      <GridItem colSpan={1}>
                        <FormInput
                          type="text"
                          name="depositedBy"
                          __placeholder={t['sharePurchaseEnterVoucherNumber']}
                          label={t['sharePurchaseDepositedBy']}
                        />
                      </GridItem>
                    </FormSection>
                  )}

                  {paymentModes === Payment_Mode.Account && (
                    <FormSection templateColumns={2}>
                      <GridItem colSpan={2}>
                        <FormCustomSelect
                          name="accountId"
                          label={t['sharePurchaseSelectAccount']}
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
                      </GridItem>

                      <GridItem colSpan={1}>
                        <FormInput
                          type="text"
                          name="accountAmount"
                          __placeholder={t['sharePurchaseEnterVoucherNumber']}
                          label={t['sharePurchaseAccountAmount']}
                        />
                      </GridItem>
                      {/* <Box
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
                      </Box> */}
                    </FormSection>
                  )}

                  {paymentModes === Payment_Mode.Cash && (
                    <FormSection templateColumns={2}>
                      <GridItem colSpan={1}>
                        <FormInput
                          type="text"
                          name="cash"
                          __placeholder={t['sharePurchaseEnterCashAmount']}
                          label={t['sharePurchaseCash']}
                        />
                      </GridItem>

                      <GridItem colSpan={2}>
                        <FormSwitch
                          name="disableDenomination"
                          label={t['sharePurchaseDisableDenomination']}
                        />
                      </GridItem>

                      {!disableDenomination && (
                        <GridItem colSpan={2}>
                          <FormEditableTable<PaymentTableType>
                            name="cash.denominations"
                            columns={[
                              {
                                accessor: 'value',
                                header: 'Denomination',
                                cellWidth: 'auto',
                                fieldType: 'search',
                                searchOptions: denominationsOptions,
                              },
                              {
                                accessor: 'quantity',
                                header: 'Quantity',
                                isNumeric: true,
                              },
                              {
                                accessor: 'amount',
                                header: 'Amount',
                                isNumeric: true,
                                accessorFn: (row) =>
                                  row.quantity
                                    ? Number(row.value) * Number(row.quantity)
                                    : '0',
                              },
                            ]}
                            defaultData={[
                              { value: '1000', quantity: '0', amount: '0' },
                              { value: '500', quantity: '0', amount: '0' },
                              { value: '100', quantity: '0', amount: '0' },
                              { value: '50', quantity: '0', amount: '0' },
                              { value: '25', quantity: '0', amount: '0' },
                              { value: '20', quantity: '0', amount: '0' },
                              { value: '10', quantity: '0', amount: '0' },
                              { value: '5', quantity: '0', amount: '0' },
                              { value: '2', quantity: '0', amount: '0' },
                              { value: '1', quantity: '0', amount: '0' },
                            ]}
                            canDeleteRow={false}
                            canAddRow={false}
                          />

                          <Box
                            border="1px solid"
                            borderColor="border.layout"
                            display="flex"
                            justifyContent="space-between"
                            mt="s16"
                            borderRadius="br2"
                          >
                            <Box p="s8" display="flex" flexDirection="column">
                              <Text
                                color="neutralColorLight.Gray-60"
                                fontSize="r1"
                                fontWeight="Regular"
                                mb="s8"
                              >
                                {t['sharePurchaseTotal']}
                              </Text>
                              <Text
                                color="neutralColorLight.Gray-60"
                                fontSize="r1"
                                fontWeight="Regular"
                                mb="s8"
                              >
                                {t['sharePurchaseReturn']}
                              </Text>
                              <Text
                                color="neutralColorLight.Gray-60"
                                fontSize="r1"
                                fontWeight="Regular"
                                mb="s8"
                              >
                                {t['sharePurchaseGrandTotal']}
                              </Text>
                            </Box>

                            <Box p="s8" display="flex" flexDirection="column">
                              <Text
                                color="neutralColorLight.Gray-60"
                                fontSize="r1"
                                fontWeight="Regular"
                                mb="s8"
                              >
                                0
                              </Text>
                              <Text
                                color="neutralColorLight.Gray-60"
                                fontSize="r1"
                                fontWeight="Regular"
                                mb="s8"
                              >
                                0
                              </Text>
                              <Text
                                color="neutralColorLight.Gray-60"
                                fontSize="r1"
                                fontWeight="Regular"
                                mb="s8"
                              >
                                0
                              </Text>
                            </Box>
                          </Box>
                        </GridItem>
                      )}

                      <GridItem colSpan={2}>
                        <Grid
                          mt="s16"
                          templateColumns="repeat(2,1fr)"
                          gap="s20"
                        >
                          <GridItem colSpan={1}>
                            <FormSelect
                              name="sourceOfFund"
                              label={t['sharePurchaseSourceofFund']}
                              options={bankList}
                            />
                          </GridItem>
                          <GridItem colSpan={1}>
                            <FormFileInput
                              name="sourceOfFund"
                              label={t['sharePurchaseFileUpload']}
                            />
                          </GridItem>
                        </Grid>
                      </GridItem>
                    </FormSection>
                  )}

                  <FormSection>
                    <GridItem colSpan={3}>
                      <Text
                        color="neutralColorLight.Gray-70"
                        fontSize="s3"
                        fontWeight="Medium"
                        mb="s8"
                      >
                        {t['sharePurchaseNote']}
                      </Text>
                      <FormTextArea name="note" />
                    </GridItem>
                  </FormSection>
                </Box>
              </GridItem>
              <GridItem colSpan={memberDetail ? 2 : 0}>
                {memberDetail && (
                  <ShareMemberCard memberDetails={memberDetail as Member} />
                )}
              </GridItem>
            </Grid>
          </Container>
        </form>
      </FormProvider>

      <Box position="relative" margin="0px auto">
        <Box bottom="0" position="fixed" width="100%" bg="gray.100" zIndex={10}>
          <Container minW="container.lg" height="fit-content" p="0">
            <FormFooter
              status={
                <Button
                  width="160px"
                  onClick={() => router.back()}
                  shade={'primary'}
                >
                  {t['previous']}
                </Button>
              }
              mainButtonLabel={t['submit']}
              mainButtonHandler={onSubmit}
            />
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default SharePurchaseForm;
