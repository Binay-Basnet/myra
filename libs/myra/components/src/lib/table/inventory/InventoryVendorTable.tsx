import { useMemo } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { IconButton } from '@chakra-ui/react';

import { useGetInventoryVendorQuery } from '@coop/shared/data-access';
import { Column, Table } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

import { TableListPageHeader } from '../../TableListPageHeader';

export const InventoryVendorTable = () => {
  const { t } = useTranslation();
  const { data, isFetching } = useGetInventoryVendorQuery();

  const rowItems = data?.inventory.vendors?.list?.edges ?? [];

  const columns = useMemo<Column<typeof rowItems[0]>[]>(
    () => [
      {
        Header: t['vendorName'],
        accessor: 'node.name',
        width: '80%',
      },
      {
        Header: t['vendorLocation'],
        accessor: 'node.location',
        width: '40%',
      },

      {
        Header: t['vendorPhoneNumber'],
        accessor: 'node.phoneNumber',
        width: '40%',
      },

      {
        Header: t['vendorEmailAddress'],
        accessor: 'node.email',
        width: '40%',
      },

      {
        accessor: 'actions',
        Cell: () => (
          <IconButton
            variant="ghost"
            aria-label="Search database"
            icon={<BsThreeDots />}
          />
        ),
      },
    ],
    [t]
  );

  return (
    <>
      <TableListPageHeader heading={'vendorsLayout'} />

      <Table
        isLoading={isFetching}
        data={rowItems}
        columns={columns}
        sort={true}
      />
    </>
  );
};
