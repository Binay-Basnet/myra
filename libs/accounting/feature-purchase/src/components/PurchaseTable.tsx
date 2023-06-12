import { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import { useDeepCompareEffect } from 'react-use';

import { FormSection } from '@myra-ui';
import { Column } from '@myra-ui/editable-table';

import { useGetInventoryItemsListQuery, useGetWarehouseListQuery } from '@coop/cbs/data-access';
import { FormEditableTable } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

type PurchaseTableType = {
  itemId?: string;
  quantity?: string;
  rate?: string;
  tax?: string;
  amount?: string;
  description?: string;
  warehouse?: string;
};

export const PurchaseTable = () => {
  const { t } = useTranslation();

  const { data: inventoryItems } = useGetInventoryItemsListQuery({
    pagination: {
      after: '',
      first: -1,
    },
  });
  const inventoryItemsData = inventoryItems?.inventory?.items?.list?.edges;
  const accountSearchOptions = useMemo(
    () =>
      inventoryItemsData?.map((account) => ({
        label: `${account?.node?.name}`,
        value: account?.node?.id as string,
      })),
    [inventoryItemsData]
  );
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
  const { watch, setValue } = useFormContext();
  const itemDetails = watch('itemDetails');

  useDeepCompareEffect(() => {
    if (itemDetails?.length) {
      setValue(
        'itemDetails',
        itemDetails?.map((items: PurchaseTableType) => {
          const costPrice = inventoryItemsData?.find((item) => items?.itemId === item?.node?.id)
            ?.node?.costPrice;
          const taxData = String(
            inventoryItemsData?.find((item) => items?.itemId === item?.node?.id)?.node?.taxValue ??
              '0'
          );

          // const amount = String(Number(items.quantity || 0) * Number(items.rate || 0));

          return {
            itemId: items?.itemId,
            quantity: items?.quantity,

            rate: items?.rate || costPrice,
            tax: taxData,
            amount: items?.amount,
            description: items?.description,
            warehouse: items?.warehouse,
          };
        })
      );
    }
  }, [itemDetails, inventoryItemsData]);
  const tableColumns: Column<PurchaseTableType>[] = [
    {
      accessor: 'itemId',
      header: t['accountingPurchaseTableProduct'],
      fieldType: 'select',
      selectOptions: accountSearchOptions,
      cellWidth: 'md',
    },
    {
      accessor: 'quantity',
      header: t['accountingPurchaseTableQuantity'],
      // isNumeric: true,
    },
    {
      accessor: 'rate',
      header: 'Purchase Rate',
      // accessorFn: (row: any) =>
      //   inventoryItemsData?.find((item) => row?.itemId?.value === item?.node?.id)
      //     ? (inventoryItemsData?.find((item) => row?.itemId?.value === item?.node?.id)?.node
      //         ?.costPrice as string)
      //     : '',
    },
    {
      accessor: 'tax',
      header: 'Tax(%)',
      getDisabled: () => true,

      // accessorFn: (row: any) =>
      //   inventoryItemsData?.find((item) => row?.itemId?.value === item?.node?.id)
      //     ? String(
      //         inventoryItemsData?.find((item) => row?.itemId?.value === item?.node?.id)?.node
      //           ?.taxValue as number
      //       )
      //     : '',
    },
    {
      accessor: 'amount',
      header: t['accountingPurchaseTableAmount'],

      accessorFn: (row: PurchaseTableType) =>
        String(Number(row.quantity || 0) * Number(row.rate || 0)),
    },
    {
      accessor: 'description',
      header: t['accountingPurchaseTableProductDescription'],
      hidden: true,

      fieldType: 'textarea',
    },
    {
      accessor: 'warehouse',
      header: 'Warehouse',
      // hidden: true,
      fieldType: 'select',
      selectOptions: wareHouseSearchOptions,
    },
  ];

  return (
    <FormSection flexLayout>
      <FormEditableTable<PurchaseTableType> name="itemDetails" columns={tableColumns} />
    </FormSection>
  );
};
