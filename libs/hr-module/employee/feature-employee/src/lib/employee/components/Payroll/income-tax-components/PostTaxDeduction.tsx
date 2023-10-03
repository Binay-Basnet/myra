import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { Column, Table, Text } from '@myra-ui';

import { useGetPostTaxDeductionsDetailsQuery } from '@coop/cbs/data-access';

import { months } from './GrossEarnings';

export const PostTaxDeductions = () => {
  const router = useRouter();
  const { data, isFetching } = useGetPostTaxDeductionsDetailsQuery({
    employeeId: router?.query?.['id'] as string,
  });
  const grossEarningData = data?.hr?.payroll?.payrollRun?.getPostTaxDeductionsDetails?.data;

  const tableHeader = Object.keys(Object.values(grossEarningData || {})[0] || {});

  const rowData = useMemo(() => Object.values(grossEarningData || {}) ?? [], [grossEarningData]);

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      { header: 'Month', accessorFn: (_, index) => months[index] },
      ...tableHeader.map((item) => ({
        header: item,
        accessorFn: (row: typeof rowData[0]) => row[item as keyof typeof rowData[0]],
      })),
    ],
    [rowData]
  );

  return (
    <>
      <Text fontSize="r2" mb="s28" fontWeight="medium">
        Pre Tax Deduction
      </Text>
      <Table
        data={rowData}
        columns={columns}
        variant="report"
        size="report"
        isStatic
        isLoading={isFetching}
      />
    </>
  );
};

export default PostTaxDeductions;
