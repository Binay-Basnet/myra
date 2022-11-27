import { useGetCoaBankListQuery } from '@coop/cbs/data-access';
import { FormEditableTable } from '@coop/shared/form';
import { GridItem } from '@myra-ui';
import { featureCode, useTranslation } from '@coop/shared/utils';

type AllowChequeTable = {
  serviceName: string;
  ledgerName: string;
  amount: number;
};

export const AllowChequeIssue = () => {
  const { t } = useTranslation();

  const { data } = useGetCoaBankListQuery({
    accountCode: featureCode.ledgerAccountCode as string[],
  });

  const ledgerData = data?.settings?.chartsOfAccount?.accountsUnder?.data;
  const legderOptions = ledgerData?.map((item) => ({
    label: item?.name?.local as string,
    value: item?.id as string,
  }));

  const chequeList = [{ label: 'Cheque issue charge', value: 'Cheque issue charge' }];

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
            fieldType: 'search',
            searchOptions: chequeList,
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
