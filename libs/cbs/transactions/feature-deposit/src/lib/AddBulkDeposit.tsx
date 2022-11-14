import { useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useQueryClient } from 'react-query';
import { useRouter } from 'next/router';
import omit from 'lodash/omit';

import {
  BulkDepositInput,
  CashValue,
  DepositedBy,
  DepositPaymentType,
  useSetBulkDepositDataMutation,
} from '@coop/cbs/data-access';
import {
  asyncToast,
  Box,
  Button,
  Container,
  FormFooter,
  FormHeader,
  FormMemberSelect,
  MemberCard,
  Text,
} from '@coop/shared/ui';
import { useGetIndividualMemberDetails } from '@coop/shared/utils';

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

  const [totalDepositAmount, setTotalDepositAmount] = useState<number>(0);

  const [totalRebate, setTotalRebate] = useState<number>(0);

  const methods = useForm<CustomBulkDepositInput>({
    defaultValues: {
      payment_type: DepositPaymentType.Cash,
      cash: { disableDenomination: false },
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

  const returnAmount = Number(totalCashPaid) - totalDepositAmount;

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
        denominations:
          values.cash?.denominations?.map(({ value, quantity }) => ({
            value: cashOptions[value as string],
            quantity,
          })) ?? [],
      };
    }

    if (values['payment_type'] === DepositPaymentType.BankVoucher) {
      filteredValues = omit({ ...filteredValues }, ['withdrawSlip', 'cash']);
    }

    if (values['payment_type'] === DepositPaymentType.WithdrawSlip) {
      filteredValues = omit({ ...filteredValues }, ['bankVoucher', 'cash']);
    }

    asyncToast({
      id: 'add-bulk-deposit-transaction',
      msgs: {
        loading: 'Adding bulk deposit',
        success: 'Bulk deposit added',
      },
      promise: mutateAsync({ data: filteredValues as BulkDepositInput }),
      onSuccess: () => {
        queryClient.invalidateQueries('getDepositListData');
        router.push('/transactions/deposit/list');
      },
    });
  };

  const accounts = watch('accounts');

  return (
    <>
      <Container minW="container.xl" height="fit-content">
        <Box position="sticky" top="110px" bg="gray.100" width="100%" zIndex="10">
          <FormHeader
            title="New Bulk Deposit"
            closeLink="/transactions/deposit/list"
            buttonLabel="Add Deposit"
            buttonHandler={() => router.push('/transactions/deposit/add')}
          />
        </Box>

        <Box bg="white">
          <FormProvider {...methods}>
            <form>
              <Box display={mode === 0 ? 'flex' : 'none'} minH="calc(100vh - 170px)">
                <Box
                  p="s16"
                  pb="100px"
                  width="100%"
                  display="flex"
                  flexDirection="column"
                  gap="s24"
                >
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
                        maritalStatus: memberDetailData?.maritalStatus,
                        dateJoined: memberDetailData?.dateJoined,
                        // branch: 'Basantapur',
                        phoneNo: memberDetailData?.contact,
                        email: memberDetailData?.email,
                        address: memberDetailData?.address,
                      }}
                      // notice="KYM needs to be updated"
                      signaturePath={memberSignatureUrl}
                      showSignaturePreview={false}
                      citizenshipPath={memberCitizenshipUrl}
                      cardBg="neutralColorLight.Gray-10"
                    />
                  )}

                  {memberId && (
                    <BulkDepositAccountsTable
                      memberId={memberId}
                      setTotalDepositAmount={setTotalDepositAmount}
                      setTotalRebate={setTotalRebate}
                    />
                  )}

                  {accounts?.length && (
                    <BulkDepositAccountsSummary
                      memberId={memberId}
                      totalDepositAmount={totalDepositAmount}
                      totalRebate={totalRebate}
                    />
                  )}
                </Box>
              </Box>

              <Payment mode={mode} totalDeposit={totalDepositAmount} rebate={0} />
            </form>
          </FormProvider>
        </Box>
      </Container>

      <Box position="relative" margin="0px auto">
        <Box bottom="0" position="fixed" width="100%" bg="gray.100" zIndex={10}>
          <Container minW="container.xl" height="fit-content">
            <FormFooter
              status={
                mode === 0 ? (
                  <Box display="flex" gap="s32">
                    <Text fontSize="r1" fontWeight={600} color="neutralColorLight.Gray-50">
                      Total Deposit Amount
                    </Text>
                    <Text fontSize="r1" fontWeight={600} color="neutralColorLight.Gray-70">
                      {totalDepositAmount + totalRebate ?? '---'}
                    </Text>
                  </Box>
                ) : (
                  <Button variant="solid" onClick={() => setMode(0)}>
                    Previous
                  </Button>
                )
              }
              mainButtonLabel={mode === 0 ? 'Proceed to Payment' : 'Submit'}
              mainButtonHandler={mode === 0 ? () => setMode(1) : handleSubmit}
            />
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default AddBulkDeposit;
