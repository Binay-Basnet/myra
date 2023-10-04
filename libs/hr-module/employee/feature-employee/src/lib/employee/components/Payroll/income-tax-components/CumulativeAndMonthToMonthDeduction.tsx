import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { Box, Column, Table, Text } from '@myra-ui';

import { useGetTaxPaidEachMonthDetailsQuery } from '@coop/cbs/data-access';

import { months } from './GrossEarnings';

export const CumulativeAndMonthToMonthDeduction = () => {
  const router = useRouter();
  const { data, isFetching } = useGetTaxPaidEachMonthDetailsQuery({
    employeeId: router?.query?.['id'] as string,
  });

  const cumulativeAndMonthToMonthDeductionData =
    data?.hr?.payroll?.payrollRun?.getTaxPaidEachMonthDetails?.data;

  const taxPaidTillNow = cumulativeAndMonthToMonthDeductionData?.totalTaxPaid;
  const remainingTaxToBePaid = cumulativeAndMonthToMonthDeductionData?.taxRemainingToBePaid;
  const monthToMonthTaxDeductionDetails = cumulativeAndMonthToMonthDeductionData?.taxPaidEachMonth;

  const rowData = useMemo(
    () => monthToMonthTaxDeductionDetails ?? [],
    [monthToMonthTaxDeductionDetails]
  );

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      { header: 'Month', accessorFn: (_, index) => months[index] },
      { header: 'Monthly Tax Total', accessorFn: (row) => row },
    ],
    [rowData]
  );
  return (
    <>
      <Text fontSize="r2" mb="s28" fontWeight="medium">
        Cumulative Tax Deductions
      </Text>
      <Box
        display="flex"
        p="s8"
        gap="s16"
        justifyContent="space-between"
        border="1px"
        borderColor="border.layout"
      >
        <Text flex={2} fontSize="r1" borderRight="1px" borderColor="border.layout">
          Tax Paid Till Now
        </Text>
        <Text flex={1} fontSize="r1">
          {taxPaidTillNow}
        </Text>
      </Box>
      <Box
        display="flex"
        p="s8"
        gap="s16"
        justifyContent="space-between"
        border="1px"
        borderTop="none"
        borderColor="border.layout"
      >
        <Text flex={2} fontSize="r1" borderRight="1px" borderColor="border.layout">
          Remaining Tax To Be Paid
        </Text>
        <Text flex={1} fontSize="r1">
          {remainingTaxToBePaid}
        </Text>
      </Box>
      <Text fontSize="r2" mb="s28" fontWeight="medium" mt="s28">
        Month to Month Tax Deductions Details
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

export default CumulativeAndMonthToMonthDeduction;
