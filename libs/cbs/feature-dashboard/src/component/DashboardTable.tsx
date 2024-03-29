import { useMemo } from 'react';

import { DetailsCard } from '@myra-ui';
import { Column, Table } from '@myra-ui/table';

import { useGetDashboardInfoQuery } from '@coop/cbs/data-access';

export const DashboardTable = () => {
  const { data } = useGetDashboardInfoQuery();
  const pendingReqData = data?.dashboard?.dashboardInfo?.data?.pendingRequest;

  const rowData = useMemo(() => pendingReqData ?? {}, [pendingReqData]);

  const dataList = useMemo(
    () => [
      {
        sn: '1',
        requestType: 'Member Requests',
        totalCount: rowData?.memberRequestCount,
      },
      {
        sn: '2',
        requestType: 'Withdraw Slip Requests',
        totalCount: rowData?.withdrawSlipCount,
      },
      {
        sn: '3',
        requestType: 'Loan Application Requests',
        totalCount: rowData?.loanApplicationRequest,
      },
      {
        sn: '4',
        requestType: 'Loan Disbursement Requests',
        totalCount: rowData?.loanDisbursementRequest,
      },
    ],
    [rowData]
  );

  const columns = useMemo<Column<typeof dataList[0]>[]>(
    () => [
      {
        header: 'SN',
        accessorKey: 'sn',
      },
      {
        header: 'Request Type',
        accessorKey: 'requestType',
        meta: {
          width: 'auto',
        },
      },
      {
        header: 'Total Count',
        accessorKey: 'totalCount',
      },
    ],
    []
  );

  return (
    <DetailsCard
      title="Pending Requests"
      hasTable
      // leftBtn={<Button variant="ghost">View All Requests</Button>}
    >
      <Table isStatic isLoading={false} data={dataList ?? []} columns={columns} />
    </DetailsCard>
  );
};
