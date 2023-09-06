import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { Box, Column, Table, Text } from '@myra-ui';

import { useGetJobApplicationQuery } from '@coop/cbs/data-access';
import { DetailsPageHeaderBox } from '@coop/shared/components';

export const Education = () => {
  const router = useRouter();
  const { data } = useGetJobApplicationQuery({ id: router?.query?.['id'] as string });

  const rowData = useMemo(
    () =>
      data?.hr?.recruitment?.recruitmentJobApplication?.getJobApplication?.data
        ?.educationalDetails ?? [],
    [data]
  );

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
        header: 'Field/Study',
        accessorFn: (row) => row?.specialization,
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
