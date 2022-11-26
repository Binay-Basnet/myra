import { useEffect, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';

import {
  DepositedBy,
  DepositPaymentType,
  ObjState,
  RootState,
  useAppSelector,
  useGetAvailableSlipsListQuery,
  useGetCoaBankListQuery,
} from '@coop/cbs/data-access';
import {
  BoxContainer,
  ContainerWithDivider,
  InputGroupContainer,
} from '@coop/cbs/transactions/ui-containers';
import {
  FormAgentSelect,
  FormAmountInput,
  FormCheckbox,
  FormDatePicker,
  FormEditableTable,
  FormFileInput,
  FormInput,
  FormSelect,
  FormSwitch,
  FormSwitchTab,
  FormTextArea,
} from '@coop/shared/form';
import { Box, FormAccountSelect, FormMemberSelect, Grid, GridItem, Text } from '@myra-ui';
import { featureCode, useTranslation } from '@coop/shared/utils';

// const sourceOfFundsList = [
//   'Personal Savings',
//   'Share Sales',
//   'Dividends',
//   'Property Sales',
//   'Inheritances',
//   'Compensation',
// ];

// const denominationsOptions = [
//   { label: '1000x', value: CashValue.Cash_1000 },
//   { label: '500x', value: CashValue.Cash_500 },
//   { label: '100x', value: CashValue.Cash_100 },
//   { label: '50x', value: CashValue.Cash_50 },
//   { label: '25x', value: CashValue.Cash_25 },
//   { label: '20x', value: CashValue.Cash_20 },
//   { label: '10x', value: CashValue.Cash_10 },
//   { label: '5x', value: CashValue.Cash_5 },
//   { label: '2x', value: CashValue.Cash_2 },
//   { label: '1x', value: CashValue.Cash_1 },
// ];

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

/* eslint-disable-next-line */
export interface PaymentProps {
  mode: number;
  totalAmount: number;
}

type PaymentTableType = {
  value: string;
  quantity: string;
  amount: string;
};

export const Payment = ({ mode, totalAmount }: PaymentProps) => {
  const { t } = useTranslation();

  const paymentModes = [
    {
      label: t['depositPaymentCash'],
      value: DepositPaymentType.Cash,
    },
    {
      label: 'Withdraw Slip',
      value: DepositPaymentType.WithdrawSlip,
    },
    {
      label: t['depositPaymentBankVoucher'],
      value: DepositPaymentType.BankVoucher,
    },
  ];

  const depositors = [
    {
      label: t['depositPaymentSelf'],
      value: DepositedBy.Self,
    },
    {
      label: t['depositPaymentMarketRepresentative'],
      value: DepositedBy.Agent,
    },
    {
      label: t['depositPaymentOther'],
      value: DepositedBy.Other,
    },
  ];

  const { watch, resetField, setValue } = useFormContext();

  useEffect(() => {
    if (totalAmount) {
      setValue('openingPayment.bankVoucher.amount', String(totalAmount));
      setValue('openingPayment.withdrawSlip.amount', String(totalAmount));
      setValue('openingPayment.cash.cashPaid', String(totalAmount));
    }
  }, [totalAmount]);

  const memberId = watch('memberId');

  const isDiffMember = watch('openingPayment.withdrawSlip.isDifferentMember');

  const dmemberId = watch('openingPayment.withdrawSlip.memberId');

  const selectedPaymentMode = watch('openingPayment.payment_type');

  const depositedBy = watch('openingPayment.depositedBy');

  const denominations = watch('openingPayment.cash.denominations');

  const { data: bank } = useGetCoaBankListQuery({
    accountCode: featureCode.accountCode as string[],
  });

  const bankListArr = bank?.settings?.chartsOfAccount?.accountsUnder?.data;

  const bankList = bankListArr?.map((item) => ({
    label: item?.name?.local as string,
    value: item?.id as string,
  }));

  const withdrawSlipAccountId = watch('openingPayment.withdrawSlip.accId');

  const { data: availableSlipsListQueryData } = useGetAvailableSlipsListQuery(
    { accountId: withdrawSlipAccountId },
    { enabled: !!withdrawSlipAccountId }
  );

  const availableSlipListOptions = useMemo(
    () =>
      availableSlipsListQueryData?.withdrawSlip?.listAvailableSlips?.data?.map((withdrawSlip) => ({
        label: String(withdrawSlip?.slipNumber).padStart(10, '0'),
        value: withdrawSlip?.slipNumber as string,
      })) ?? [],
    [availableSlipsListQueryData]
  );

  const denominationTotal =
    denominations?.reduce(
      (accumulator: number, curr: { amount: string }) => accumulator + Number(curr.amount),
      0 as number
    ) ?? 0;

  const disableDenomination = watch('openingPayment.cash.disableDenomination');

  const cashPaid = watch('openingPayment.cash.cashPaid');

  const totalCashPaid = (disableDenomination ? cashPaid : denominationTotal) ?? 0;

  const returnAmount = totalCashPaid - totalAmount ?? 0;

  // refetch data when calendar preference is updated
  const preference = useAppSelector((state: RootState) => state?.auth?.preference);

  useEffect(() => {
    resetField('openingPayment.bankVoucher.depositedAt');
  }, [preference?.date]);

  return (
    <ContainerWithDivider
      borderRight="1px"
      borderColor="border.layout"
      p="s16"
      display={mode === 1 ? 'flex' : 'none'}
      pb="100px"
    >
      <BoxContainer>
        <FormSwitchTab
          label={t['depositPaymentPaymentMode']}
          options={paymentModes}
          name="openingPayment.payment_type"
        />

        {selectedPaymentMode === DepositPaymentType.BankVoucher && (
          <InputGroupContainer>
            <GridItem colSpan={2}>
              <FormSelect
                name="openingPayment.bankVoucher.bankId"
                label={t['depositPaymentBankName']}
                options={bankList}
              />
            </GridItem>

            <FormInput
              name="openingPayment.bankVoucher.voucherId"
              label={t['addDepositVoucherId']}
            />

            <FormAmountInput
              name="openingPayment.bankVoucher.amount"
              label={t['depositPaymentAmount']}
            />

            <FormDatePicker
              name="openingPayment.bankVoucher.depositedAt"
              label={t['depositPaymentDepositedDate']}
              maxToday
            />

            <FormInput
              type="text"
              name="openingPayment.bankVoucher.depositedBy"
              label={t['depositPaymentDepositedBy']}
            />
          </InputGroupContainer>
        )}

        {selectedPaymentMode === DepositPaymentType.WithdrawSlip && (
          <InputGroupContainer>
            <GridItem colSpan={3}>
              <FormCheckbox
                name="openingPayment.withdrawSlip.isDifferentMember"
                label="Withdraw slip is from different member"
              />
            </GridItem>

            {isDiffMember && (
              <GridItem colSpan={3}>
                <FormMemberSelect name="openingPayment.withdrawSlip.memberId" label="Member" />
              </GridItem>
            )}

            <GridItem colSpan={2}>
              <FormAccountSelect
                name="openingPayment.withdrawSlip.accId"
                memberId={isDiffMember ? dmemberId : memberId}
                label="Account Name"
                filterBy={ObjState.Active}
              />
            </GridItem>

            <FormSelect
              name="openingPayment.withdrawSlip.withdrawSlipNo"
              label="Withdraw Slip No"
              options={availableSlipListOptions}
            />

            <FormAmountInput
              name="openingPayment.withdrawSlip.amount"
              label={t['depositPaymentAmount']}
            />
          </InputGroupContainer>
        )}

        {selectedPaymentMode === DepositPaymentType.Cash && (
          <>
            <InputGroupContainer>
              <FormAmountInput
                name="openingPayment.cash.cashPaid"
                label={t['depositPaymentCash']}
              />
            </InputGroupContainer>

            <FormSwitch
              name="openingPayment.cash.disableDenomination"
              label={t['depositPaymentDisableDenomination']}
              defaultChecked={false}
            />

            {!disableDenomination && (
              <FormEditableTable<PaymentTableType>
                name="openingPayment.cash.denominations"
                columns={[
                  {
                    accessor: 'value',
                    header: t['depositPaymentDenomination'],
                    cellWidth: 'auto',
                    fieldType: 'search',
                    searchOptions: denominationsOptions,
                  },
                  {
                    accessor: 'quantity',
                    header: t['depositPaymentQuantity'],
                    isNumeric: true,
                  },
                  {
                    accessor: 'amount',
                    header: t['depositPaymentAmount'],
                    isNumeric: true,
                    accessorFn: (row) =>
                      row.quantity ? Number(row.value) * Number(row.quantity) : '0',
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
            )}

            <Box
              display="flex"
              flexDirection="column"
              gap="s20"
              px="s8"
              py="s10"
              border="1px"
              borderColor="border.layout"
              borderRadius="br2"
            >
              <Box display="flex" justifyContent="space-between">
                <Text fontSize="r1" fontWeight={400} color="neutralColorLight.Gray-60">
                  {t['depositPaymentTotal']}
                </Text>
                <Text fontSize="r1" fontWeight={400} color="neutralColorLight.Gray-60">
                  {totalCashPaid}
                </Text>
              </Box>

              <Box display="flex" justifyContent="space-between">
                <Text fontSize="r1" fontWeight={400} color="neutralColorLight.Gray-60">
                  {t['depositPaymentReturn']}
                </Text>
                <Text fontSize="r1" fontWeight={400} color="neutralColorLight.Gray-60">
                  {returnAmount}
                </Text>
              </Box>

              <Box display="flex" justifyContent="space-between">
                <Text fontSize="r1" fontWeight={400} color="neutralColorLight.Gray-60">
                  {t['depositPaymentGrandTotal']}
                </Text>
                <Text fontSize="r1" fontWeight={400} color="neutralColorLight.Gray-60">
                  {totalCashPaid - returnAmount}
                </Text>
              </Box>
            </Box>
          </>
        )}
      </BoxContainer>

      <BoxContainer>
        <Grid templateColumns="repeat(2, 1fr)" columnGap="s20">
          {/* <FormSelect
            name="openingPayment.sourceOfFund"
            label={t['depositPaymentSourceOfFund']}
            options={sourceOfFundsList.map((source) => ({
              label: source,
              value: source,
            }))}
          /> */}
          <FormInput name="openingPayment.sourceOfFund" label={t['depositPaymentSourceOfFund']} />

          <FormFileInput
            size="md"
            label={t['depositPaymentFileUpload']}
            name="openingPayment.doc_identifiers"
          />
        </Grid>
      </BoxContainer>

      <BoxContainer>
        <FormSwitchTab
          label={t['depositPaymentDepositedBy']}
          options={depositors}
          name="openingPayment.depositedBy"
        />

        {depositedBy === DepositedBy.Agent && (
          <InputGroupContainer>
            <FormAgentSelect
              name="openingPayment.agentId"
              label={t['depositPaymentMarketRepresentative']}
            />
          </InputGroupContainer>
        )}

        {depositedBy === DepositedBy.Other && (
          <>
            <InputGroupContainer>
              <FormInput name="openingPayment.other_name" label={t['depositPaymentName']} />
            </InputGroupContainer>

            <Box width="50%">
              <FormFileInput
                name="openingPayment.other_doc_identifiers"
                label={t['depositPaymentCitizenshipDocument']}
                size="md"
              />
            </Box>
          </>
        )}
      </BoxContainer>

      <BoxContainer>
        <FormTextArea name="openingPayment.notes" label={t['depositPaymentNote']} rows={5} />
      </BoxContainer>
    </ContainerWithDivider>
  );
};

export default Payment;
