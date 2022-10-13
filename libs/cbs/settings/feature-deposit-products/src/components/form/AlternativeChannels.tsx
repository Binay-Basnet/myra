import { useGetCoaListQuery } from '@coop/cbs/data-access';
import { FormEditableTable } from '@coop/shared/form';
import { GridItem } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

type AlternativeChannelTable = {
  serviceName: string;
  ledgerName: string;
  amount: number;
};

export const AlternativeChannels = () => {
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

  const serviceList = [
    { label: 'Mobile Banking', value: 'Mobile Banking' },
    { label: 'Ebanking', value: 'Ebanking' },
    { label: 'Sms banking', value: 'Sms banking' },
  ];

  return (
    <GridItem mt="s32" colSpan={3}>
      <FormEditableTable<AlternativeChannelTable>
        name="alternativeChannelCharge"
        debug={false}
        columns={[
          {
            accessor: 'serviceName',
            header: t['depositProductAccServiceTableServiceName'],
            cellWidth: 'auto',
            fieldType: 'search',
            searchOptions: serviceList,
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
