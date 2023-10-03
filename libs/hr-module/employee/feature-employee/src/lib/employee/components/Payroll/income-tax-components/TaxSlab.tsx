import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { Column, Table, Text } from '@myra-ui';

import { useGetCurrentTaxSlabQuery } from '@coop/cbs/data-access';

export const TaxSlab = () => {
  const router = useRouter();
  const { data, isFetching } = useGetCurrentTaxSlabQuery({
    employee: router?.query?.['id'] as string,
  });

  const taxSlabData = data?.hr?.payroll?.payrollRun?.getCurrentTaxSlab?.data?.taxSlab;

  const rowData = useMemo(() => taxSlabData || [], [taxSlabData]);

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      { header: 'From Amount', accessorFn: (row) => row?.fromAmount },
      { header: 'Percentage Deduction', accessorFn: (row) => row?.percentageDeduction },
      { header: 'To Amount', accessorFn: (row) => row?.toAmount },
    ],
    [rowData]
  );

  return (
    <>
      <Text fontSize="r2" mb="s28" fontWeight="medium">
        Tax Slab
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

export default TaxSlab;
