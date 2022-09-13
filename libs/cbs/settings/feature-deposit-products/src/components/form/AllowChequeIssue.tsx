import { useGetCoaListQuery } from '@coop/cbs/data-access';
import { FormEditableTable } from '@coop/shared/form';
import { GridItem } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

type AllowChequeTable = {
  serviceName: string;
  ledgerName: string;
  amount: number;
};

export const AllowChequeIssue = () => {
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
    <GridItem mt="s32" colSpan={3}>
      <FormEditableTable<AllowChequeTable>
        name="chequeCharge"
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
  );
};
