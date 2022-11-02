import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useQueryClient } from 'react-query';
import { useRouter } from 'next/router';
import { omit } from 'lodash';

import {
  CashValue,
  DepositedBy,
  DepositPaymentType,
  MembershipPaymentInput,
  ObjState,
  PaymentDepositedBy,
  useGetCoaBankListQuery,
  useGetMembershipFeeQuery,
  usePayMembershipMutation,
} from '@coop/cbs/data-access';
import { InputGroupContainer } from '@coop/cbs/transactions/ui-containers';
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
import {
  asyncToast,
  Box,
  Button,
  Container,
  FormAccountSelect,
  FormFooter,
  FormHeader,
  FormMemberSelect,
  FormSection,
  Grid,
  GridItem,
  Text,
} from '@coop/shared/ui';
import { featureCode, useTranslation } from '@coop/shared/utils';

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
type PaymentTableType = {
  value: string;
  quantity: string;
  amount: string;
};

const cashOptions: Record<string, string> = {
  '1000': CashValue.Cash_1000,
  '500': CashValue.Cash_500,
  '100': CashValue.Cash_100,
  '50': CashValue.Cash_50,
  '25': CashValue.Cash_25,
  '20': CashValue.Cash_20,
  '10': CashValue.Cash_10,
  '5': CashValue.Cash_5,
  '2': CashValue.Cash_2,
  '1': CashValue.Cash_1,
};

type CashPaid =
  | {
      cash: string;
      disableDenomination: boolean;
      total: string;
      returned_amount: string;
      denominations: { value?: string; quantity?: number; amount?: string }[];
    }
  | undefined
  | null;

type CustomMembershipPaymentInput = Omit<MembershipPaymentInput, 'cashData'> & {
  cashData: CashPaid;
};

interface MembershipPaymentProps {
  setMode: Dispatch<SetStateAction<'details' | 'payment'>>;
}

