import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import { asyncToast, Box, FormSection, Text } from '@myra-ui';

import {
  PlEntry,
  useYearEndLedgerAccountListQuery,
  useYearEndSettlementMutation,
} from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import { FormLayout, FormLeafCoaHeadSelect } from '@coop/shared/form';
import { debitCreditConverter } from '@coop/shared/utils';

import { LedgerAccountTable } from '../component';

export const YearEndClose = () => {
  const router = useRouter();

  const methods = useForm();

  const { watch } = methods;

  const destinationCOALeaf = watch('destinationCOALeaf');

  const { data: ledgerAccountListData } = useYearEndLedgerAccountListQuery();

  const ledgerData = ledgerAccountListData?.transaction?.yearEnd?.getCurrentState?.data;

  const { mutateAsync } = useYearEndSettlementMutation();

  const handleYearEndSettlement = () => {
    asyncToast({
      id: 'year-end-settlement',
      msgs: {
        loading: 'Initiating year end settlement',
        success: 'Year end settlement successful',
      },
      promise: mutateAsync({ destinationCOALeaf: methods.getValues()?.['destinationCOALeaf'] }),
      onSuccess: () => router.push(ROUTES.HOME),
    });
  };

  // const isMainButtonDisabled = useMemo(()=>{
  //   if
  // },[ledgerAccountListData])

  return (
    <FormLayout methods={methods}>
      <FormLayout.Header title="Year End Close" />

      <FormLayout.Content>
        <FormLayout.Form>
          <FormSection templateColumns={2}>
            <FormLeafCoaHeadSelect name="destinationCOALeaf" label="COA Head" />
          </FormSection>

          <FormSection
            templateColumns={1}
            header="All Ledgers of 150"
            subHeader="All ledgers with 150.* are listed here with its balance"
          >
            <LedgerAccountTable
              data={
                (ledgerAccountListData?.transaction?.yearEnd?.getCurrentState?.data
                  ?.expenseEntries as PlEntry[]) ?? []
              }
            />

            <Box display="flex" justifyContent="space-between">
              <Text>Total Expense</Text>

              <Text>
                {debitCreditConverter(
                  ledgerData?.totalExpense?.amount as string,
                  ledgerData?.totalExpense?.amountType as string
                )}
              </Text>
            </Box>
          </FormSection>

          <FormSection
            templateColumns={1}
            header="All Ledgers of 160"
            subHeader="All ledgers with 160.* are listed here with its balance"
          >
            <LedgerAccountTable data={(ledgerData?.incomeEntries as PlEntry[]) ?? []} />

            <Box display="flex" justifyContent="space-between">
              <Text>Total Income</Text>

              <Text>
                {debitCreditConverter(
                  ledgerData?.totalIncome?.amount as string,
                  ledgerData?.totalIncome?.amountType as string
                )}
              </Text>
            </Box>
          </FormSection>
        </FormLayout.Form>
      </FormLayout.Content>

      <FormLayout.Footer
        mainButtonLabel="Initiate Year End"
        mainButtonHandler={handleYearEndSettlement}
        isMainButtonDisabled={
          !destinationCOALeaf ||
          (!ledgerData?.expenseEntries?.length && !ledgerData?.incomeEntries?.length)
        }
      />
    </FormLayout>
  );
};
