import { useMemo, useState } from 'react';

import { Text } from '@myra-ui';
import { GridItem } from '@myra-ui/components';
import { ExpandedCell, ExpandedHeader } from '@myra-ui/table';

import {
  InventoryStockStatusData,
  InventoryStockStatusDataList,
  InventoryStockStatusFilter,
  useGetInventoryItemsListQuery,
  useGetInventoryStockStatusReportQuery,
  useGetWarehouseListQuery,
} from '@coop/cbs/data-access';
import { Report } from '@coop/cbs/reports';
import { Report as ReportEnum } from '@coop/cbs/reports/list';
import { localizedDate } from '@coop/cbs/utils';
import { FormDatePicker, FormSelect } from '@coop/shared/form';
import { amountConverter, useIsCbs } from '@coop/shared/utils';

type LoanGuranteeData = Partial<{
  itemCode: string;
  itemName: string;
  warehouseId: string;
  warehouseName: string;
  totalPurchased: string;
  totalSoled: string;
  totalTransferIn: string;
  totalTransferOut: string;
  totalNet: string;
  lower: InventoryStockStatusData[];

  purchasedQuantity: string;
  soldQuantity: string;
  purchasedDate: Record<'local' | 'en' | 'np', string> | null | undefined;
  soldDate: Record<'local' | 'en' | 'np', string> | null | undefined;
  netQuantity: string;
  transferAcceptQuantity: string;
  transferAcceptDate: Record<'local' | 'en' | 'np', string> | null | undefined;
  transferSentQuantity: string;
  transferSentDate: Record<'local' | 'en' | 'np', string> | null | undefined;
}>;

type ReportFilter = Omit<InventoryStockStatusFilter, 'warehouseId' | 'itemId'> & {
  warehouseId: { label: string; value: string }[];
  itemId: { label: string; value: string }[];
};

