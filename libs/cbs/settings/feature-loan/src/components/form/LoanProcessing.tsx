import { FormEditableTable } from '@coop/shared/form';
import { Box, FormSection, GridItem } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

type LoanProcessingTable = {
  serviceName: string;
  ledgerName: string;
  amount: number;
};

const service_name = [
  { label: 'Cheque Book Issue', value: 'chequeBookIssue' },
  { label: 'Atm issue', value: 'atmIssue' },
];
const ledger_name = [
  {
    label: 'Purchase Ledger',
    value: 'purchaseLedger',
  },
  {
    label: 'Sales Ledger',
    value: 'salesLedger',
  },
];

export const LoanProcessing = () => {
  const { t } = useTranslation();

  return (
    <FormSection
      header="loanProductLoanProcessingCharge"
      subHeader="loanProductAdddifferentservicecharges"
    >
      <GridItem colSpan={3}>
        <Box>
          <FormEditableTable<LoanProcessingTable>
            name="serviceCharge"
            debug={false}
            columns={[
              {
                accessor: 'serviceName',
                header: t['loanAccServiceTableServiceName'],
                fieldType: 'select',
                cellWidth: 'auto',
                selectOptions: service_name,
              },
              {
                accessor: 'ledgerName',
                header: t['loanAccServiceTableLedgerName'],
                fieldType: 'select',
                cellWidth: 'auto',
                selectOptions: ledger_name,
              },
              {
                accessor: 'amount',
                header: t['loanAccServiceTableAmount'],
                cellWidth: 'auto',
                isNumeric: true,
              },
            ]}
          />
        </Box>
      </GridItem>
    </FormSection>
  );
};
