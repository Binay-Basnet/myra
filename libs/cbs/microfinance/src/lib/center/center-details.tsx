import { useRouter } from 'next/router';

import { Box, DetailPageHeader, DetailPageTabs, Divider, Scrollable, Text } from '@myra-ui';

import { CenterOverview, useCenterDetailsQuery } from '@coop/cbs/data-access';

import { Group } from './components/Group';
import Overview from './components/Overview';

export const CenterDetails = () => {
  const router = useRouter();
  const tabQuery = router.query['tab'] as string;

  const { data } = useCenterDetailsQuery(
    { centerId: router?.query?.['id'] as string },
    { enabled: !!router?.query?.['id'] }
  );
  const centerDetailsData = data?.microFinance?.center?.centerDetail?.overview;

  return (
    <>
      <Box position="sticky" top="0" zIndex={10}>
        <DetailPageHeader
          title="Microfinance Center Details"
          member={{
            name: centerDetailsData?.centerName as string,
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
              {centerDetailsData?.centerName}
            </Text>
            <Text fontSize="s3">{centerDetailsData?.centerId}</Text>
            <Text fontSize="s3" color="gray.600">
              {centerDetailsData?.totalGroups} groups | {centerDetailsData?.totalMembers} members
            </Text>
          </Box>
          <Divider />
          <DetailPageTabs tabs={['Overview', 'MF Group']} />
        </Box>

        <Scrollable detailPage>
          <Box display="flex" flexDir="column" gap="s16" bg="background.500" minH="100vh">
            {(tabQuery === 'overview' || tabQuery === 'undefined' || !tabQuery) && (
              <Overview data={centerDetailsData as CenterOverview} />
            )}
            {tabQuery === 'mf group' && <Group data={centerDetailsData as CenterOverview} />}
          </Box>
        </Scrollable>
      </Box>
    </>
  );
};

export default CenterDetails;
