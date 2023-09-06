import { IoCopyOutline } from 'react-icons/io5';
import { useRouter } from 'next/router';

import { Box, DetailPageHeader, DetailPageTabs, Divider, Icon, Scrollable, Text } from '@myra-ui';

import { JobOpeningOverview, useGetJobOpeningOverviewQuery } from '@coop/cbs/data-access';

import Applicants from './components/Applicants';
import Overview from './components/Overview';

export const JobOpeningDetails = () => {
  const router = useRouter();
  const tabQuery = router.query['tab'] as string;

  const { data } = useGetJobOpeningOverviewQuery(
    { id: router?.query?.['id'] as string },
    { enabled: !!router?.query?.['id'] }
  );
  const jobOpeningData = data?.hr?.recruitment?.recruitmentJobOpening?.getJobOpeningOverview?.data;

  return (
    <>
      <Box position="sticky" top="0" zIndex={10}>
        <DetailPageHeader
          title="Job Opening"
          member={{
            name: jobOpeningData?.jobTitle as string,
          }}
        />
      </Box>
      <Box display="flex">
        <Box
          w="320px"
          h="100%"
          sx={{
            '&::-webkit-scrollbar': {
              display: 'none',
            },
          }}
          borderRight="1px"
          borderRightColor="border.layout"
        >
          <Box p="s16">
            <Text fontSize="r1" fontWeight="medium">
              {jobOpeningData?.jobTitle}
            </Text>
            <Box display="flex" alignItems="center" gap="s4">
              <Text fontSize="s3" fontWeight={400} color="neutralColorLight.Gray-50">
                {jobOpeningData?.jobId}
              </Text>
              <Icon
                _hover={{ cursor: 'pointer' }}
                size="sm"
                as={IoCopyOutline}
                onClick={() => {}}
              />
            </Box>

            <Text fontSize="s3" fontWeight="medium" mt="s8">
              {jobOpeningData?.staffPlan}
            </Text>
          </Box>
          <Divider />
          <DetailPageTabs tabs={['Overview', 'Applicants']} />
        </Box>

        <Scrollable detailPage>
          <Box display="flex" flexDir="column" gap="s16" bg="background.500" minH="100vh">
            {(tabQuery === 'overview' || tabQuery === 'undefined' || !tabQuery) && (
              <Overview data={jobOpeningData as JobOpeningOverview} />
            )}
            {tabQuery === 'applicants' && <Applicants />}
          </Box>
        </Scrollable>
      </Box>
    </>
  );
};

export default JobOpeningDetails;
