import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { Box, Column, Table, Text } from '@myra-ui';

import { useGetJobApplicationListQuery } from '@coop/cbs/data-access';
import { DetailsPageHeaderBox } from '@coop/shared/components';
import { getPaginationQuery } from '@coop/shared/utils';

export const Applicants = () => {
  const router = useRouter();

  const { data } = useGetJobApplicationListQuery({
    pagination: getPaginationQuery(),
    filter: {
      orConditions: [
        {
          andConditions: [
            {
              column: 'jobopening',
              comparator: 'EqualTo',
              value: router?.query?.['id'],
            },
          ],
        },
      ],
    },
  });
  const rowData = useMemo(
    () => data?.hr?.recruitment?.recruitmentJobApplication?.listJobApplication?.edges ?? [],
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
        header: 'Applicant Id',
        accessorFn: (row) => row?.node?.id,
      },
      {
        header: 'Applicant Name',
        accessorFn: (row) => row?.node?.name,
      },
      {
        header: 'Status',
        accessorFn: (row) => row?.node?.applicantStatus,
      },
    ],
    []
  );
  return (
    <>
      <DetailsPageHeaderBox title="Applicants" />
      <Box mt="s16" mx="s24" p="s16" bg="white" borderRadius={5} boxShadow="xs">
        <Text mb="s24" fontSize="r1" fontWeight="medium" color="gray.600">
          Applicants Details
        </Text>
        <Table data={rowData} columns={columns} variant="report" size="report" isStatic />
      </Box>
    </>
  );
};

export default Applicants;
