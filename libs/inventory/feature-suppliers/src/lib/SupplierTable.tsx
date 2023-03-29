import { useMemo } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { IconButton } from '@chakra-ui/react';

import { Column, PageHeader, Table } from '@myra-ui';

import { useGetSuppliersListQuery } from '@coop/cbs/data-access';
import { formatAddress } from '@coop/cbs/utils';
import { getPaginationQuery, useTranslation } from '@coop/shared/utils';

export const SupplierTable = () => {
  const { t } = useTranslation();
  const { data, isFetching } = useGetSuppliersListQuery({
    pagination: getPaginationQuery(),
  });

  const rowItems = data?.inventory?.suppliers?.list?.edges ?? [];

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

      {
        accessorKey: 'actions',
        cell: () => (
          <IconButton variant="ghost" aria-label="Search database" icon={<BsThreeDots />} />
        ),
      },
    ],
    [t]
  );

  return (
    <>
      <PageHeader heading="supplier" />

      <Table
        data={rowItems}
        isLoading={isFetching}
        columns={columns}
        pagination={{
          total: data?.inventory?.suppliers?.list?.totalCount ?? 'Many',
          pageInfo: data?.inventory?.suppliers?.list?.pageInfo,
        }}
      />
    </>
  );
};
