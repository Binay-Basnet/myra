import { useRouter } from 'next/router';

import { Alert, Box, FormSection, GridItem, Text } from '@myra-ui';

import { COASelectModal } from '@coop/shared/components';
import { FormEditableTable } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

type LoanProcessingTable = {
  serviceName: string;
  ledgerName: string;
  amount: number;
  percentage: number;
};

export const LoanProcessing = () => {
  const { t } = useTranslation();

  const router = useRouter();

  return (
    <FormSection
      header="loanProductLoanProcessingCharge"
      subHeader="loanProductAdddifferentservicecharges"
    >
      <GridItem colSpan={3} cursor={router?.asPath?.includes('/edit') ? 'not-allowed' : 'auto'}>
        <Box pointerEvents={router?.asPath?.includes('/edit') ? 'none' : 'auto'} mb={2}>
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
                accessor: 'percentage',
                header: 'Rate',
                cellWidth: 'auto',
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

        <Alert status="warning">
          <Text fontWeight="Medium" fontSize="r1">
            If both amount and rate is filled, the total chage is the total sum of the two.
          </Text>
        </Alert>
      </GridItem>
    </FormSection>
  );
};
