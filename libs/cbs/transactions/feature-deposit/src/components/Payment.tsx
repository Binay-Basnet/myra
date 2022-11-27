import { useEffect, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';

import {
  DepositAccount,
  DepositedBy,
  DepositPaymentType,
  NatureOfDepositProduct,
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
import { amountConverter, featureCode, useTranslation } from '@coop/shared/utils';

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
  totalDeposit: number;
  rebate: number;
  selectedAccount?: DepositAccount;
}

type PaymentTableType = {
  value: string;
  quantity: string;
  amount: string;
};

export const Payment = ({ mode, totalDeposit, rebate, selectedAccount }: PaymentProps) => {
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

  const accountId = watch('accountId');

  useEffect(() => {
    if (totalDeposit) {
      setValue('cash.cashPaid', String(totalDeposit));
      setValue('withdrawSlip.amount', String(totalDeposit));
      setValue('bankVoucher.amount', String(totalDeposit));
    }
  }, [totalDeposit]);

  const memberId = watch('memberId');

  const isDiffMember = watch('withdrawSlip.isDifferentMember');

  const dmemberId = watch('withdrawSlip.memberId');

  const selectedPaymentMode = watch('payment_type');

  const depositedBy = watch('depositedBy');

  const denominations = watch('cash.denominations');

  const { data: bank } = useGetCoaBankListQuery({
    accountCode: featureCode.accountCode as string[],
  });

  const bankListArr = bank?.settings?.chartsOfAccount?.accountsUnder?.data;

  const bankList = bankListArr?.map((item) => ({
    label: item?.name?.local as string,
    value: item?.id as string,
  }));

  const denominationTotal =
    denominations?.reduce(
      (accumulator: number, curr: { amount: string }) => accumulator + Number(curr.amount),
      0 as number
    ) ?? 0;

  const disableDenomination = watch('cash.disableDenomination');

  const cashPaid = watch('cash.cashPaid');

  const totalCashPaid = disableDenomination ? cashPaid : denominationTotal;

  const returnAmount =
    selectedAccount?.product?.nature === NatureOfDepositProduct.Saving &&
    selectedAccount?.product?.isMandatorySaving
      ? 0
      : rebate
      ? totalCashPaid - totalDeposit + rebate
      : totalCashPaid - totalDeposit;

  // refetch data when calendar preference is updated
  const preference = useAppSelector((state: RootState) => state?.auth?.preference);

  const withdrawSlipAccountId = watch('withdrawSlip.accId');

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

  useEffect(() => {
    resetField('bankVoucher.depositedAt');
    resetField('withdrawSlip.depositedAt');
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
          name="payment_type"
        />

        {selectedPaymentMode === DepositPaymentType.BankVoucher && (
          <InputGroupContainer>
            <GridItem colSpan={2}>
              <FormSelect
                name="bankVoucher.bankId"
                label={t['depositPaymentBankName']}
                options={bankList}
              />
            </GridItem>

            <FormInput name="bankVoucher.voucherId" label={t['addDepositVoucherId']} />

            <FormAmountInput name="bankVoucher.amount" label={t['depositPaymentAmount']} />

            <FormDatePicker
              name="bankVoucher.depositedAt"
              label={t['depositPaymentDepositedDate']}
              maxToday
            />

            <FormInput
              type="text"
              name="bankVoucher.depositedBy"
              label={t['depositPaymentDepositedBy']}
            />
          </InputGroupContainer>
        )}

        {selectedPaymentMode === DepositPaymentType.WithdrawSlip && (
          <InputGroupContainer>
            <GridItem colSpan={3}>
              <FormCheckbox
                name="withdrawSlip.isDifferentMember"
                label="Withdraw Slip is from different member"
              />
            </GridItem>

            {isDiffMember && (
              <GridItem colSpan={3}>
                <FormMemberSelect name="withdrawSlip.memberId" label="Member" />
              </GridItem>
            )}

            <GridItem colSpan={2}>
              <FormAccountSelect
                name="withdrawSlip.accId"
                memberId={isDiffMember ? dmemberId : memberId}
                label="Account Name"
                filterBy={ObjState.Active}
                excludeIds={[accountId]}
              />
            </GridItem>

            <FormSelect
              name="withdrawSlip.withdrawSlipNo"
              label="Withdraw Slip No."
              options={availableSlipListOptions}
            />

            <FormAmountInput name="withdrawSlip.amount" label={t['depositPaymentAmount']} />
          </InputGroupContainer>
        )}

        {selectedPaymentMode === DepositPaymentType.Cash && (
          <>
            <InputGroupContainer>
              <FormAmountInput name="cash.cashPaid" label={t['depositPaymentCash']} />
            </InputGroupContainer>

            <FormSwitch
              name="cash.disableDenomination"
              label={t['depositPaymentDisableDenomination']}
              defaultChecked={false}
            />

            {!disableDenomination && (
              <FormEditableTable<PaymentTableType>
                name="cash.denominations"
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
                  {amountConverter(totalCashPaid)}
                </Text>
              </Box>

              <Box display="flex" justifyContent="space-between">
                <Text fontSize="r1" fontWeight={400} color="neutralColorLight.Gray-60">
                  {t['depositPaymentReturn']}
                </Text>
                <Text fontSize="r1" fontWeight={400} color="neutralColorLight.Gray-60">
                  {amountConverter(returnAmount)}
                </Text>
              </Box>

              <Box display="flex" justifyContent="space-between">
                <Text fontSize="r1" fontWeight={400} color="neutralColorLight.Gray-60">
                  {t['depositPaymentGrandTotal']}
                </Text>
                <Text fontSize="r1" fontWeight={400} color="neutralColorLight.Gray-60">
                  {amountConverter(totalCashPaid - returnAmount)}
                </Text>
              </Box>
            </Box>
          </>
        )}
      </BoxContainer>

      <BoxContainer>
        <Grid templateColumns="repeat(2, 1fr)" columnGap="s20">
          {/* <FormSelect
            name="sourceOfFund"
            label={t['depositPaymentSourceOfFund']}
            options={sourceOfFundsList.map((source) => ({
              label: source,
              value: source,
            }))}
          /> */}
          <FormInput name="sourceOfFund" label={t['depositPaymentSourceOfFund']} />

          <FormFileInput size="md" label={t['depositPaymentFileUpload']} name="doc_identifiers" />
        </Grid>
      </BoxContainer>

      <BoxContainer>
        <FormSwitchTab
          label={t['depositPaymentDepositedBy']}
          options={depositors}
          name="depositedBy"
        />

        {depositedBy === DepositedBy.Agent && (
          <InputGroupContainer>
            <FormAgentSelect name="agentId" label={t['depositPaymentMarketRepresentative']} />
          </InputGroupContainer>
        )}

        {depositedBy === DepositedBy.Other && (
          <>
            <InputGroupContainer>
              <FormInput name="other_name" label={t['depositPaymentName']} />
            </InputGroupContainer>

            <Box width="50%">
              <FormFileInput
                name="other_doc_identifiers"
                label={t['depositPaymentCitizenshipDocument']}
                size="md"
              />
            </Box>
          </>
        )}
      </BoxContainer>

      <BoxContainer>
        <FormTextArea name="notes" label={t['depositPaymentNote']} rows={5} />
      </BoxContainer>
    </ContainerWithDivider>
  );
};

export default Payment;
