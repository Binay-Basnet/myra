import { useEffect, useMemo, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { Box, FormSection } from '@myra-ui';

import {
  useAppSelector,
  useGetBranchListQuery,
  useGetWarehouseListQuery,
} from '@coop/cbs/data-access';
import { FormDatePicker, FormInput, FormSelect, FormTextArea } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

import { WarehouseTransferTable } from './WareHouseTransferEditableTable';

export const WarehouseTransferForm = () => {
  const [triggerQuery, setTriggerQuery] = useState(false);

  const { t } = useTranslation();
  const user = useAppSelector((state) => state.auth.user);
  const currentBranchId = user?.currentBranch?.id;

  const { data: branchData } = useGetBranchListQuery({
    paginate: {
      after: '',
      first: -1,
    },
  });

  const serviceCenterOptions = branchData?.settings?.general?.branch?.list?.edges?.map((data) => ({
    label: data?.node?.name as string,
    value: data?.node?.id as string,
  }));

  const { data: wareHouse } = useGetWarehouseListQuery({
    paginate: {
      after: '',
      first: -1,
    },
    filter: {
      orConditions: [
        {
          andConditions: [
            {
              column: 'branch_id',
              comparator: 'EqualTo',
              value: currentBranchId,
            },
          ],
        },
      ],
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

  const methods = useFormContext();
  const { watch } = methods;
  const destinationBranchId = watch('branchId');
  const { data: wareHouseDest } = useGetWarehouseListQuery(
    {
      paginate: {
        after: '',
        first: -1,
      },
      filter: {
        orConditions: [
          {
            andConditions: [
              {
                column: 'branch_id',
                comparator: 'EqualTo',
                value: destinationBranchId,
              },
            ],
          },
        ],
      },
    },
    {
      enabled: triggerQuery,
    }
  );
  const warehouseDataDestination = wareHouseDest?.inventory?.warehouse?.listWarehouses?.edges;
  const wareHouseDestinationSearch = useMemo(
    () =>
      warehouseDataDestination?.map((account) => ({
        label: account?.node?.name as string,
        value: account?.node?.id as string,
      })),
    [warehouseDataDestination]
  );

  useEffect(() => {
    if (destinationBranchId) {
      setTriggerQuery(true);
    }
  }, [destinationBranchId]);

  return (
    <>
      <FormSection header="Warehouse Transfer" templateColumns={2}>
        <FormSelect
          name="sourceWarehouse"
          label={t['warehouseTransferSourceWarehouse']}
          __placeholder={t['warehouseTransferSourceWarehouse']}
          options={wareHouseSearchOptions}
        />
        <FormSelect label="Select Service Center" options={serviceCenterOptions} name="branchId" />

        <FormSelect
          name="destinationWarehouse"
          label={t['warehouseTransferDestinationWarehouse']}
          __placeholder={t['warehouseTransferDestinationWarehouse']}
          options={wareHouseDestinationSearch}
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