export const MembershipPayment = ({ setMode }: MembershipPaymentProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const id = router.query['id'] as string;

  const [totalAmount, setTotalAmount] = useState('');

  const { mutateAsync: payFee } = usePayMembershipMutation();
  useGetMembershipFeeQuery(
    {
      memberID: id,
    },
    {
      enabled: !!id,
      onSuccess: (response) =>
        setTotalAmount(String(response?.members?.activateMember?.getMembershipFee?.data?.charge)),
    }
  );

  const methods = useForm<CustomMembershipPaymentInput>({
    defaultValues: {
      paymentMode: DepositPaymentType.Cash,
      cashData: {
        cash: totalAmount,
      },
      chequeData: {
        amount: totalAmount,
      },
      bankDeposit: {
        amount: totalAmount,
      },
    },
  });
  const { watch } = methods;

  const { t } = useTranslation();

  const selectedPaymentMode = watch('paymentMode');
  const disableDenomination = watch('cashData.disableDenomination');
  const denominations = watch('cashData.denominations');

  const denominationTotal =
    denominations?.reduce((accumulator, curr) => accumulator + Number(curr?.amount), 0 as number) ??
    0;

  const cashPaid = watch('cashData.cash');
  const totalCashPaid = Number((disableDenomination ? cashPaid : denominationTotal) ?? 0);
  const returnAmount = totalCashPaid - Number(totalAmount) ?? 0;

  const isDiffMember = watch('chequeData.isDifferentMember');
  const dmemberId = watch('chequeData.memberId');
  const depositedBy = watch('chequeData.depositedBy');

  const memberId = id;

  const paymentModes = [
    {
      label: t['depositPaymentCash'],
      value: DepositPaymentType.Cash,
    },
    {
      label: t['addWithdrawWithdrawSlip'],
      value: DepositPaymentType.Cheque,
    },
    {
      label: t['depositPaymentBankVoucher'],
      value: DepositPaymentType.BankVoucher,
    },
  ];

  const { data: bank } = useGetCoaBankListQuery({
    accountCode: featureCode.accountCode as string[],
  });

  const bankListArr = bank?.settings?.chartsOfAccount?.accountsUnder?.data;

  const bankList = bankListArr?.map((item) => ({
    label: item?.name?.local as string,
    value: item?.id as string,
  }));

  useEffect(() => {
    if (totalAmount) {
      methods.setValue('bankDeposit.amount', String(totalAmount));
      methods.setValue('cashData.cash', String(totalAmount));
      methods.setValue('chequeData.amount', String(totalAmount));
    }
  }, [totalAmount]);

  const onSubmit = async () => {
    const values = methods.getValues();
    let updatedData;

    if (values.paymentMode === DepositPaymentType.Cash) {
      updatedData = {
        ...omit({ ...values }, ['chequeData', 'bankDeposit']),
        cashData: {
          ...values.cashData,
          disableDenomination: Boolean(values.cashData?.disableDenomination),
          total: String(totalCashPaid),
          returned_amount: String(returnAmount),
          denominations:
            values.cashData?.denominations?.map(({ value, quantity }) => ({
              value: cashOptions[value as string],
              quantity,
            })) ?? [],
        },
      };
    }

    if (values.paymentMode === DepositPaymentType.BankVoucher) {
      updatedData = {
        ...omit(values, ['chequeData', 'cashData']),
        bankDeposit: { ...values.bankDeposit },
      };
    }

    if (values.paymentMode === DepositPaymentType.Cheque) {
      updatedData = {
        ...omit(values, ['cashData', 'bankDeposit']),
        chequeData: { ...values.chequeData },
      };
    }

    await asyncToast({
      id: 'membership-payment',
      msgs: {
        success: 'Paid for Membership',
        loading: 'Paying for Membership',
      },
      onSuccess: () => {
        queryClient.invalidateQueries('getMemberCheck');
        setMode('details');
      },
      promise: payFee({ memberId: id, data: updatedData as MembershipPaymentInput }),
    });
  };

  return (
    <FormProvider {...methods}>
      <Container p={0} minWidth="container.lg" bg="white" minH="calc(100vh - 110px)">
        <Box position="sticky" top="110px" bg="gray.100" width="100%" zIndex="10">
          <FormHeader title="Membership Payment" />
        </Box>

        <Box display="flex" flexDirection="column" gap="s16">
          <Box px="s20" pt="s20">
            <FormSwitchTab
              label={t['depositPaymentPaymentMode']}
              options={paymentModes}
              name="paymentMode"
            />
          </Box>

          {selectedPaymentMode === DepositPaymentType.Cheque && (
            <Box>
              <GridItem colSpan={3} px="s20">
                <FormCheckbox
                  name="chequeData.isDifferentMember"
                  label="Cheque is from different member"
                />
              </GridItem>

              <FormSection>
                {isDiffMember && (
                  <GridItem colSpan={3}>
                    <FormMemberSelect name="chequeData.memberId" label="Member" />
                  </GridItem>
                )}

                <GridItem colSpan={2}>
                  <FormAccountSelect
                    name="chequeData.accountId"
                    memberId={String(isDiffMember ? dmemberId : memberId)}
                    label="Account Name"
                    filterBy={ObjState.Active}
                  />
                </GridItem>

                <FormInput name="chequeData.chequeNo" label={t['depositePaymentChequeNo']} />

                <FormInput
                  name="chequeData.amount"
                  type="number"
                  label={t['depositPaymentAmount']}
                  textAlign="right"
                />
              </FormSection>

              <FormSection flexLayout>
                <Box display="flex" flexDir="column" gap="s16">
                  <FormSwitchTab
                    label="Deposited By"
                    name="chequeData.depositedBy"
                    options={[
                      {
                        label: t['depositPaymentSelf'],
                        value: DepositedBy.Self,
                      },
                      {
                        label: t['depositPaymentOther'],
                        value: DepositedBy.Other,
                      },
                      {
                        label: t['depositPaymentMarketRepresentative'],
                        value: DepositedBy.Agent,
                      },
                    ]}
                  />

                  {depositedBy === DepositedBy.Agent && (
                    <InputGroupContainer>
                      <FormAgentSelect
                        name="openingPayment.agentId"
                        label={t['depositPaymentMarketRepresentative']}
                      />
                    </InputGroupContainer>
                  )}
                </Box>
              </FormSection>
            </Box>
          )}

          {selectedPaymentMode === DepositPaymentType.BankVoucher && (
            <Box>
              <Grid px="s20" templateColumns="repeat(3, 1fr)" rowGap="s16" columnGap="s20">
                <GridItem colSpan={3}>
                  <FormSelect
                    name="bankDeposit.bankId"
                    label={t['depositPaymentBankName']}
                    options={bankList}
                  />
                </GridItem>

                <FormInput name="bankDeposit.voucherId" label={t['addDepositVoucherId']} />

                <FormInput
                  name="bankDeposit.amount"
                  type="number"
                  label={t['depositPaymentAmount']}
                  textAlign="right"
                />

                <FormDatePicker
                  name="bankDeposit.depositedDate"
                  label={t['depositPaymentDepositedDate']}
                />
              </Grid>
              <FormSection>
                <FormSwitchTab
                  label="Deposited By"
                  name="bankDeposit.depositedBy"
                  options={[
                    {
                      label: t['depositPaymentSelf'],
                      value: PaymentDepositedBy.Self,
                    },
                    {
                      label: t['depositPaymentOther'],
                      value: PaymentDepositedBy.Other,
                    },
                  ]}
                />
              </FormSection>
            </Box>
          )}

          {selectedPaymentMode === DepositPaymentType.Cash && (
            <>
              <Grid px="s20" templateColumns="repeat(3, 1fr)" rowGap="s16" columnGap="s20">
                <FormAmountInput
                  name="cashData.cash"
                  type="number"
                  label={t['depositPaymentCash']}
                  textAlign="right"
                />
              </Grid>
              <Box px="s20">
                <Box display="flex" flexDir="column" gap="s8">
                  <FormSwitch
                    name="cashData.disableDenomination"
                    label={t['depositPaymentDisableDenomination']}
                    defaultChecked={false}
                  />

                  {!disableDenomination && (
                    <FormEditableTable<PaymentTableType>
                      name="cashData.denominations"
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
                </Box>
                <Box
                  display="flex"
                  mt="s16"
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
              </Box>
            </>
          )}

          <FormSection templateColumns={2}>
            <FormInput name="sourceFund" label={t['depositPaymentSourceOfFund']} />
            <FormFileInput size="md" label={t['depositPaymentFileUpload']} name="doc_identifiers" />
          </FormSection>
          <FormSection flexLayout>
            <FormTextArea name="remark" label={t['depositPaymentNote']} rows={5} />
          </FormSection>
        </Box>

        <Box position="sticky" bottom={0} zIndex="11">
          <FormFooter
            status={
              <Button variant="outline" onClick={() => setMode('details')}>
                Previous
              </Button>
            }
            mainButtonLabel="Confirm Payment"
            mainButtonHandler={onSubmit}
          />
        </Box>
      </Container>
    </FormProvider>
  );
};