import { FormSection } from '@myra-ui';

import { LedgerType } from '@coop/cbs/data-access';
import { FormLeafCoaHeadSelect, FormLedgerTagSelect, FormSelect } from '@coop/shared/form';

const ledgerTypeOptions = [
  { label: 'Debit', value: LedgerType.Debit },
  { label: 'Credit', value: LedgerType.Credit },
  { label: 'Both', value: LedgerType.Both },
];

export const SourceDetails = () => (
  <FormSection header="Source Details" templateColumns={3}>
    <FormLeafCoaHeadSelect name="coaHead" label="COA Head" isMulti />

    <FormLedgerTagSelect name="tagId" label="Reporting Tags" />

    <FormSelect name="ledgerType" label="Ledger Type" options={ledgerTypeOptions} />
  </FormSection>
);
