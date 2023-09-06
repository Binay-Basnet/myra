import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { Box, Column, Table, Text } from '@myra-ui';

import { useGetJobApplicationAppointmentLetterQuery } from '@coop/cbs/data-access';
import { DetailsKeyValueCard, DetailsPageHeaderBox } from '@coop/shared/components';

export const AppointmentLetter = () => {
  const router = useRouter();

  const { data } = useGetJobApplicationAppointmentLetterQuery({
    id: router?.query?.['id'] as string,
  });

  const jobApplicationAppointmentLetterData =
    data?.hr?.recruitment?.recruitmentJobApplication?.getJobApplicationAppointmentLetter?.data;

  const rowData = useMemo(
    () => jobApplicationAppointmentLetterData?.terms ?? [],
    [jobApplicationAppointmentLetterData]
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
        header: 'Offer Terms',
        accessorFn: (row) => row?.title,
      },
      {
        header: 'Value',
        accessorFn: (row) => row?.description,
      },
    ],
    []
  );
  return (
    <>
      <DetailsPageHeaderBox title="Appointment Letter" />
      <DetailsKeyValueCard
        title="General Information"
        keyValueList={[
          {
            label: 'Job Application',
            value: jobApplicationAppointmentLetterData?.jobApplicant,
          },
          {
            label: 'Application Date',
            value: jobApplicationAppointmentLetterData?.applicationDate?.local,
          },
          {
            label: 'Offer Date',
            value: jobApplicationAppointmentLetterData?.applicationDate?.local,
          },
          {
            label: 'Designation',
            value: jobApplicationAppointmentLetterData?.designation,
          },
          {
            label: 'Depatment',
            value: jobApplicationAppointmentLetterData?.department,
          },
          { label: 'Email', value: jobApplicationAppointmentLetterData?.email },
        ]}
      />
      <Box mt="s16" mx="s24" p="s16" bg="white" borderRadius={5} boxShadow="xs">
        <Text mb="s24" fontSize="r1" fontWeight="medium" color="gray.600">
          Body
        </Text>
        <Text fontSize="r1" color="gray.700" fontWeight="medium">
          {jobApplicationAppointmentLetterData?.body || '-'}
        </Text>
      </Box>
      <Box mt="s16" mx="s24" p="s16" bg="white" borderRadius={5} boxShadow="xs">
        <Text mb="s24" fontSize="r1" fontWeight="medium" color="gray.600">
          Terms
        </Text>
        <Table data={rowData} columns={columns} variant="report" size="report" isStatic />
      </Box>
    </>
  );
};

export default AppointmentLetter;
