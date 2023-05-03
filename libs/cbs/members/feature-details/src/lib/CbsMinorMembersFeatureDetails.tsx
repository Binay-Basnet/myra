import { useRouter } from 'next/router';

import { Avatar, Box, DetailPageTabs, Divider, Scrollable, Text } from '@myra-ui';

import { MinorProfile, useGetMinorProfileQuery } from '@coop/cbs/data-access';

import { MemberDetailsPathBar } from '../components';
import Overview from '../components/minor/Overview';

export const CbsMinorMembersFeatureDetails = () => {
  const router = useRouter();
  const { data } = useGetMinorProfileQuery({ minorId: router?.query?.['id'] as string });
  const tabQuery = router.query['tab'] as string;
  const minorProfile = data?.members?.minorProfile;

  return (
    <>
      <MemberDetailsPathBar title={`Minor Profile - ${minorProfile?.fullName}`} />
      <Box>
        <Box
          bg="gray.0"
          w="320px"
          position="fixed"
          h="calc(100vh - 110px)"
          borderRight="1px"
          borderRightColor="border.layout"
        >
          <Box p="s16" display="flex" gap={2}>
            <Avatar size="lg" name={minorProfile?.fullName as string} />
            <Box>
              <Text fontSize="r1" fontWeight="medium">
                {minorProfile?.fullName}
              </Text>
            </Box>
          </Box>
          <Divider />
          <Divider />
          <DetailPageTabs tabs={['Overview']} />
        </Box>
        <Scrollable detailPage>
          <Box
            bg="background.500"
            ml="320px"
            p="s16"
            display="flex"
            flexDir="column"
            gap="s16"
            minH="100%"
          >
            {(tabQuery === 'overview' || tabQuery === 'undefined' || !tabQuery) && (
              <Overview data={minorProfile as MinorProfile} />
            )}
          </Box>
        </Scrollable>
      </Box>
    </>
  );
};

export default CbsMinorMembersFeatureDetails;
