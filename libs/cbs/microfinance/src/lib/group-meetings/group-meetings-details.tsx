import { useRouter } from 'next/router';

import { Box, DetailPageHeader, DetailPageTabs, Divider, Scrollable, Text } from '@myra-ui';

import { useMfMeetingsDetailsQuery } from '@coop/cbs/data-access';

import Attendance from './components/Attendance';
import Decision from './components/Decision';
import Documents from './components/Documents';
import Overview from './components/Overview';

export const GroupMeetingsDetails = () => {
  const router = useRouter();
  const tabQuery = router.query['tab'] as string;

  const { data } = useMfMeetingsDetailsQuery(
    { meetingID: router?.query?.['id'] as string },
    { enabled: !!router?.query?.['id'] }
  );
  const meetingsDetailsData = data?.microFinance?.groupMeeting?.mfMeetingDetail;

  return (
    <>
      <Box position="sticky" top="0" zIndex={10}>
        <DetailPageHeader
          title="Microfinance Group Meetings Details"
          member={{
            name: meetingsDetailsData?.oveview?.agenda as string,
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
            <Text fontSize="r1" fontWeight="semibold" color="primary.500">
              {meetingsDetailsData?.oveview?.agenda}
            </Text>
            <Text fontSize="s3">{meetingsDetailsData?.oveview?.id}</Text>
            <Text fontSize="s3" color="gray.600">
              {meetingsDetailsData?.oveview?.presentMembers} members
            </Text>
          </Box>
          <Divider />
          <DetailPageTabs tabs={['Overview', 'Attendance', 'Decision', 'Documents']} />
        </Box>

        <Scrollable detailPage>
          <Box display="flex" flexDir="column" gap="s16" bg="background.500" minH="100vh">
            {(tabQuery === 'overview' || tabQuery === 'undefined' || !tabQuery) && (
              <Overview
                data={meetingsDetailsData?.oveview}
                decision={meetingsDetailsData?.decision}
              />
            )}
            {tabQuery === 'attendance' && <Attendance data={meetingsDetailsData?.attendance} />}
            {tabQuery === 'decision' && <Decision data={meetingsDetailsData?.decision} />}
            {tabQuery === 'documents' && <Documents />}
          </Box>
        </Scrollable>
      </Box>
    </>
  );
};

export default GroupMeetingsDetails;
