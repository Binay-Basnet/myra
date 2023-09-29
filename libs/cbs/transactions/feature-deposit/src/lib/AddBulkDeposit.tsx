import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useQueryClient } from '@tanstack/react-query';
import omit from 'lodash/omit';

import { Box, Button, MemberCard, ResponseDialog, Text } from '@myra-ui';

import {
  BulkDepositInput,
  CashValue,
  DepositedBy,
  DepositPaymentType,
  useGetIndividualMemberDetails,
  useSetBulkDepositDataMutation,
} from '@coop/cbs/data-access';
import { localizedDate, localizedTime, ROUTES } from '@coop/cbs/utils';
import { FormLayout, FormMemberSelect } from '@coop/shared/form';
import { amountConverter } from '@coop/shared/utils';

import { BulkDepositAccountsSummary, BulkDepositAccountsTable, Payment } from '../components';

/* eslint-disable-next-line */
export interface AddBulkDepositProps {}

type CustomBulkDepositInput = Omit<BulkDepositInput, 'cash'> & {
  cash?:
    | {
        cashPaid: string;
        disableDenomination: boolean;
        total: string;
        returned_amount: string;
        denominations: { value?: string; quantity?: number; amount?: string }[];
      }
    | undefined
    | null;
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

export const AddBulkDeposit = () => {
  const router = useRouter();

  const queryClient = useQueryClient();

  const methods = useForm<CustomBulkDepositInput>({
    defaultValues: {
      payment_type: DepositPaymentType.Cash,
      cash: { disableDenomination: true },
      depositedBy: DepositedBy.Self,
    },
  });

  const { watch, getValues } = methods;

  const memberId = watch('memberId');

  const { memberDetailData, memberSignatureUrl, memberCitizenshipUrl } =
    useGetIndividualMemberDetails({ memberId: String(memberId) });

  const [mode, setMode] = useState<number>(0); // 0: form 1: payment

  const { mutateAsync } = useSetBulkDepositDataMutation();

  const disableDenomination = watch('cash.disableDenomination');

  const cashPaid = watch('cash.cashPaid');

  const denominations = watch('cash.denominations');

  const denominationTotal = useMemo(
    () =>
      denominations?.reduce(
        (accumulator, curr) => accumulator + Number(curr.amount),
        0 as number
      ) ?? 0,
    [denominations]
  );

  const totalCashPaid = disableDenomination ? cashPaid : denominationTotal;

  const handleSubmit = () => {
    const values = getValues();
    let filteredValues = {
      ...omit({ ...values }, ['accounts']),
      accounts: accounts?.map(
        (record) =>
          record && {
            accountId: record.accountId,
            noOfInstallments: Number(record.noOfInstallments),
            amount: String(record.amount),
            fine: record.fine,
            rebate: record.rebate,
          }
      ),
    };

    if (values['payment_type'] === DepositPaymentType.Cash) {
      filteredValues = omit({ ...filteredValues }, ['withdrawSlip', 'bankVoucher']);
      filteredValues['cash'] = {
        ...values['cash'],
        cashPaid: values.cash?.cashPaid as string,
        disableDenomination: Boolean(values.cash?.disableDenomination),
        total: String(totalCashPaid),
        returned_amount: String(returnAmount),
        denominations: !disableDenomination
          ? values?.cash?.denominations?.map(({ value, quantity }) => ({
              value: cashOptions[value as string],
              quantity,
            })) ?? []
          : [],
      };
    }

    if (values['payment_type'] === DepositPaymentType.BankVoucher) {
      filteredValues = omit({ ...filteredValues }, ['withdrawSlip', 'cash']);
    }

    if (values['payment_type'] === DepositPaymentType.WithdrawSlip) {
      filteredValues = omit({ ...filteredValues }, ['bankVoucher', 'cash']);
    }

    // asyncToast({
    //   id: 'add-bulk-deposit-transaction',
    //   msgs: {
    //     loading: 'Adding bulk deposit',
    //     success: 'Bulk deposit added',
    //   },
    //   promise: mutateAsync({ data: filteredValues as BulkDepositInput }),
    //   onSuccess: () => {
    //     queryClient.invalidateQueries(['getDepositListData']);
    //     router.push(ROUTES.CBS_TRANS_DEPOSIT_LIST);
    //   },
    // });
    return filteredValues as BulkDepositInput;
  };

  const accounts = watch('accounts');

  const totalDep = accounts?.reduce(
    (accumulator, curr) => accumulator + Number(curr?.amount || 0),
    0
  );

  const totalFine = accounts?.reduce(
    (accumulator, curr) => accumulator + Number(curr?.fine !== 'N/A' ? curr?.fine : 0),
    0
  );
  const returnAmount = Number(totalCashPaid) - Number(totalDep || 0);

  const bankSelected = watch('bankVoucher.bankId');
  const bankVoucherDateSelected = watch('bankVoucher.depositedAt');

  const disableSubmitButtonFxn = (paymentMode: DepositPaymentType) => {
    if (paymentMode === DepositPaymentType.Cash && !disableDenomination) {
      return (
        !(Number(returnAmount) >= 0) ||
        !(Number(cashPaid) >= Number(totalDep || 0) + Number(totalFine || 0))
      );
    }
    if (
      (paymentMode === DepositPaymentType.BankVoucher && bankSelected === undefined) ||
      (paymentMode === DepositPaymentType.BankVoucher && bankVoucherDateSelected === undefined)
    ) {
      return true;
    }

    return false;
  };
  const paymentModes = watch('payment_type');

  return (
    <FormLayout methods={methods}>
      <FormLayout.Header
        title="New Bulk Deposit"
        closeLink={ROUTES.CBS_TRANS_DEPOSIT_LIST}
        buttonLabel="Add Deposit"
        buttonHandler={() => router.push(ROUTES.CBS_TRANS_DEPOSIT_ADD)}
      />
      <FormLayout.Content>
        <FormLayout.Form>
          <Box display={mode === 0 ? 'flex' : 'none'} minH="calc(100vh - 170px)">
            <Box p="s16" pb="100px" width="100%" display="flex" flexDirection="column" gap="s24">
              <FormMemberSelect name="memberId" label="Member" />
              {memberId && (
                <MemberCard
                  isInline
                  memberDetails={{
                    name: memberDetailData?.name,
                    avatar: memberDetailData?.profilePicUrl ?? '',
                    code: memberDetailData?.code,
                    memberID: memberDetailData?.id,
                    gender: memberDetailData?.gender,
                    age: memberDetailData?.age,
                    maritalStatus: memberDetailData?.maritalStatus as string,
                    dateJoined: memberDetailData?.dateJoined,
                    // branch: 'Basantapur',
                    phoneNo: memberDetailData?.contact,
                    email: memberDetailData?.email,
                    address: memberDetailData?.address,
                  }}
                  // notice="KYM needs to be updated"
                  signaturePath={memberSignatureUrl as string}
                  citizenshipPath={memberCitizenshipUrl as string}
                  cardBg="neutralColorLight.Gray-10"
                />
              )}
              {memberId && <BulkDepositAccountsTable memberId={memberId} />}

              {accounts?.length && <BulkDepositAccountsSummary memberId={memberId} />}
            </Box>
          </Box>

          <Payment mode={mode} totalDeposit={Number(totalDep || 0) + Number(totalFine || 0)} />
        </FormLayout.Form>
      </FormLayout.Content>
      {mode === 0 && (
        <FormLayout.Footer
          status={
            <Box display="flex" gap="s32">
              <Text fontSize="r1" fontWeight={600} color="neutralColorLight.Gray-50">
                Total Payable Amount
              </Text>
              <Text fontSize="r1" fontWeight={600} color="neutralColorLight.Gray-70">
                {Number(totalDep || '0') + Number(totalFine || '0')}
              </Text>
            </Box>
          }
          mainButtonLabel="Proceed Transaction"
          mainButtonHandler={() => setMode(1)}
          // isMainButtonDisabled={disableSubmitButtonFxn(paymentModes) && mode === 1}
        />
      )}
      {mode === 1 && (
        <FormLayout.Footer
          status={
            <Button variant="solid" onClick={() => setMode(0)}>
              Previous
            </Button>
          }
          mainButtonLabel="Submit"
          mainButton={
            <ResponseDialog
              onSuccess={() => {
                queryClient.invalidateQueries(['getDepositListData']);
                router.push(ROUTES.CBS_TRANS_DEPOSIT_LIST);
              }}
              promise={() => mutateAsync({ data: handleSubmit() })}
              successCardProps={(response) => {
                const result = response?.transaction?.bulkDeposit?.record;
                const total = result?.totalAmount;

                return {
                  type: 'Bulk Deposit',
                  receiptTitle: 'Bulk Deposit Receipt',
                  total: amountConverter(total || 0) as string,
                  title: 'Bulk Deposit Successful',
                  details: {
                    Date: localizedDate(result?.date),
                    'Transaction Time': localizedTime(result?.createdAt),
                    Amount: amountConverter(result?.amount || 0),
                    Fine: amountConverter(result?.fine || 0) as string,
                    Discount: amountConverter(result?.discount || 0) as string,
                    Rebate: amountConverter(result?.rebate || 0) as string,

                    'Payment Mode': result?.paymentMode,
                    'Deposited By': result?.depositedOther ?? 'Self',
                  },
                  subTitle:
                    'Bulk Deposit completed successfully. Details of the transaction is listed below.',
                  meta: {
                    memberId: result?.memberId,
                    member: result?.memberName,
                  },
                  dublicate: true,
                  showSignatures: true,
                };
              }}
              errorCardProps={{
                title: 'Bulk Deposit Failed',
              }}
            >
              <Button width="160px" isDisabled={disableSubmitButtonFxn(paymentModes) && mode === 1}>
                Confirm{' '}
              </Button>
            </ResponseDialog>
          }
          mainButtonHandler={handleSubmit}
          isMainButtonDisabled={disableSubmitButtonFxn(paymentModes) && mode === 1}
        />
      )}
    </FormLayout>
  );
};

export default AddBulkDeposit;
