import { FormProvider, useForm } from 'react-hook-form';
import { useQueryClient } from 'react-query';
import { useRouter } from 'next/router';
import omit from 'lodash/omit';

import {
  CashValue,
  TellerTransferInput,
  TellerTransferType,
  useAppSelector,
  useSetTellerTransferDataMutation,
} from '@coop/cbs/data-access';
import { InputGroupContainer } from '@coop/cbs/kym-form/ui-containers';
import { FormAmountInput, FormEditableTable, FormInput, FormTellerSelect } from '@coop/shared/form';
import { asyncToast, Box, Container, FormFooter, FormHeader, Grid, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

/* eslint-disable-next-line */
export interface AddTellerTransferProps {}

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

type PaymentTableType = {
  value: string;
  quantity: string;
  amount: string;
};

type CustomTellerTransferInput = Omit<TellerTransferInput, 'denominations'> & {
  denominations: { value?: string; quantity?: number; amount?: string }[];
};

export const AddTellerTransfer = () => {
  const { t } = useTranslation();

  const router = useRouter();

  const queryClient = useQueryClient();

  const user = useAppSelector((state) => state?.auth?.user);

  const methods = useForm<CustomTellerTransferInput>({
    defaultValues: { srcTellerID: [user?.firstName?.local, user?.lastName?.local].join(' ') },
  });

  const { watch, getValues } = methods;

  const { mutateAsync: setVaultTransfer } = useSetTellerTransferDataMutation();

  const amount = watch('amount');

  const denominations = watch('denominations');

  const denominationTotal =
    denominations?.reduce(
      (accumulator: number, curr: { amount: string }) => accumulator + Number(curr.amount),
      0 as number
    ) ?? 0;

  const handleSubmit = () => {
    const values = getValues();

    const filteredValues = {
      ...omit({ ...values }, ['teller']),
      transferType: TellerTransferType.TellerTransfer,
      srcTellerID: user?.id,
      denominations:
        values?.denominations?.map(({ value, quantity }) => ({
          value: cashOptions[value as string],
          quantity,
        })) ?? [],
    };

    asyncToast({
      id: 'add-teller-transfer',
      msgs: {
        loading: 'Adding Teller Transfer',
        success: 'Teller Tansfer Added',
      },
      promise: setVaultTransfer({ data: filteredValues as TellerTransferInput }),
      onSuccess: () => {
        queryClient.invalidateQueries('getTellerTransactionListData');
        router.push('/transfer/teller-transfer/list');
      },
    });
  };

  return (
    <>
      <Container minW="container.xl" height="fit-content">
        <Box position="sticky" top="110px" bg="gray.100" width="100%" zIndex="10">
          <FormHeader
            title="New Teller Transfer"
            closeLink="/transfer/vault-transfer/list"
            // buttonLabel={t['addDepositAddBulkDeposit']}
            // buttonHandler={() => router.push('/transactions/deposit/add-bulk-deposit')}
          />
        </Box>

        <Box bg="white">
          <FormProvider {...methods}>
            <form>
              <Box minH="calc(100vh - 170px)">
                <Box
                  p="s20"
                  pb="100px"
                  width="100%"
                  display="flex"
                  flexDirection="column"
                  gap="s20"
                  borderRight="1px"
                  borderColor="border.layout"
                >
                  <Grid templateColumns="repeat(2, 1fr)" gap="s20" alignItems="flex-end">
                    <FormInput name="srcTellerID" label="Source Teller" isDisabled />

                    <FormTellerSelect name="destTellerID" label="Destination Teller" />
                  </Grid>

                  <Box display="flex" flexDirection="column" gap="s16" py="s20">
                    <InputGroupContainer>
                      <FormAmountInput name="amount" label="Cash Amount" />
                    </InputGroupContainer>

                    <FormEditableTable<PaymentTableType>
                      name="denominations"
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
                          Grand Total
                        </Text>
                        <Text fontSize="r1" fontWeight={400} color="neutralColorLight.Gray-60">
                          {denominationTotal}
                        </Text>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </form>
          </FormProvider>
        </Box>
      </Container>

      <Box position="relative" margin="0px auto">
        <Box bottom="0" position="fixed" width="100%" bg="gray.100" zIndex={10}>
          <Container minW="container.xl" height="fit-content">
            <FormFooter
              mainButtonLabel="Done"
              mainButtonHandler={handleSubmit}
              isMainButtonDisabled={Number(denominationTotal) !== Number(amount)}
            />
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default AddTellerTransfer;
