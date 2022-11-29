import { Box, FormSection, GridItem } from '@myra-ui';

import { COASelectModal } from '@coop/shared/components';
import { FormEditableTable } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

type LoanProcessingTable = {
  serviceName: string;
  ledgerName: string;
  amount: number;
};

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
            name="loanProcessingCharge"
            debug={false}
            columns={[
              {
                accessor: 'serviceName',
                header: t['loanAccServiceTableServiceName'],
                cellWidth: 'auto',
              },
              {
                accessor: 'ledgerName',
                header: t['loanAccServiceTableLedgerName'],
                cellWidth: 'auto',
                fieldType: 'modal',
                modal: COASelectModal,
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
