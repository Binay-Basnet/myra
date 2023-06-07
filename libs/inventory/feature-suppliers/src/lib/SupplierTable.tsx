import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { Column, PageHeader, Table } from '@myra-ui';

import { useGetSuppliersListQuery } from '@coop/cbs/data-access';
import { formatAddress, ROUTES } from '@coop/cbs/utils';
import { getPaginationQuery, useTranslation } from '@coop/shared/utils';

export const SupplierTable = () => {
  const { t } = useTranslation();
  const { data, isFetching } = useGetSuppliersListQuery({
    pagination: getPaginationQuery(),
  });

  const rowItems = data?.inventory?.suppliers?.list?.edges ?? [];
  const router = useRouter();

  const columns = useMemo<Column<typeof rowItems[0]>[]>(
    () => [
      {
        header: t['supplierName'],
        accessorFn: (row) => row?.node?.name,
      },
      {
        header: t['supplierLocation'],
        accessorFn: (row) => formatAddress(row?.node?.location),
      },

      {
        header: t['supplierPhoneNumber'],
        accessorFn: (row) => row?.node?.phoneNo,
      },
      {
        header: 'Email',
        accessorFn: (row) => row?.node?.email,
      },

      // {
      //   accessorKey: 'actions',
      //   cell: () => (
      //     <IconButton variant="ghost" aria-label="Search database" icon={<BsThreeDots />} />
      //   ),
      // },
    ],
    [t]
  );

  return (
    <>
      <PageHeader heading="supplier" />

      <Table
        data={rowItems}
        isLoading={isFetching}
        rowOnClick={(row) => {
          router.push(`${ROUTES.INVENTORY_SUPPLIERS_DETAILS}?id=${row?.node?.id}`);
        }}
        columns={columns}
        pagination={{
          total: data?.inventory?.suppliers?.list?.totalCount ?? 'Many',
          pageInfo: data?.inventory?.suppliers?.list?.pageInfo,
        }}
      />
    </>
  );
};
