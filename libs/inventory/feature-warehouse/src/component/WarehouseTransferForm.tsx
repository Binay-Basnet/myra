import { useMemo } from 'react';

import { Box, FormSection } from '@myra-ui';

import { useGetWarehouseListQuery } from '@coop/cbs/data-access';
import { FormDatePicker, FormInput, FormSelect, FormTextArea } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

import { WarehouseTransferTable } from './WareHouseTransferEditableTable';

export const WarehouseTransferForm = () => {
  const { t } = useTranslation();
  const { data: wareHouse } = useGetWarehouseListQuery({
    paginate: {
      after: '',
      first: -1,
    },
  });
  const warehouseData = wareHouse?.inventory?.warehouse?.listWarehouses?.edges;
  const wareHouseSearchOptions = useMemo(
    () =>
      warehouseData?.map((account) => ({
        label: account?.node?.name as string,
        value: account?.node?.id as string,
      })),
    [warehouseData]
  );
  return (
    <>
      <FormSection header="Warehouse Transfer" templateColumns={2}>
        <FormSelect
          name="sourceWarehouse"
          label={t['warehouseTransferSourceWarehouse']}
          __placeholder={t['warehouseTransferSourceWarehouse']}
          options={wareHouseSearchOptions}
        />
        <FormSelect
          name="destinationWarehouse"
          label={t['warehouseTransferDestinationWarehouse']}
          __placeholder={t['warehouseTransferDestinationWarehouse']}
          options={wareHouseSearchOptions}
        />

        <FormInput
          name="authorizedSender"
          label={t['warehouseTransferAuthorizedSender']}
          __placeholder={t['warehouseTransferSelectAuthorizedSender']}
        />

        <FormInput
          name="authorizedReceiver"
          label={t['warehouseTransferAuthorizedReceiver']}
          __placeholder={t['warehouseTransferSelectAuthorizedReceiver']}
        />
        <FormDatePicker name="date" label={t['warehouseTransferDate']} />
        <FormInput
          type="text"
          name="referenceNumber"
          label={t['warehouseTransferReferenceNumber']}
        />
      </FormSection>
      <WarehouseTransferTable />
      <Box flexDirection="column" display="flex" gap="s16" p="s16">
        <Box w="500px">
          <FormTextArea
            name="note"
            label={t['warehouseTransferDescription']}
            __placeholder={t['warehouseTransferNote']}
          />
        </Box>
      </Box>
    </>
  );
};
