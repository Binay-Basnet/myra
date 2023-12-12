import { useMemo, useState } from 'react';
import { ApprovalStatusItem } from 'libs/cbs/requests/feature-lists/src/components/ApprovalStatusItem';

import { Column, PageHeader, Table } from '@myra-ui';

import { PayrollStatus, useGetPayrollRunListQuery } from '@coop/cbs/data-access';
import { getPaginationQuery } from '@coop/shared/utils';

import { PayrollRunDrawer } from './components/PayrollRunDrawer';

export const HRPayrollEntryList = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string>();
  const { data, isFetching } = useGetPayrollRunListQuery({
    pagination: getPaginationQuery(),
  });

  const rowData = useMemo(() => data?.hr?.payroll?.payrollRun?.listPayrollRun?.edges ?? [], [data]);

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        header: 'Pay Month',
        accessorFn: (row) => row?.node?.payMonth,
      },
      {
        header: 'Pay Year',
        accessorFn: (row) => row?.node?.payYear,
      },
      {
        header: 'Employees',
        accessorFn: (row) => row?.node?.employees,
      },
      {
        header: 'Payable Cost',
        accessorFn: (row) => row?.node?.payableCost,
      },
      {
        header: 'Pay Group',
        accessorFn: (row) => row?.node?.paygroup,
      },
      {
        id: 'status',
        header: 'Status',
        accessorFn: (row) => row?.node?.status,

        cell: (props) => (
          <ApprovalStatusItem status={props?.row?.original?.node?.status as PayrollStatus} />
        ),
      },

      // {
      //   id: '_actions',
      //   header: '',
      //   cell: (props) =>
      //     props?.row?.original?.node && (
      //       <TablePopover
      //         node={props?.row?.original?.node}
      //         items={[
      //           {
      //             title: 'Edit',
      //             onClick: (row) => {
      //               router.push(`${ROUTES?.HR_PAYROLL_ENTRY_EDIT}?id=${row?.id}`);
      //             },
      //           },
      //           {
      //             title: 'Approve',
      //             onClick: (row) => {
      //               router.push(`${ROUTES?.HR_PAYROLL_ENTRY_EDIT}?id=${row?.id}&&type=approve`);
      //             },
      //           },
      //           {
      //             title: 'Details',
      //             onClick: (row) => {
      //               router.push(`${ROUTES?.HR_PAYROLL_ENTRY_EDIT}?id=${row?.id}&&type=details`);
      //             },
      //           },
      //         ]}
      //       />
      //     ),
      // },
    ],
    []
  );

  const onCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  const selectedPayroll = rowData?.find((item) => item?.node?.id === selectedId);
  return (
    <>
      <PageHeader heading="Payroll run" />{' '}
      <Table
        isLoading={isFetching}
        data={rowData}
        columns={columns}
        pagination={{
          total: data?.hr?.payroll?.payrollRun?.listPayrollRun?.totalCount as number,
          pageInfo: data?.hr?.payroll?.payrollRun?.listPayrollRun?.pageInfo,
        }}
        rowOnClick={(row) => {
          setIsDrawerOpen(true);
          setSelectedId(row?.node?.id);
        }}
      />
      <PayrollRunDrawer
        selectedPayroll={selectedPayroll}
        isDrawerOpen={isDrawerOpen}
        onCloseDrawer={onCloseDrawer}
      />
    </>
  );
};
export default HRPayrollEntryList;
