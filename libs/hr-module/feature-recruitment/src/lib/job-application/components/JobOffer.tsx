import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { Box, Column, Table, Text } from '@myra-ui';

import { useGetJobApplicationJobOfferQuery } from '@coop/cbs/data-access';
import { DetailsKeyValueCard, DetailsPageHeaderBox } from '@coop/shared/components';

export const JobOffer = () => {
  const router = useRouter();

  const { data } = useGetJobApplicationJobOfferQuery({
    id: router?.query?.['id'] as string,
  });

  const jobApplicationJobOfferData =
    data?.hr?.recruitment?.recruitmentJobApplication?.getJobApplicationJobOffer?.data;

  const rowData = useMemo(
    () => jobApplicationJobOfferData?.jobOfferTerms ?? [],
    [jobApplicationJobOfferData]
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
        accessorFn: (row) => row?.offerTerm,
      },
      {
        header: 'Value',
        accessorFn: (row) => row?.value,
      },
    ],
    []
  );
  return (
    <>
      <DetailsPageHeaderBox title="Job Offer" />
      <DetailsKeyValueCard
        title="Basic Information"
        keyValueList={[
          {
            label: 'Name of Applicant',
            value: jobApplicationJobOfferData?.nameOfapplicant as string,
          },
          { label: 'Applicant ID', value: jobApplicationJobOfferData?.applicationId },
          { label: 'Offer Date', value: jobApplicationJobOfferData?.offerDate?.local },
          { label: 'Designation', value: jobApplicationJobOfferData?.designation },
          { label: 'Depatment', value: jobApplicationJobOfferData?.department },
          { label: 'Email', value: jobApplicationJobOfferData?.email },
        ]}
      />
      <Box mt="s16" mx="s24" p="s16" bg="white" borderRadius={5} boxShadow="xs">
        <Text mb="s24" fontSize="r1" fontWeight="medium" color="gray.600">
          Job Offer Terms
        </Text>
        <Table data={rowData} columns={columns} variant="report" size="report" isStatic />
      </Box>
    </>
  );
};

export default JobOffer;
