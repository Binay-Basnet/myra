import { useMemo } from 'react';

import { Box, Column, Table, Text } from '@myra-ui';

import { JobApplicationOverview } from '@coop/cbs/data-access';
import { DetailsPageHeaderBox } from '@coop/shared/components';

export const Education = (props: { data: JobApplicationOverview }) => {
  const { data } = props;

  const rowData = useMemo(() => data?.educationalDetails ?? [], [data]);

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
        header: 'Institute Name',
        accessorFn: (row) => row?.instituteName,
      },
      {
        header: 'Degree/Diploma',
        accessorFn: (row) => row?.degree_diploma,
      },
      {
        header: 'Duration in years',
        accessorFn: (row) => row?.durationInYrs,
      },
      {
        header: 'Grade',
        accessorFn: (row) => row?.grade,
      },
      {
        header: 'Date of Completion',
        accessorFn: (row) => row?.dateOfCompletion?.en,
      },
    ],
    []
  );
  return (
    <>
      <DetailsPageHeaderBox title="Education" />
      <Box mt="s16" mx="s24" p="s16" bg="white" borderRadius={5} boxShadow="xs">
        <Text mb="s24" fontSize="r1" fontWeight="medium" color="gray.600">
          Education Details
        </Text>
        <Table data={rowData} columns={columns} variant="report" size="report" isStatic />
      </Box>
    </>
  );
};

export default Education;
