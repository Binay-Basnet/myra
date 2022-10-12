import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { useRouter } from 'next/router';

import {
  useGetCoaListQuery,
  useGetDepositProductSettingsEditDataQuery,
} from '@coop/cbs/data-access';
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
  const router = useRouter();
  const id = String(router?.query?.['id']);

  const methods = useFormContext();

  const { reset } = methods;

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

  const { data: editValues } = useGetDepositProductSettingsEditDataQuery(
    {
      id,
    },
    {
      staleTime: 0,
    }
  );

  const editedData = editValues?.settings?.general?.depositProduct?.formState?.data;

  useEffect(() => {
    reset({
      ...editedData,
      alternativeChannelCharge: editedData?.alternativeChannelCharge?.map((record) => ({
        serviceName: record?.serviceName,
        ledgerName: record?.ledgerName,
        amount: record?.amount,
      })),
    });
  }, [editValues]);

  return (
    <GridItem mt="s32" colSpan={3}>
      <FormEditableTable<AlternativeChannelTable>
        name="alternativeChannelCharge"
        canAddRow={false}
        debug={false}
        defaultData={[
          {
            serviceName: 'Mobile Banking',
            amount: 0,
            ledgerName: ' ',
          },
          {
            serviceName: 'Ebanking',
            amount: 0,
            ledgerName: ' ',
          },
          {
            serviceName: 'Sms banking',
            amount: 0,
            ledgerName: ' ',
          },
        ]}
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
