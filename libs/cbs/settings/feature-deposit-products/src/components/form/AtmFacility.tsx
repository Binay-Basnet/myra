import { useGetCoaBankListQuery } from '@coop/cbs/data-access';
import { FormEditableTable } from '@coop/shared/form';
import { GridItem } from '@coop/shared/ui';
import { featureCode, useTranslation } from '@coop/shared/utils';

type AtmFacilityTable = {
  serviceName: string;
  ledgerName: string;
  amount: number;
};

export const AtmFacility = () => {
  const { t } = useTranslation();

  const { data } = useGetCoaBankListQuery({
    accountCode: featureCode.ledgerAccountCode as string[],
  });

  const ledgerData = data?.settings?.chartsOfAccount?.accountsUnder?.data;
  const legderOptions = ledgerData?.map((item) => ({
    label: item?.name?.local as string,
    value: item?.id as string,
  }));

  const atmList = [{ label: 'Atm charge', value: 'Atm charge' }];

  return (
    <GridItem mt="s32" colSpan={3}>
      <FormEditableTable<AtmFacilityTable>
        name="atmCharge"
        debug={false}
        columns={[
          {
            accessor: 'serviceName',
            header: t['depositProductAccServiceTableServiceName'],
            cellWidth: 'auto',
            fieldType: 'search',
            searchOptions: atmList,
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
  );
};
