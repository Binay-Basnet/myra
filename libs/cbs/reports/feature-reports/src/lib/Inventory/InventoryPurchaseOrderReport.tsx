import { useEffect, useMemo, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { Box, GridItem } from '@myra-ui';

import {
  LocalizedDateFilter,
  PurchaseReportData,
  PurchaseReportFilter,
  useGetInventoryItemsListQuery,
  useGetInventoryPurchaseReportQuery,
  useGetSettingsUserListDataQuery,
  useGetWarehouseListQuery,
} from '@coop/cbs/data-access';
import { Report } from '@coop/cbs/reports';
import { ReportDateRange } from '@coop/cbs/reports/components';
import { Report as ReportEnum } from '@coop/cbs/reports/list';
import { localizedDate } from '@coop/cbs/utils';
import { FormBranchSelect, FormSelect } from '@coop/shared/form';
import { amountConverter, quantityConverter, useIsCbs } from '@coop/shared/utils';

type InventoryRegisterFilter = {
  period: LocalizedDateFilter;

  branchId: {
    label: string;
    value: string;
  }[];
  itemIds: {
    label: string;
    value: string;
  }[];
  warehouseId: {
    label: string;
    value: string;
  }[];
  filter: {
    creatorIds: {
      label: string;
      value: string;
    }[];
  };
};

export const InventoryPurchaseOrderReport = () => {
  const [filters, setFilters] = useState<InventoryRegisterFilter | null>(null);
  const { isCbs } = useIsCbs();
  const { data: userListData } = useGetSettingsUserListDataQuery({
    // filter: { role: [Roles.Agent] },
    paginate: { after: '', first: -1 },
  });
  const userList = userListData?.settings?.myraUser?.list?.edges;
  const warehouseIds =
    filters?.warehouseId && filters?.warehouseId?.length !== 0
      ? filters?.warehouseId?.map((t) => t.value)
      : null;

  const itemsIds =
    filters?.itemIds && filters?.itemIds?.length !== 0
      ? filters?.itemIds?.map((t) => t.value)
      : null;

  const creatorsIds =
    filters?.filter?.creatorIds && filters?.filter?.creatorIds?.length !== 0
      ? filters?.filter?.creatorIds?.map((t) => t.value)
      : null;

  const { data, isFetching } = useGetInventoryPurchaseReportQuery(
    {
      data: {
        period: {
          from: filters?.period?.from,
          to: filters?.period?.to,
        } as LocalizedDateFilter,
        warehouseId: warehouseIds,

        itemIds: itemsIds,
        filter: { creatorIds: creatorsIds },
      } as PurchaseReportFilter,
    },
    { enabled: !!filters }
  );

  const inventoryReport = data?.report?.accountingReport?.purchaseReport?.data;
  const reportSummary = data?.report?.accountingReport?.purchaseReport?.footer;

  return (
    <Report
      defaultFilters={null}
      data={inventoryReport as PurchaseReportData[]}
      filters={filters}
      setFilters={setFilters}
      isLoading={isFetching}
      report={ReportEnum.INVENTORY_PURCHASE_ORDER_REPORT}
    >
      <Report.Header>
        <Report.PageHeader
          paths={[
            {
              label: 'Inventory Reports',
              link: isCbs
                ? '/cbs/reports/cbs-reports/inventory'
                : '/accounting/reports/accounting-reports/inventory',
            },
            {
              label: 'Inventory Purchase Order Report',
              link: isCbs
                ? '/cbs/reports/cbs-reports/inventory/purchase-order/new'
                : '/accounting/reports/accounting-reports/inventory/purchase-order/new',
            },
          ]}
        />
        <Report.Inputs>
          <InventoryPurchaseReportInputs />
        </Report.Inputs>
      </Report.Header>

      <Report.Body>
        <Report.Content>
          <Report.OrganizationHeader />
          <Report.Organization />
          <Report.Table<PurchaseReportData & { index: number }>
            showFooter
            columns={[
              {
                header: 'S.No.',
                accessorKey: 'index',
                footer: () => <Box textAlign="center">Total </Box>,
                meta: {
                  width: '60px',
                  Footer: {
                    colspan: 5,
                  },
                },
              },
              {
                header: 'Product Order Id',
                accessorKey: 'purchaseOrderId',
                meta: {
                  Footer: {
                    display: 'none',
                  },
                },
              },
              {
                header: 'Vendor Name',
                accessorKey: 'vendorName',
                meta: {
                  Footer: {
                    display: 'none',
                  },
                },
              },
              {
                header: 'Product Details',
                accessorKey: 'productDetail',
                meta: {
                  Footer: {
                    display: 'none',
                  },
                },
              },
              {
                header: 'Vendor ID',
                accessorKey: 'vendorId',
                meta: {
                  Footer: {
                    display: 'none',
                  },
                },
              },
              {
                header: 'Purchase Order Quantity',
                accessorKey: 'purchaseOrderQuantity',
                cell: (props) =>
                  quantityConverter(props?.row?.original?.purchaseOrderQuantity || '0'),
                footer: () =>
                  quantityConverter((String(reportSummary?.totalQuantity) || 0) as string),

                meta: {
                  isNumeric: true,
                },
              },
              {
                header: 'Reference No',
                accessorKey: 'referenceNo',
              },
              {
                header: 'Date',
                accessorKey: 'date',
                cell: (props) => localizedDate(props?.row?.original?.date),
                meta: {
                  skipExcelFormatting: true,
                },
              },
              {
                header: 'Delivery Date',
                accessorKey: 'deliveryDate',
                cell: (props) => localizedDate(props?.row?.original?.deliveryDate),
                meta: {
                  skipExcelFormatting: true,
                },
              },
              {
                header: 'Pre-Rate',
                accessorKey: 'preRate',
                cell: (props) => amountConverter(props?.row?.original?.preRate || '0'),
                footer: () => reportSummary?.totalPreRate || 0,

                meta: {
                  isNumeric: true,
                },
              },

              {
                header: 'Total Price(Without Vat)',
                accessorKey: 'totalPriceWithoutVat',
                cell: (props) => amountConverter(props?.row?.original?.totalPriceWithoutVat || '0'),
                footer: () => reportSummary?.sumPriceWithoutVat || 0,

                meta: {
                  isNumeric: true,
                },
              },
              {
                header: 'Vat',
                accessorKey: 'vat',
                cell: (props) => amountConverter(props?.row?.original?.vat || '0'),
                footer: () => reportSummary?.totalVat || 0,

                meta: {
                  isNumeric: true,
                },
              },
              {
                header: 'Total Amount',
                accessorKey: 'totalAmount',
                cell: (props) => amountConverter(props?.row?.original?.totalAmount || '0'),
                footer: () => reportSummary?.sumAmount || 0,
                meta: {
                  isNumeric: true,
                },
              },
            ]}
          />
        </Report.Content>
        <Report.Filters>
          <Report.Filter title="User Select">
            <FormSelect
              label="Purchased By User"
              isMulti
              options={userList?.map((user) => ({
                label: user.node?.name as string,
                value: user.node?.id as string,
              }))}
              name="filter.creatorIds"
            />
          </Report.Filter>
        </Report.Filters>
      </Report.Body>
    </Report>
  );
};

// const InventoryPurchaseReportInput = () => {
//   const { data: inventoryItems } = useGetInventoryItemsListQuery({
//     pagination: {
//       after: '',
//       first: -1,
//     },
//   });
//   const inventoryItemsData = inventoryItems?.inventory?.items?.list?.edges;
//   const itemSearchOptions = useMemo(
//     () =>
//       inventoryItemsData?.map((account) => ({
//         label: account?.node?.name as string,
//         value: account?.node?.id as string,
//       })),
//     [inventoryItemsData]
//   );

//   return (
//     <>
//       <GridItem colSpan={1}>
//         <FormBranchSelect
//           showUserBranchesOnly
//           isMulti
//           name="branchId"
//           label="Select Service Center"
//         />
//       </GridItem>

//       <GridItem colSpan={1}>
//         <FormSelect isMulti name="itemIds" label="Select Items" options={itemSearchOptions} />
//       </GridItem>

//       <GridItem colSpan={2}>
//         <ReportDateRange />
//       </GridItem>
//     </>
//   );
// };

const InventoryPurchaseReportInputs = () => {
  const [triggerQuery, setTriggerQuery] = useState(false);
  const methods = useFormContext<InventoryRegisterFilter>();

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
  const { watch } = methods;
  const branchIds = watch('branchId');
  const { data: warehouseData } = useGetWarehouseListQuery(
    {
      paginate: { after: '', first: -1 },
      filter: {
        orConditions: [
          {
            andConditions: [
              {
                column: 'branchid',
                value: watch('branchId')?.map((branch) => branch.value) || [],
                comparator: 'IN',
              },
            ],
          },
        ],
      },
    },
    { enabled: triggerQuery }
  );
  useEffect(() => {
    if (branchIds?.length) {
      setTriggerQuery(true);
    }
  }, [branchIds]);

  return (
    <>
      <GridItem colSpan={1}>
        <FormBranchSelect
          showUserBranchesOnly
          isMulti
          name="branchId"
          label="Select Service Center"
        />
      </GridItem>

      <GridItem colSpan={1}>
        <FormSelect isMulti name="itemIds" label="Select Items" options={itemSearchOptions} />
      </GridItem>
      <GridItem colSpan={1}>
        <FormSelect
          isMulti
          name="warehouseId"
          label="Select Warehouse"
          options={
            branchIds?.length
              ? warehouseData?.inventory?.warehouse?.listWarehouses?.edges?.map((bank) => ({
                  label: bank?.node?.name as string,
                  value: bank?.node?.id as string,
                }))
              : undefined
          }
        />
      </GridItem>
      <GridItem colSpan={1}>
        <ReportDateRange />
      </GridItem>
    </>
  );
};
