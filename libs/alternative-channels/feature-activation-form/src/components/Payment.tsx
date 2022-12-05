import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { Divider } from '@chakra-ui/react';

import { Box, Grid, GridItem, Text } from '@myra-ui';

import {
  AlternativeChannelDepositedBy,
  AlternativeChannelPaymentMode,
  ObjState,
  useGetCoaBankListQuery,
} from '@coop/cbs/data-access';
import { BoxContainer, ContainerWithDivider } from '@coop/cbs/transactions/ui-containers';
import {
  FormAccountSelect,
  FormEditableTable,
  FormInput,
  FormSelect,
  FormSwitch,
  FormSwitchTab,
  FormTextArea,
} from '@coop/shared/form';
import { featureCode, useTranslation } from '@coop/shared/utils';

const paymentModes = [
  {
    label: 'Account Transfer',
    value: AlternativeChannelPaymentMode?.Account,
  },
  {
    label: 'Bank Cheque',
    value: AlternativeChannelPaymentMode?.BankVoucher,
  },
  {
    label: 'Cash',
    value: AlternativeChannelPaymentMode?.Cash,
  },
];

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
  totalDeposit: number;
}

type PaymentTableType = {
  value: string;
  quantity: string;
  amount: string;
};

export const Payment = ({ totalDeposit }: PaymentProps) => {
  const { watch, setValue } = useFormContext();
  const { t } = useTranslation();

  const selectedPaymentMode = watch('paymentMode');
  const denominations = watch('cash.denominations');
  const disableDenomination = watch('cash.disableDenomination');
  const cashPaid = watch('cash.cashPaid');
  const memberId = watch('memberId');

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

  const totalCashPaid: number = disableDenomination ? Number(cashPaid) : Number(denominationTotal);
  const returnAmount = totalCashPaid - totalDeposit;

  const depositedByList = [
    { label: t['sharePurchaseSelf'], value: AlternativeChannelDepositedBy?.Self },
    {
      label: t['sharePurchaseOthers'],
      value: AlternativeChannelDepositedBy?.Others,
    },
  ];

  useEffect(() => {
    setValue('cash.cashPaid', String(totalDeposit));
  }, [totalDeposit, setValue]);

  return (
    <ContainerWithDivider borderRight="1px" borderColor="border.layout" p="s16" pb="100px">
      <BoxContainer>
        <FormSwitchTab label="Payment Mode" options={paymentModes} name="paymentMode" />

        {selectedPaymentMode === AlternativeChannelPaymentMode?.Account && (
          <Grid templateColumns="repeat(2,1fr)" gap="s20">
            <GridItem colSpan={2}>
              <FormAccountSelect
                name="accountTransfer.destination_account"
                label="Destination Account"
                memberId={memberId}
                filterBy={ObjState.Active}
              />
            </GridItem>
            <GridItem colSpan={2} display="flex" flexDirection="column" gap="s4">
              <FormTextArea name="accountTransfer.note" label="Note" />
            </GridItem>
          </Grid>
        )}

        {selectedPaymentMode === AlternativeChannelPaymentMode?.BankVoucher && (
          <>
            <Grid templateColumns="repeat(2,1fr)" gap="s20">
              <GridItem colSpan={2}>
                <FormSelect name="bankCheque.bank" label="Bank Name" options={bankList} />
              </GridItem>
              <FormInput name="bankCheque.voucher_id" label="Voucher Number" />

              <FormInput type="date" name="bankCheque.deposited_date" label="Deposited Date" />
            </Grid>
            <Divider />

            <FormSwitchTab
              label={t['sharePurchaseDepositedBy']}
              name="bankCheque.depositedBy"
              options={depositedByList}
            />
            <Divider />
            <FormTextArea name="bankCheque.note" label="Note" />
          </>
        )}

        {selectedPaymentMode === AlternativeChannelPaymentMode.Cash && (
          <>
            <Grid templateColumns="repeat(2,1fr)" gap="s20">
              <FormInput name="cash.cashPaid" type="number" label="Cash" textAlign="right" />
            </Grid>

            <FormSwitch name="cash.disableDenomination" label="Disable Denomination" />
            {!disableDenomination && (
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
                  Total
                </Text>
                <Text fontSize="r1" fontWeight={400} color="neutralColorLight.Gray-60">
                  {totalCashPaid}
                </Text>
              </Box>

              <Box display="flex" justifyContent="space-between">
                <Text fontSize="r1" fontWeight={400} color="neutralColorLight.Gray-60">
                  Return
                </Text>
                <Text fontSize="r1" fontWeight={400} color="neutralColorLight.Gray-60">
                  {returnAmount}
                </Text>
              </Box>

              <Box display="flex" justifyContent="space-between">
                <Text fontSize="r1" fontWeight={400} color="neutralColorLight.Gray-60">
                  Grand Total
                </Text>
                <Text fontSize="r1" fontWeight={400} color="neutralColorLight.Gray-60">
                  {totalCashPaid - returnAmount}
                </Text>
              </Box>
            </Box>

            <FormTextArea name="cash.note" label="Note" rows={5} />
          </>
        )}
      </BoxContainer>
    </ContainerWithDivider>
  );
};

export default Payment;
