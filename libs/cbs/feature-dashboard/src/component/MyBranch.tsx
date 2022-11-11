import { useGetDashboardInfoQuery } from '@coop/cbs/data-access';
import { Box, DetailCardStats, Grid, GridItem, Text } from '@coop/shared/ui';

export const MyBranch = () => {
  const { data } = useGetDashboardInfoQuery();
  const myBranchData = data?.dashboard?.dashboardInfo?.data?.branchInfo;

  return (
    <Box display="flex" flexDir="column" gap="s16">
      <Box display="flex">
        <Text fontSize="s3" color="gray.600" fontWeight="600" textTransform="uppercase">
          My Branch
        </Text>
      </Box>

      <Grid templateColumns="repeat(3,1fr)" gap="s16">
        <GridItem>
          <DetailCardStats
            title="Members to Approve"
            stats={myBranchData?.membersToApprove as number}
          />
        </GridItem>
        <GridItem>
          <DetailCardStats title="Total Members" stats={myBranchData?.totalMembers as number} />
        </GridItem>
        <GridItem>
          <DetailCardStats title="Total Accounts" stats={myBranchData?.totalAccounts as number} />
        </GridItem>
      </Grid>
    </Box>
  );
};
