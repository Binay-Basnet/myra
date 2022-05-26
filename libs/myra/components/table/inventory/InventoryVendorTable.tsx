import { Column, Table } from '../../../ui/src';
import { useMemo } from 'react';
import { IconButton } from '@chakra-ui/react';
import { BsThreeDots } from 'react-icons/bs';
import {
  Gender,
  useMembersQuery,
} from '../../../../../apps/myra/generated/graphql';

type MemberData = {
  id: string;
  firstName: string;
  middleName?: string | null;
  lastName: string;
  gender: Gender;
  title?: string | null;
  dateOfBirth?: string | null;
};

export const InventoryVendorTable = () => {
  const columns: Column<MemberData>[] = useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'firstName',
        width: '80%',
      },
      {
        Header: 'Location',
        accessor: 'title',
        width: '40%',
      },

      {
        Header: 'Phone Number',
        accessor: 'gender',
        width: '40%',
      },

      {
        Header: 'Email Address',
        accessor: 'id',
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
    []
  );
  const { data, isLoading } = useMembersQuery();

  const rowData = useMemo(() => data && data?.members?.list, [data]);

  return (
    <Table
      isLoading={isLoading}
      data={rowData?.slice(0, 10) ?? []}
      columns={columns}
      sort={true}
    />
  );
};
