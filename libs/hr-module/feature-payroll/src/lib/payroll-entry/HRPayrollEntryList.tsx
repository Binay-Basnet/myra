import { useMemo } from 'react';
import { useRouter } from 'next/router';
import { ApprovalStatusItem } from 'libs/cbs/requests/feature-lists/src/components/ApprovalStatusItem';

import { Column, PageHeader, Table, TablePopover, Text } from '@myra-ui';

import { PayrollStatus, useGetPayrollRunListQuery } from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import { getPaginationQuery } from '@coop/shared/utils';

export const HRPayrollEntryList = () => {
  const router = useRouter();
  const { data, isFetching } = useGetPayrollRunListQuery({
    pagination: getPaginationQuery(),
  });

  const rowData = useMemo(() => data?.hr?.payroll?.payrollRun?.listPayrollRun?.edges ?? [], [data]);

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        header: 'Pay Period',
        accessorFn: (row) => row?.node?.payPeriod?.from,
        cell: (props) => (
          <Text>
            {props?.row.original?.node?.payPeriod?.from?.local} -{' '}
            {props?.row.original?.node?.payPeriod?.to?.local}
          </Text>
        ),
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
        header: 'Pay Date',
        accessorFn: (row) => row?.node?.payDate?.local,
      },
      {
        id: 'state',
        header: 'Status',
        accessorFn: (row) => row?.node?.status,

        cell: (props) => (
          <ApprovalStatusItem status={props?.row?.original?.node?.status as PayrollStatus} />
        ),
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
                    router.push(`${ROUTES?.HR_PAYROLL_ENTRY_EDIT}?id=${row?.id}`);
                  },
                },
                {
                  title: 'Approve',
                  onClick: (row) => {
                    router.push(`${ROUTES?.HR_PAYROLL_ENTRY_EDIT}?id=${row?.id}&&type=approve`);
                  },
                },
                {
                  title: 'Details',
                  onClick: (row) => {
                    router.push(`${ROUTES?.HR_PAYROLL_ENTRY_EDIT}?id=${row?.id}&&type=details`);
                  },
                },
              ]}
            />
          ),
      },
    ],
    []
  );
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
      />
    </>
  );
};
export default HRPayrollEntryList;
