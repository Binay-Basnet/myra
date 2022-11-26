import { useGetCoaBankListQuery } from '@coop/cbs/data-access';
import { FormEditableTable } from '@coop/shared/form';
import { FormSection, GridItem } from '@myra-ui';
import { featureCode, useTranslation } from '@coop/shared/utils';

type AccountServiceTable = {
  serviceName: string;
  ledgerName: string;
  amount: number;
};

export const AccountCloseServices = () => {
  const { t } = useTranslation();

  const { data } = useGetCoaBankListQuery({
    accountCode: featureCode.ledgerAccountCode as string[],
  });

  const ledgerData = data?.settings?.chartsOfAccount?.accountsUnder?.data;

  const legderOptions = ledgerData?.map((item) => ({
    label: item?.name?.local as string,
    value: item?.id as string,
  }));

  return (
    <FormSection
      header="depositProductAccountCloseServiceCharge"
      subHeader="depositProductAdddifferentservicecharges"
    >
      <GridItem colSpan={3}>
        <FormEditableTable<AccountServiceTable>
          name="accountCloseCharge"
          debug={false}
          columns={[
            {
              accessor: 'serviceName',
              header: t['depositProductAccServiceTableServiceName'],
              cellWidth: 'auto',
            },
            {
              accessor: 'ledgerName',
              header: t['depositProductAccServiceTableLedgerName'],
              fieldType: 'select',
              cellWidth: 'auto',
              selectOptions: legderOptions,
            },
            {
              accessor: 'amount',
              header: t['depositProductAccServiceTableAmount'],
              cellWidth: 'auto',
              isNumeric: true,
            },
          ]}
        />
      </GridItem>
    </FormSection>
  );
};
