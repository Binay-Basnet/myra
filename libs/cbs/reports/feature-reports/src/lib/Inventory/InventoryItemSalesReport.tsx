import { useEffect, useMemo, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { Box, GridItem } from '@myra-ui';

import {
  LocalizedDateFilter,
  SalesReportDataList,
  SalesReportFilter,
  useGetInventoryItemsListQuery,
  useGetInventorySalesReportQuery,
  useGetSettingsUserListDataQuery,
  useGetWarehouseListQuery,
} from '@coop/cbs/data-access';
import { Report } from '@coop/cbs/reports';
import { ReportDateRange } from '@coop/cbs/reports/components';
import { Report as ReportEnum } from '@coop/cbs/reports/list';
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

export const InventoryItemSalesReport = () => {
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

  const { data, isFetching } = useGetInventorySalesReportQuery(
    {
      data: {
        period: {
          from: filters?.period?.from,
          to: filters?.period?.to,
        },
        // branchId: warehouseIds,
        warehouseId: warehouseIds,

        itemIds: itemsIds,
        filter: {
          creatorIds: creatorsIds,
        },
      } as SalesReportFilter,
    },
    { enabled: !!filters }
  );

  const inventoryReport = data?.report?.accountingReport?.salesReport?.data;
  const reportSummary = data?.report?.accountingReport?.salesReport?.summationData;

  return (
    <Report
      defaultFilters={null}
      data={inventoryReport as SalesReportDataList[]}
      filters={filters}
      setFilters={setFilters}
      isLoading={isFetching}
      report={ReportEnum.INVENTORY_SALES_REPORT}
    >
      <Report.Header>
        <Report.PageHeader
          paths={[
            {
              label: 'Inventory Reports',
              link: isCbs ? '/reports/cbs/inventory' : '/accounting/reports/inventory',
            },
            {
              label: 'Inventory Item Sales Report',
              link: isCbs
                ? '/reports/cbs/inventory/item-sales/new'
                : '/accounting/reports/inventory/item-sales/new',
            },
          ]}
        />
        <Report.Inputs hideDate>
          <InventorySalesReportInputs />
        </Report.Inputs>
      </Report.Header>

      <Report.Body>
        <Report.Content>
          <Report.OrganizationHeader />
          <Report.Organization />
          <Report.Table<SalesReportDataList & { index: number }>
            showFooter
            columns={[
              {
                header: 'S.No.',
                accessorKey: 'index',
                footer: () => <Box textAlign="center">Total </Box>,
                meta: {
                  width: '60px',
                  Footer: {
                    colspan: 3,
                  },
                },
              },
              {
                header: 'Product Id',
                accessorKey: 'itemId',
                meta: {
                  Footer: {
                    display: 'none',
                  },
                },
              },
              {
                header: 'Units',
                accessorKey: 'unitName',
                meta: {
                  Footer: {
                    display: 'none',
                  },
                },
              },
              {
                header: 'Quantity Price(Without Vat)',
                accessorKey: 'selligPrice',
                cell: (props) => amountConverter(props?.row?.original?.selligPrice || '0'),
                footer: () =>
                  amountConverter((reportSummary?.totalPerQuantityPrice || 0) as string),

                meta: {
                  isNumeric: true,
                },
              },
              {
                header: 'Quantity Sold',
                accessorKey: 'soldQuantity',
                cell: (props) => quantityConverter(props?.row?.original?.soldQuantity || '0'),
                footer: () => quantityConverter((reportSummary?.totalQuantitySold || 0) as string),
                meta: {
                  isNumeric: true,
                },
              },

              {
                header: 'Total Price(Without Vat)',
                accessorKey: 'totalPrice',
                cell: (props) => amountConverter(props?.row?.original?.totalPrice || '0'),
                footer: () => amountConverter((reportSummary?.totalPrice || 0) as string),
                meta: {
                  isNumeric: true,
                },
              },
              {
                header: 'Vat',
                accessorKey: 'vatAmount',
                cell: (props) => amountConverter(props?.row?.original?.vatAmount || '0'),
                footer: () => amountConverter((reportSummary?.totalVatAmount || 0) as string),

                meta: {
                  isNumeric: true,
                },
              },
              {
                header: 'Net Sales Price(including VAT)',
                accessorKey: 'netAmountWithVat',
                footer: () => amountConverter((reportSummary?.totalPriceWithVat || 0) as string),

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
              label="Sold By User"
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

const InventorySalesReportInputs = () => {
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
