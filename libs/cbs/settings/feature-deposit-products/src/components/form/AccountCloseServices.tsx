import { useGetCoaListQuery } from '@coop/cbs/data-access';
import { FormEditableTable } from '@coop/shared/form';
import { FormSection, GridItem } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

type AccountServiceTable = {
  serviceName: string;
  ledgerName: string;
  amount: number;
};

export const AccountCloseServices = () => {
  const { t } = useTranslation();

  const { data: coa } = useGetCoaListQuery({
    filter: {
      active: true,
    },
  });

  const coaData = coa?.settings?.general?.chartsOfAccount?.accounts?.data;

  const coaList = coaData?.map((item) => {
    return {
      label: item?.name?.en as string,
      value: item?.id as string,
    };
  });

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
              selectOptions: coaList,
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
