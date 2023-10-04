import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { Column, Table, Text } from '@myra-ui';

import { useGetPreTaxDeductionsDetailsQuery } from '@coop/cbs/data-access';

import { months } from './GrossEarnings';

export const PreTaxDeductions = () => {
  const router = useRouter();
  const { data, isFetching } = useGetPreTaxDeductionsDetailsQuery({
    employeeId: router?.query?.['id'] as string,
  });
  const preTaxDeductionData = data?.hr?.payroll?.payrollRun?.getPreTaxDeductionsDetails?.data;

  const tableHeader = Object.keys(Object.values(preTaxDeductionData || {})[0] || {});

  const rowData = useMemo(
    () => Object.values(preTaxDeductionData || {}) ?? [],
    [preTaxDeductionData]
  );

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

export default PreTaxDeductions;
