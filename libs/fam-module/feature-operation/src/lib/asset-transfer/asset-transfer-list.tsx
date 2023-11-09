import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { Column, PageHeader, Table, TablePopover } from '@myra-ui';

import { useGetEmployeeListQuery } from '@coop/cbs/data-access';
import { formatTableAddress, ROUTES } from '@coop/cbs/utils';
import { getPaginationQuery } from '@coop/shared/utils';

export const AssetsTransferList = () => {
  const router = useRouter();
  const { data, isFetching } = useGetEmployeeListQuery({
    pagination: getPaginationQuery(),
  });

  const rowData = useMemo(() => data?.hr?.employee?.employee?.listEmployee?.edges ?? [], [data]);

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        header: 'Transfer ID',
        accessorFn: (row) => row?.node?.id,
      },
      {
        header: 'Asset Name',
        accessorFn: (row) => row?.node?.employeeName,
        meta: {
          width: '400px',
        },
      },
      {
        header: 'Transfer Type',
        accessorFn: (row) => row?.node?.employeeDepartment,
      },

      {
        header: 'Transfer From',
        accessorFn: (row) => row?.node?.employeeName,
      },

      {
        header: 'Transfer To',
        accessorFn: (row) => formatTableAddress(row?.node?.employeeAddress),
      },

      {
        id: '_actions',
        header: '',
        cell: (props) =>
          props?.row?.original?.node && (
            <TablePopover
              node={props?.row?.original?.node}
              items={[
                {
                  title: 'Edit',
                  onClick: (row) => {
                    router.push(`${ROUTES?.HRMODULE_EMPLOYEES_EDIT}?id=${row?.id}`);
                  },
                },
              ]}
            />
          ),
        meta: {
          width: '3.125rem',
        },
      },
    ],
    []
  );
  return (
    <>
      <PageHeader heading="Asset Transfer" />{' '}
      <Table
        isLoading={isFetching}
        data={rowData}
        columns={columns}
        pagination={{
          total: data?.hr?.employee?.employee?.listEmployee?.totalCount as number,
          pageInfo: data?.hr?.employee?.employee?.listEmployee?.pageInfo,
        }}
        rowOnClick={(row) =>
          router.push(`${ROUTES?.HRMODULE_EMPLOYEES_DETAIL}?id=${row?.node?.id}`)
        }
      />
    </>
  );
};

export default AssetsTransferList;
