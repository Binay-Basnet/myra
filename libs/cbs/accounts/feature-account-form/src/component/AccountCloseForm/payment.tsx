import { useFormContext } from 'react-hook-form';

import {
  AccountClosePaymentMode,
  NatureOfDepositProduct,
  useGetAccountTableListQuery,
  useGetBankListQuery,
} from '@coop/cbs/data-access';
import {
  BoxContainer,
  ContainerWithDivider,
} from '@coop/cbs/transactions/ui-containers';
import {
  FormEditableTable,
  FormInput,
  FormSelect,
  FormSwitch,
  FormSwitchTab,
  FormTextArea,
} from '@coop/shared/form';
import {
  Box,
  DEFAULT_PAGE_SIZE,
  FormAccountSelect,
  Grid,
  GridItem,
  Text,
} from '@coop/shared/ui';

const paymentModes = [
  {
    label: 'Account Transfer',
    value: AccountClosePaymentMode?.AccountTransfer,
  },
  {
    label: 'Bank Cheque',
    value: AccountClosePaymentMode?.BankCheque,
  },
  {
    label: 'Cash',
    value: AccountClosePaymentMode?.Cash,
  },
];

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
const FINE = '0';

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

export function Payment({ totalDeposit }: PaymentProps) {
  const { watch } = useFormContext();

  const selectedPaymentMode = watch('paymentMode');

  const denominations = watch('cash.denominations');

  const { data: bankList } = useGetBankListQuery();
  const denominationTotal =
    denominations?.reduce(
      (accumulator: number, curr: { amount: string }) =>
        accumulator + Number(curr.amount),
      0 as number
    ) ?? 0;

  const disableDenomination = watch('cash.disableDenomination');

  const cashPaid = watch('cash.cashPaid');
  const memberId = watch('memberID');
  const accountId = watch('accountID');

  const totalCashPaid: number = disableDenomination
    ? Number(cashPaid)
    : Number(denominationTotal);

  const returnAmount = totalCashPaid - totalDeposit;
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
  const accountTypes = {
    [NatureOfDepositProduct.Mandatory]: 'Mandatory Saving Account',
    [NatureOfDepositProduct.RecurringSaving]: 'Recurring Saving Account',
    [NatureOfDepositProduct.TermSavingOrFd]: 'Term Saving Account',
    [NatureOfDepositProduct.VoluntaryOrOptional]: 'Voluntary Saving Account',
  };

  const applicableAccountData = accountListData?.account?.list?.edges?.filter(
    (item) => item?.node?.id !== accountId
  );

  return (
    <ContainerWithDivider
      borderRight="1px"
      borderColor="border.layout"
      p="s16"
      pb="100px"
    >
      <BoxContainer>
        <FormSwitchTab
          label={'Payment Mode'}
          options={paymentModes}
          name="paymentMode"
        />

        {selectedPaymentMode === AccountClosePaymentMode?.AccountTransfer && (
          <Grid templateColumns={'repeat(2,1fr)'} gap="s20">
            <GridItem colSpan={2}>
              <FormAccountSelect
                name="accountTransfer.destination_account"
                label={'Destination Account'}
                options={applicableAccountData?.map((account) => ({
                  accountInfo: {
                    accountName: account.node?.product.productName,
                    accountId: account.node?.id,
                    accountType: account?.node?.product?.nature
                      ? accountTypes[account?.node?.product?.nature]
                      : '',
                    balance: account?.node?.balance ?? '0',
                    fine:
                      account?.node?.product?.nature ===
                        NatureOfDepositProduct.RecurringSaving ||
                      account?.node?.product?.nature ===
                        NatureOfDepositProduct.Mandatory
                        ? FINE
                        : '',
                  },
                  value: account.node?.id as string,
                }))}
              />
            </GridItem>

            <FormInput
              type="date"
              name="accountTransfer.depositedDate"
              label="Deposited Date"
            />

            <FormInput
              type="text"
              name="accountTransfer.depositedBy"
              label="Deposited By"
            />
            <GridItem
              colSpan={2}
              display="flex"
              flexDirection={'column'}
              gap="s4"
            >
              {' '}
              <Text fontWeight={'500'} fontSize="r1">
                Note
              </Text>
              <FormTextArea name="accountTransfer.note" label={'Note'} />
            </GridItem>
          </Grid>
        )}

        {selectedPaymentMode === AccountClosePaymentMode?.BankCheque && (
          <Grid templateColumns={'repeat(2,1fr)'} gap="s20">
            {' '}
            <GridItem colSpan={2}>
              <FormSelect
                name="bankCheque.bank"
                label={'Bank Name'}
                options={
                  bankList?.bank?.bank?.list?.map((bank) => ({
                    label: bank?.name as string,
                    value: bank?.id as string,
                  })) ?? []
                }
              />
            </GridItem>
            <FormInput
              name="bankCheque.cheque_no"
              label="Cheque No"
              placeholder="Cheque No"
            />
            <FormInput
              name="bankCheque.amount"
              type="number"
              label={'Amount'}
              textAlign={'right'}
              placeholder="0.00"
            />
            {/* <FormInput
              type="date"
              name="cheque.depositedAt"
              label="Deposited Date"
            />

            <FormInput
              type="text"
              name="cheque.depositedBy"
              label="Deposited By"
            /> */}
            <GridItem
              colSpan={2}
              display="flex"
              flexDirection={'column'}
              gap="s4"
            >
              {' '}
              <Text fontWeight={'500'} fontSize="r1">
                Note
              </Text>
              <FormTextArea name="bankCheque.note" label={'Note'} />
            </GridItem>
          </Grid>
        )}

        {selectedPaymentMode === AccountClosePaymentMode.Cash && (
          <>
            <Grid templateColumns={'repeat(2,1fr)'} gap="s20">
              <FormInput
                name="cash.cashPaid"
                type="number"
                label={'Cash'}
                textAlign={'right'}
              />
            </Grid>

            <FormSwitch
              name="cash.disableDenomination"
              label={'Disable Denomination'}
              defaultChecked={false}
            />

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
                <Text
                  fontSize="r1"
                  fontWeight={400}
                  color="neutralColorLight.Gray-60"
                >
                  Total
                </Text>
                <Text
                  fontSize="r1"
                  fontWeight={400}
                  color="neutralColorLight.Gray-60"
                >
                  {totalCashPaid}
                </Text>
              </Box>

              <Box display="flex" justifyContent="space-between">
                <Text
                  fontSize="r1"
                  fontWeight={400}
                  color="neutralColorLight.Gray-60"
                >
                  Return
                </Text>
                <Text
                  fontSize="r1"
                  fontWeight={400}
                  color="neutralColorLight.Gray-60"
                >
                  {returnAmount}
                </Text>
              </Box>

              <Box display="flex" justifyContent="space-between">
                <Text
                  fontSize="r1"
                  fontWeight={400}
                  color="neutralColorLight.Gray-60"
                >
                  Grand Total
                </Text>
                <Text
                  fontSize="r1"
                  fontWeight={400}
                  color="neutralColorLight.Gray-60"
                >
                  {totalCashPaid - returnAmount}
                </Text>
              </Box>
            </Box>
            <Box display={'flex'} flexDirection="column" gap="s4">
              <Text fontWeight={'500'} fontSize="r1">
                Note
              </Text>
              <FormTextArea name="cash.note" label="Note" rows={5} />
            </Box>
          </>
        )}
      </BoxContainer>
    </ContainerWithDivider>
  );
}

export default Payment;
