import { useGetCoaBankListQuery } from '@coop/cbs/data-access';
import { FormEditableTable } from '@coop/shared/form';
import { Box, FormSection, GridItem } from '@coop/shared/ui';
import { featureCode, useTranslation } from '@coop/shared/utils';

type LoanProcessingTable = {
  serviceName: string;
  ledgerName: string;
  amount: number;
};

export const LoanProcessing = () => {
  const { t } = useTranslation();

  const { data } = useGetCoaBankListQuery({
    accountCode: featureCode.ledgerAccountCode as string[],
  });

  const ledgerData = data?.settings?.chartsOfAccount?.accountsUnder?.data;

  const ledgerName = ledgerData?.map((item) => ({
    label: item?.name?.local as string,
    value: item?.id as string,
  }));

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
                fieldType: 'select',
                cellWidth: 'auto',
                selectOptions: ledgerName,
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
