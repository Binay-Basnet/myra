import { useMemo, useState } from 'react';

import { Box, GridItem } from '@myra-ui';

import {
  InventoryRegistrationData,
  InventoryRegistrationFilter,
  LocalizedDateFilter,
  useGetInventoryRegisterReportQuery,
  useGetWarehouseListQuery,
} from '@coop/cbs/data-access';
import { Report } from '@coop/cbs/reports';
import { ReportDateRange } from '@coop/cbs/reports/components';
import { Report as ReportEnum } from '@coop/cbs/reports/list';
import { FormSelect } from '@coop/shared/form';
import { amountConverter, quantityConverter, useIsCbs } from '@coop/shared/utils';

type InventoryRegisterFilter = {
  period: LocalizedDateFilter;
  warehouseId: {
    label: string;
    value: string;
  }[];
};

export const InventoryRegisterReport = () => {
  const [filters, setFilters] = useState<InventoryRegisterFilter | null>(null);
  const { isCbs } = useIsCbs();

  const wareHouseIds =
    filters?.warehouseId && filters?.warehouseId?.length !== 0
      ? filters?.warehouseId?.map((t) => t.value)
      : null;

  const { data, isFetching } = useGetInventoryRegisterReportQuery(
    {
      data: {
        ...filters,

        warehouseId: wareHouseIds,
      } as InventoryRegistrationFilter,
    },
    { enabled: !!filters }
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

  const inventoryReport = data?.report?.inventoryReport?.inventoryRegistrationReport?.data;
  const summary = data?.report?.inventoryReport?.inventoryRegistrationReport?.total;

  return (
    <Report
      defaultFilters={null}
      data={inventoryReport as InventoryRegistrationData[]}
      filters={filters}
      setFilters={setFilters}
      isLoading={isFetching}
      report={ReportEnum.INVENTORY_REGISTER_REPORT}
    >
      <Report.Header>
        <Report.PageHeader
          paths={[
            {
              label: 'Inventory Reports',
              link: isCbs ? '/reports/cbs/inventory' : '/accounting/reports/inventory',
            },
            {
              label: 'Inventory Register Report',
              link: isCbs
                ? '/reports/cbs/inventory/register/new'
                : '/accounting/reports/inventory/register/new',
            },
          ]}
        />
        <Report.Inputs hideDate>
          <GridItem colSpan={1}>
            <FormSelect
              isMulti
              name="warehouseId"
              label="Select Warehouse"
              options={wareHouseSearchOptions}
            />
          </GridItem>
          <GridItem colSpan={3}>
            <ReportDateRange />
          </GridItem>
        </Report.Inputs>
      </Report.Header>

      <Report.Body>
        <Report.Content>
          <Report.OrganizationHeader />
          <Report.Organization />
          <Report.Table<InventoryRegistrationData & { index: number }>
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
                header: 'Product Detail',
                accessorKey: 'itemName',

                meta: {
                  Footer: {
                    display: 'none',
                  },
                },
              },
              {
                header: 'Quantity Purchased',
                accessorKey: 'quantityPurchased',
                cell: (props) => quantityConverter(props?.row?.original?.quantityPurchased || '0'),
                footer: () => amountConverter(summary?.totalQuantityPurchased || 0),
                meta: {
                  isNumeric: true,
                },
              },
              {
                header: 'Quantity Sold',
                accessorKey: 'quantitySoled',
                cell: (props) => quantityConverter(props?.row?.original?.quantitySoled || '0'),
                footer: () => amountConverter(summary?.totalQuantitySoled || 0),
                meta: {
                  isNumeric: true,
                },
              },
              {
                header: 'Quantity in Stock',
                accessorKey: 'quantityInStock',
                cell: (props) => quantityConverter(props?.row?.original?.quantityInStock || '0'),
                footer: () => amountConverter(summary?.totalQuantityInStock || 0),
                meta: {
                  isNumeric: true,
                },
              },
              {
                header: 'Price/Unit',
                accessorKey: 'pricePerUnit',
                meta: {
                  isNumeric: true,
                },
              },
              {
                header: 'Value of Stock without Vat',
                accessorKey: 'stockValue',

                cell: (props) => amountConverter(props?.row?.original?.stockValue || '0'),
                footer: () => amountConverter(summary?.totalStockValue || 0),
                meta: {
                  isNumeric: true,
                },
              },
              {
                header: 'VAT (%)',
                accessorKey: 'vatPercent',
                meta: {
                  isNumeric: true,
                },
              },
              {
                header: 'VAT Amount',
                accessorKey: 'vatAmount',
                cell: (props) => amountConverter(props?.row?.original?.vatAmount || '0'),
                footer: () => amountConverter(summary?.totalVatAmount || 0),
                meta: {
                  isNumeric: true,
                },
              },
              {
                header: 'Value of Stock With VAT included',
                accessorKey: 'stockValueVat',
                cell: (props) => amountConverter(props?.row?.original?.stockValueVat || '0'),
                footer: () => amountConverter(summary?.totalVatAmount || 0),
                meta: {
                  isNumeric: true,
                },
              },
            ]}
          />
        </Report.Content>
      </Report.Body>
    </Report>
  );
};
