import { useMemo, useState } from 'react';

import { GridItem } from '@myra-ui';

import {
  LocalizedDateFilter,
  SalesReportDataList,
  SalesReportFilter,
  useGetInventoryItemsListQuery,
  useGetInventorySalesReportQuery,
  useGetSettingsUserListDataQuery,
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
  creatorIds: {
    label: string;
    value: string;
  }[];
};

export const InventoryItemSalesReport = () => {
  const [filters, setFilters] = useState<InventoryRegisterFilter | null>(null);
  const { isCbs } = useIsCbs();
  const { data: userListData } = useGetSettingsUserListDataQuery({
    // filter: { role: [Roles.Agent] },
    paginate: { after: '', first: -1 },
  });
  const userList = userListData?.settings?.myraUser?.list?.edges;

  const branchIds =
    filters?.branchId && filters?.branchId?.length !== 0
      ? filters?.branchId?.map((t) => t.value)
      : null;
  const itemsIds =
    filters?.itemIds && filters?.itemIds?.length !== 0
      ? filters?.itemIds?.map((t) => t.value)
      : null;

  const creatorsIds =
    filters?.creatorIds && filters?.creatorIds?.length !== 0
      ? filters?.creatorIds?.map((t) => t.value)
      : null;

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

  const { data, isFetching } = useGetInventorySalesReportQuery(
    {
      data: {
        ...filters,
        branchId: branchIds,

        creatorIds: creatorsIds,
        itemIds: itemsIds,
      } as SalesReportFilter,
    },
    { enabled: !!filters }
  );

  const inventoryReport = data?.report?.accountingReport?.salesReport?.data;

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
          <GridItem colSpan={2}>
            <ReportDateRange />
          </GridItem>
        </Report.Inputs>
      </Report.Header>

      <Report.Body>
        <Report.Content>
          <Report.OrganizationHeader />
          <Report.Organization />
          <Report.Table<SalesReportDataList & { index: number }>
            columns={[
              {
                header: 'S.No.',
                accessorKey: 'index',
                meta: {
                  width: '60px',
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
                meta: {
                  isNumeric: true,
                },
              },
              {
                header: 'Quantity Sold',
                accessorKey: 'soldQuantity',
                cell: (props) => quantityConverter(props?.row?.original?.soldQuantity || '0'),
                meta: {
                  isNumeric: true,
                },
              },
              {
                header: 'Total Price(Without Vat)',
                accessorKey: 'totalPrice',
                cell: (props) => amountConverter(props?.row?.original?.totalPrice || '0'),
                meta: {
                  isNumeric: true,
                },
              },
              {
                header: 'Vat',
                accessorKey: 'vatAmount',
                cell: (props) => amountConverter(props?.row?.original?.vatAmount || '0'),
                meta: {
                  isNumeric: true,
                },
              },
              {
                header: 'Net Sales Price(including VAT)',
                accessorKey: 'netAmountWithVat',
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
              name="creatorIds"
            />
          </Report.Filter>
        </Report.Filters>
      </Report.Body>
    </Report>
  );
};
