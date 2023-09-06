import { useRouter } from 'next/router';

import { Box, FileViewer, Grid, Text } from '@myra-ui';

import { useGetJobApplicationQuery } from '@coop/cbs/data-access';
import { DetailsPageHeaderBox } from '@coop/shared/components';

export const Documents = () => {
  const router = useRouter();
  const { data } = useGetJobApplicationQuery({ id: router?.query?.['id'] as string });
  const jobApplicationDocuments =
    data?.hr?.recruitment?.recruitmentJobApplication?.getJobApplication?.data?.documents;
  return (
    <>
      <DetailsPageHeaderBox title="Appointment Letter" />
      <Box mt="s16" mx="s24" p="s16" bg="white" borderRadius={5} boxShadow="xs">
        <Text mb="s24" fontSize="r1" fontWeight="medium" color="gray.600">
          Document Declartion
        </Text>

        <Grid templateColumns="repeat(2,1fr)" gap="s16">
          <Box>
            <Text fontSize="r1" color="gray.600" fontWeight="medium" mb="s8">
              Resume/CV
            </Text>
            <FileViewer
              fileUrl={jobApplicationDocuments?.[0]?.identifiers?.[0]?.url}
              fileName={jobApplicationDocuments?.[0]?.identifiers?.[0]?.url}
            />
          </Box>
          <Box>
            <Text fontSize="r1" color="gray.600" fontWeight="medium" mb="s8">
              Cover Letter
            </Text>
            <FileViewer
              fileUrl={jobApplicationDocuments?.[1]?.identifiers?.[0]?.url}
              fileName={jobApplicationDocuments?.[1]?.identifiers?.[0]?.url}
            />
          </Box>
        </Grid>
      </Box>
    </>
  );
};

export default Documents;
