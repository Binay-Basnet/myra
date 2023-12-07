import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { Column, PageHeader, Table } from '@myra-ui';

import { useListMfCenterQuery } from '@coop/cbs/data-access';
import { formatTableAddress, ROUTES } from '@coop/cbs/utils';
import { getPaginationQuery } from '@coop/shared/utils';

export const CenterList = () => {
  const router = useRouter();
  const { data, isFetching } = useListMfCenterQuery({
    pagination: getPaginationQuery(),
  });

  const rowData = useMemo(() => data?.microFinance?.center?.listMFCenter?.edges ?? [], [data]);

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        header: 'Center Id',
        accessorFn: (row) => row?.node?.id,
      },
      {
        header: 'Center Name',
        accessorFn: (row) => row?.node?.name,
      },
      {
        header: 'Address',
        accessorFn: (row) => formatTableAddress(row?.node?.address),
      },
      {
        header: 'Total Groups',
        accessorFn: (row) => row?.node?.totalgroups,
      },
      {
        header: 'Total Members',
        accessorFn: (row) => row?.node?.totalMembers,
      },
      {
        header: 'Created Date',
        accessorFn: (row) => row?.node?.createdDate?.local,
      },
      {
        id: '_actions',
        header: '',
        cell: () => {},
      },
    ],
    []
  );
  return (
    <>
      <PageHeader heading="Microfinance Center List" />{' '}
      <Table
        isLoading={isFetching}
        data={rowData}
        columns={columns}
        pagination={{
          total: data?.microFinance?.center?.listMFCenter?.totalCount as number,
          pageInfo: data?.microFinance?.center?.listMFCenter?.pageInfo,
        }}
        rowOnClick={(row) =>
          router.push(`${ROUTES?.HRMODULE_EMPLOYEES_DETAIL}?id=${row?.node?.id}`)
        }
      />
    </>
  );
};

export default CenterList;