export const InventoryStockStatusReport = () => {
  const [filters, setFilters] = useState<ReportFilter | null>(null);
  const { isCbs } = useIsCbs();

  const wareHouseIds =
    filters?.warehouseId && filters?.warehouseId.length !== 0
      ? filters?.warehouseId?.map((t) => t.value)
      : [];
  const itemIds =
    filters?.itemId && filters?.itemId.length !== 0 ? filters?.itemId?.map((t) => t.value) : [];

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
  const { data: inventoryItems } = useGetInventoryItemsListQuery({
    pagination: {
      after: '',
      first: -1,
    },
  });
  const inventoryItemsData = inventoryItems?.inventory?.items?.list?.edges;
  const itemSearchOptions = useMemo(
    () =>
      inventoryItemsData?.map((account) => ({
        label: account?.node?.name as string,
        value: account?.node?.id as string,
      })),
    [inventoryItemsData]
  );

  const { data, isFetching } = useGetInventoryStockStatusReportQuery(
    {
      data: {
        period: filters?.period as Record<'local' | 'en' | 'np', string>,
        itemId: itemIds,
        warehouseId: wareHouseIds,
      },
    },
    { enabled: !!filters }
  );

  const loanReport = data?.report?.inventoryReport?.newinventoryStockStatusreport?.data?.map(
    (d) => ({
      ...d?.upper,
      children: d?.lower,
    })
  ) as LoanGuranteeData[];

  return (
    <Report
      data={loanReport as InventoryStockStatusDataList[]}
      isLoading={isFetching}
      report={ReportEnum.INVENTORY_STOCK_STATUS_REPORT}
      filters={filters}
      defaultFilters={null}
      setFilters={setFilters}
    >
      <Report.Header>
        <Report.PageHeader
          paths={[
            {
              label: 'Inventory Reports',
              link: isCbs ? '/reports/cbs/inventory' : '/accounting/reports/inventory',
            },
            {
              label: ReportEnum.INVENTORY_STOCK_STATUS_REPORT,
              link: isCbs
                ? '/reports/cbs/inventory/stock-status/new'
                : '/accounting/reports/inventory/stock-status/new',
            },
          ]}
        />

        <Report.Inputs>
          <GridItem colSpan={1}>
            <FormDatePicker name="period" label="Select Date" />
          </GridItem>
          <GridItem colSpan={1}>
            <FormSelect
              isMulti
              name="warehouseId"
              label="Select Warehouse"
              options={wareHouseSearchOptions}
            />
          </GridItem>
          <GridItem colSpan={1}>
            <FormSelect isMulti name="itemId" label="Select Items" options={itemSearchOptions} />
          </GridItem>
        </Report.Inputs>
      </Report.Header>
      <Report.Body>
        <Report.Content>
          <Report.OrganizationHeader />
          <Report.Organization />
          <Report.Table<LoanGuranteeData>
            columns={[
              {
                header: 'Item Details',
                columns: [
                  {
                    header: ({ table }) => <ExpandedHeader table={table} value="Item Details" />,
                    id: 'itemName',
                    accessorKey: 'itemName',
                    cell: (props) => (
                      <ExpandedCell
                        row={props.row}
                        value={<Text>{props?.row?.original?.itemName}</Text>}
                      />
                    ),
                  },
                  {
                    header: 'WareHouse Name',
                    accessorKey: 'warehouseName',
                    cell: (props) => props.row?.original?.warehouseName ?? '-',
                  },

                  {
                    header: 'Total Purchased',
                    accessorKey: 'totalPurchased',
                    cell: (row) =>
                      row.getValue() ? amountConverter(row.getValue() as string) : '',
                    meta: {
                      isNumeric: true,
                    },
                  },
                  {
                    header: 'Total Sold',
                    accessorKey: 'totalSoled',
                    cell: (row) =>
                      row.getValue() ? amountConverter(row.getValue() as string) : '',
                    meta: {
                      isNumeric: true,
                    },
                  },
                  {
                    header: 'Total Transfer In',
                    accessorKey: 'totalTransferIn',
                    cell: (row) =>
                      row.getValue() ? amountConverter(row.getValue() as string) : '',
                    meta: {
                      isNumeric: true,
                    },
                  },
                  {
                    header: 'Total Transfer Out',
                    accessorKey: 'totalTransferOut',
                    cell: (row) =>
                      row.getValue() ? amountConverter(row.getValue() as string) : '',
                    meta: {
                      isNumeric: true,
                    },
                  },
                  {
                    header: 'Net',
                    accessorKey: 'totalNet',
                    cell: (row) =>
                      row.getValue() ? amountConverter(row.getValue() as string) : '',
                    meta: {
                      isNumeric: true,
                    },
                  },
                ],
              },
              {
                header: 'Purchase Information',
                columns: [
                  {
                    header: 'Purchase Date',
                    accessorKey: 'purchasedDate',
                    cell: (props) =>
                      props.row?.original?.purchasedDate
                        ? localizedDate(props?.row?.original?.purchasedDate)
                        : '-',
                  },

                  {
                    header: 'Purchase Quantity',
                    accessorKey: 'purchasedQuantity',
                    cell: (row) =>
                      row.getValue() ? amountConverter(row.getValue() as string) : '-',
                    meta: {
                      isNumeric: true,
                    },
                  },
                ],
              },
              {
                header: 'Sales Information',
                columns: [
                  {
                    header: 'Sales Date',
                    accessorKey: 'soldDate',
                    cell: (props) =>
                      props.row?.original?.soldDate
                        ? localizedDate(props?.row?.original?.soldDate)
                        : '-',
                  },

                  {
                    header: 'Sales Quantity',
                    accessorKey: 'soldQuantity',
                    cell: (row) =>
                      row.getValue() ? amountConverter(row.getValue() as string) : '-',
                    meta: {
                      isNumeric: true,
                    },
                  },
                ],
              },
              {
                header: 'Sent Transfer Information',
                columns: [
                  {
                    header: 'Transfer Sent Date',
                    accessorKey: 'transferSentDate',
                    cell: (props) =>
                      props.row?.original?.transferSentDate
                        ? localizedDate(props?.row?.original?.transferSentDate)
                        : '-',
                  },

                  {
                    header: 'Transfer Sent Quantity',
                    accessorKey: 'transferSentQuantity',
                    cell: (row) =>
                      row.getValue() ? amountConverter(row.getValue() as string) : '-',
                    meta: {
                      isNumeric: true,
                    },
                  },
                ],
              },
              {
                header: 'Accepted Transfer Information',
                columns: [
                  {
                    header: 'Transfer Accepted Date',
                    accessorKey: 'transferSentDate',
                    cell: (props) =>
                      props.row?.original?.transferAcceptDate
                        ? localizedDate(props?.row?.original?.transferAcceptDate)
                        : '-',
                  },

                  {
                    header: 'Transfer Accepted Quantity',
                    accessorKey: 'transferAcceptQuantity',
                    cell: (row) =>
                      row.getValue() ? amountConverter(row.getValue() as string) : '-',
                    meta: {
                      isNumeric: true,
                    },
                  },
                ],
              },
            ]}
          />
        </Report.Content>
      </Report.Body>
    </Report>
  );
};
