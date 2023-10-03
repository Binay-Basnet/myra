import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { Box, Column, Table, Text } from '@myra-ui';

import { useGetJobApplicationQuery } from '@coop/cbs/data-access';
import { DetailsPageHeaderBox } from '@coop/shared/components';

export const Experience = () => {
  const router = useRouter();
  const { data } = useGetJobApplicationQuery({ id: router?.query?.['id'] as string });

  const rowData = useMemo(
    () =>
      data?.hr?.recruitment?.recruitmentJobApplication?.getJobApplication?.data
        ?.experienceDetails ?? [],
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
        header: 'Designation',
        accessorFn: (row) => row?.designation,
      },
      {
        header: 'Company Name',
        accessorFn: (row) => row?.companyName,
      },
      {
        header: 'Duration in yrs',
        accessorFn: (row) => row?.durationInYrs,
      },
      {
        header: 'Address',
        accessorFn: (row) => row?.address,
      },
    ],
    []
  );
  return (
    <>
      <DetailsPageHeaderBox title="Experience" />
      <Box mt="s16" mx="s24" p="s16" bg="white" borderRadius={5} boxShadow="xs">
        <Text mb="s24" fontSize="r1" fontWeight="medium" color="gray.600">
          Experience Details
        </Text>
        <Table data={rowData} columns={columns} variant="report" size="report" isStatic />
      </Box>
    </>
  );
};

export default Experience;
