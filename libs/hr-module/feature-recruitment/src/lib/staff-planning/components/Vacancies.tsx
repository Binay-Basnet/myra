import { useMemo } from 'react';

import { Box, Column, Table, Text } from '@myra-ui';

import { StaffPlanRecord } from '@coop/cbs/data-access';
import { DetailsPageHeaderBox } from '@coop/shared/components';

export const Vacancies = (props: { data: StaffPlanRecord }) => {
  const { data } = props;
  const rowData = useMemo(() => data?.staffPlans ?? [], [data]);

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        header: 'S.N',
        accessorFn: (_, index) => index + 1,
        meta: {
          width: '5%',
        },
      },
      {
        header: 'Designation',
        accessorFn: (row) => row?.designation,
      },
      {
        header: 'Vacancies',
        accessorFn: (row) => row?.vacancies,
      },
      {
        header: 'Estimated Cost per Employee',
        accessorFn: (row) => row?.estimated_cost_per_employee,
      },
      {
        header: 'Estimated Cost',
        accessorFn: (row) => row?.estimated_cost,
      },
    ],
    []
  );
  return (
    <>
      <DetailsPageHeaderBox title="Vacancies" />
      <Box mt="s16" mx="s24" p="s16" bg="white" borderRadius={5} boxShadow="xs">
        <Text mb="s24" fontSize="r1" fontWeight="medium" color="gray.600">
          Available Vacancies Details
        </Text>
        <Table data={rowData} columns={columns} variant="report" size="report" isStatic />
      </Box>
    </>
  );
};

export default Vacancies;
