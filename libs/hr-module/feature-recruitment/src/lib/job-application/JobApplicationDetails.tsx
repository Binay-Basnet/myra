import { AiOutlineMail } from 'react-icons/ai';
import { BsTelephone } from 'react-icons/bs';
import { IoCopyOutline } from 'react-icons/io5';
import { useRouter } from 'next/router';

import {
  Box,
  Chips,
  DetailPageHeader,
  DetailPageTabs,
  Divider,
  Icon,
  Scrollable,
  Text,
} from '@myra-ui';

import { JobApplicationOverview, useGetJobApplicationOverviewQuery } from '@coop/cbs/data-access';

import AppointmentLetter from './components/AppointmentLetter';
import Documents from './components/Documents';
import Education from './components/Education';
import Experience from './components/Expierence';
import JobOffer from './components/JobOffer';
import Overview from './components/Overview';

export const JobApplicationDetails = () => {
  const router = useRouter();
  const tabQuery = router.query['tab'] as string;

  const { data } = useGetJobApplicationOverviewQuery(
    { id: router?.query?.['id'] as string },
    { enabled: !!router?.query?.['id'] }
  );
  const jobApplicationData =
    data?.hr?.recruitment?.recruitmentJobApplication?.getJobApplicationOverview?.data;

  return (
    <>
      <Box position="sticky" top="0" zIndex={10}>
        <DetailPageHeader
          title="Job Application"
          member={{
            name: jobApplicationData?.nameOfApplicant as string,
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
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Text fontSize="r1" fontWeight="medium">
                {jobApplicationData?.nameOfApplicant}
              </Text>
              <Chips
                variant="solid"
                theme="success"
                size="md"
                type="label"
                label={jobApplicationData?.applicationStatus}
              />
            </Box>
            <Box display="flex" alignItems="center" gap="s4">
              <Text fontSize="s3" fontWeight={400} color="neutralColorLight.Gray-50">
                {jobApplicationData?.applicationId}
              </Text>
              <Icon
                _hover={{ cursor: 'pointer' }}
                size="sm"
                as={IoCopyOutline}
                onClick={() => {}}
              />
            </Box>

            <Text fontSize="s3" fontWeight="medium" mt="s8">
              {jobApplicationData?.jobPosting}
            </Text>
          </Box>
          <Divider />
          <Box p="s16">
            <Box display="flex" alignItems="center" gap="s12" mb="s8">
              <Icon as={BsTelephone} size="sm" />
              <Text fontSize="s3">{jobApplicationData?.phoneNumber}</Text>
            </Box>
            <Box display="flex" alignItems="center" gap="s12">
              <Icon as={AiOutlineMail} size="sm" />
              <Text fontSize="s3">{jobApplicationData?.emailAddress}</Text>
            </Box>
          </Box>
          <Divider />

          <DetailPageTabs
            tabs={[
              'Overview',
              'Education',
              'Experience',
              'Job Offer',
              'Appointment Letter',
              'Documents',
            ]}
          />
        </Box>

        <Scrollable detailPage>
          <Box display="flex" flexDir="column" gap="s16" bg="background.500" minH="100vh">
            {(tabQuery === 'overview' || tabQuery === 'undefined' || !tabQuery) && (
              <Overview data={jobApplicationData as JobApplicationOverview} />
            )}
            {tabQuery === 'education' && (
              <Education data={jobApplicationData as JobApplicationOverview} />
            )}
            {tabQuery === 'experience' && <Experience />}
            {tabQuery === 'job offer' && <JobOffer />}
            {tabQuery === 'appointment letter' && <AppointmentLetter />}
            {tabQuery === 'documents' && <Documents />}
          </Box>
        </Scrollable>
      </Box>
    </>
  );
};

export default JobApplicationDetails;
