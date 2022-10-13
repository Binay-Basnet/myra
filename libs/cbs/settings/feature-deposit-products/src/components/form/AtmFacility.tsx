import { useGetCoaListQuery } from '@coop/cbs/data-access';
import { FormEditableTable } from '@coop/shared/form';
import { GridItem } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

type AtmFacilityTable = {
  serviceName: string;
  ledgerName: string;
  amount: number;
};

export const AtmFacility = () => {
  const { t } = useTranslation();

  const { data: coa } = useGetCoaListQuery({
    filter: {
      active: true,
    },
  });

  const coaData = coa?.settings?.general?.chartsOfAccount?.accounts?.data;

  const coaList = coaData?.map((item) => ({
    label: item?.name?.en as string,
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
  );
};
