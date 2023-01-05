import { Box, DetailCardStats, Grid, GridItem, Text } from '@myra-ui';

import { useGetDashboardInfoQuery } from '@coop/cbs/data-access';

export const MyCoop = () => {
  const { data } = useGetDashboardInfoQuery();
  const myCoopData = data?.dashboard?.dashboardInfo?.data?.coopInfo;

  return (
    <Box display="flex" flexDir="column" gap="s8">
      <Box display="flex">
        <Text fontSize="s3" color="gray.600" fontWeight="600" textTransform="uppercase">
          My COOP
        </Text>
      </Box>
      <Grid templateColumns="repeat(3,1fr)" gap="s16">
        <GridItem>
          <DetailCardStats
            title="Total Members"
            hideCommas
            stats={myCoopData?.totalMembers as number}
          />
        </GridItem>
        <GridItem>
          <DetailCardStats
            title="Total Share Issued"
            hideCommas
            stats={myCoopData?.totalShareIssued as number}
          />
        </GridItem>
        <GridItem>
          <DetailCardStats
            hideCommas
            title="Total Branch"
            stats={myCoopData?.totalBranch as number}
          />
        </GridItem>
      </Grid>
    </Box>
  );
};
