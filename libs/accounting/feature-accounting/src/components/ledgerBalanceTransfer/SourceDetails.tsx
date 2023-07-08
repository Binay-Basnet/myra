import { useMemo } from 'react';

import { FormSection } from '@myra-ui';

import { LedgerType, useGetEndOfDayDateDataQuery } from '@coop/cbs/data-access';
import {
  FormDatePicker,
  FormLeafCoaHeadSelect,
  FormLedgerTagSelect,
  FormSelect,
} from '@coop/shared/form';

const ledgerTypeOptions = [
  { label: 'Debit', value: LedgerType.Debit },
  { label: 'Credit', value: LedgerType.Credit },
  { label: 'Both', value: LedgerType.Both },
];

export const SourceDetails = () => {
  const { data: endOfDayData } = useGetEndOfDayDateDataQuery();
  const closingDate = useMemo(() => endOfDayData?.transaction?.endOfDayDate?.value, [endOfDayData]);

  return (
    <FormSection header="Source Details" templateColumns={3}>
      <FormLeafCoaHeadSelect name="coaHead" label="Select COA Head" isMulti />

      <FormLedgerTagSelect name="tagId" label="Reporting Tags" />

      <FormSelect name="ledgerType" label="Ledger Type" options={ledgerTypeOptions} />

      <FormDatePicker
        name="closingDate"
        label="Closing Date"
        maxDate={closingDate?.local ? new Date(closingDate?.en ?? '') : new Date()}
      />
    </FormSection>
  );
};
