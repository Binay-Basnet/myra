import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import { asyncToast, FormSection } from '@myra-ui';

import {
  PlEntry,
  useYearEndLedgerAccountListQuery,
  useYearEndSettlementMutation,
} from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import { FormLayout, FormLeafCoaHeadSelect } from '@coop/shared/form';

import { LedgerAccountTable } from '../component';

export const YearEndClose = () => {
  const router = useRouter();

  const methods = useForm();

  const { data: ledgerAccountListData } = useYearEndLedgerAccountListQuery();

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
          </FormSection>

          <FormSection
            templateColumns={1}
            header="All Ledgers of 160"
            subHeader="All ledgers with 160.* are listed here with its balance"
          >
            <LedgerAccountTable
              data={
                (ledgerAccountListData?.transaction?.yearEnd?.getCurrentState?.data
                  ?.incomeEntries as PlEntry[]) ?? []
              }
            />
          </FormSection>
        </FormLayout.Form>
      </FormLayout.Content>

      <FormLayout.Footer
        mainButtonLabel="Initiate Year End"
        mainButtonHandler={handleYearEndSettlement}
      />
    </FormLayout>
  );
};
