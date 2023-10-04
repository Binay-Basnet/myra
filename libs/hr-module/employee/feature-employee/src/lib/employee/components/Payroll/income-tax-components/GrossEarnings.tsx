import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { Column, Table, Text } from '@myra-ui';

import { useGetGrossEarningsDetailsQuery } from '@coop/cbs/data-access';

export const months = [
  'SHRAWAN',
  'BHADRA',
  'ASHOJ',
  'KARTIK',
  'MANGSIR',
  'POUSH',
  'MAGH',
  'FALGUN',
  'CHAITRA',
  'BAISAKH',
  'JESTHA',
  'ASAR',
];

export const GrossEarnings = () => {
  const router = useRouter();

  const { data, isFetching } = useGetGrossEarningsDetailsQuery({
    id: router?.query?.['id'] as string,
  });
  const grossEarningData = data?.hr?.payroll?.payrollRun?.getGrossEarningsDetails?.data;

  const tableHeader = Object.keys(Object.values(grossEarningData || {})[0] || {});

  const rowData = useMemo(() => Object.values(grossEarningData || {}) ?? [], [grossEarningData]);

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      { header: 'Month', accessorFn: (row, index) => months[index] },
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
        Gross Earnings
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

export default GrossEarnings;
