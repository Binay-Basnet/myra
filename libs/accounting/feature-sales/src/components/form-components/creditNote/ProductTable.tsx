import { useMemo } from 'react';

import { FormSection, GridItem } from '@myra-ui';
import { Column } from '@myra-ui/editable-table';

import { useGetInventoryItemsListQuery, useGetWarehouseListQuery } from '@coop/cbs/data-access';
import { FormEditableTable } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

type SalesTable = {
  itemId: string;
  quantity: number;
  rate: number;
  tax: number;
  amount: number;
  description?: string;
  warehouse?: number;
  salesLedger?: string;
};

export const ProductTable = () => {
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
        label: account?.node?.name as string,
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

  const tableColumns: Column<SalesTable>[] = [
    {
      accessor: 'itemId',
      header: t['accountingPurchaseTableProduct'],
      cellWidth: 'auto',
      fieldType: 'select',
      selectOptions: accountSearchOptions,
    },
    {
      accessor: 'quantity',
      header: t['accountingPurchaseTableQuantity'],
      // isNumeric: true,
    },
    {
      accessor: 'rate',
      header: t['accountingPurchaseTableRate'],
      accessorFn: (row: any) =>
        inventoryItemsData?.find((item) => row?.itemId?.value ?? row?.itemId === item?.node?.id)
          ? (inventoryItemsData?.find(
              (item) => row?.itemId?.value ?? row?.itemId === item?.node?.id
            )?.node?.sellingPrice as string)
          : '',
    },
    {
      accessor: 'tax',
      header: 'Tax(%)',

      accessorFn: (row: any) =>
        inventoryItemsData?.find((item) => row?.itemId?.value ?? row?.itemId === item?.node?.id)
          ? String(
              inventoryItemsData?.find(
                (item) => row?.itemId?.value ?? row?.itemId === item?.node?.id
              )?.node?.taxValue as number
            )
          : '',
    },
    {
      accessor: 'amount',
      header: t['accountingPurchaseTableAmount'],

      accessorFn: (row: SalesTable) =>
        row?.amount ?? String(Number(row.quantity || 0) * Number(row.rate || 0)),
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
    <FormSection>
      <GridItem colSpan={3}>
        <FormEditableTable<SalesTable> name="products" columns={tableColumns} />
      </GridItem>
    </FormSection>
  );
};
