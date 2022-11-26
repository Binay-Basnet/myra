import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { useGetAgentDetailDataQuery, useGetAgentTodayListDataQuery } from '@coop/cbs/data-access';
import { Box, Button, Grid, Text } from '@myra-ui';
import { useTranslation } from '@coop/shared/utils';

export const AssignedMembersCard = () => {
  const { t } = useTranslation();

  const router = useRouter();

  const id = router?.query?.['id'];

  const { data: agentDetailQueryData } = useGetAgentDetailDataQuery(
    { id: id as string },
    { enabled: !!id, staleTime: 0 }
  );

  const { data: agentTodayListQueryData } = useGetAgentTodayListDataQuery(
    {
      id: id as string,
    },
    { staleTime: 0, enabled: !!id }
  );

  const todaysCount = useMemo(
    () => agentTodayListQueryData?.transaction?.listAgentTask?.record?.length ?? 0,
    [agentTodayListQueryData]
  );

  return (
    <Grid p="s16" bg="white" borderRadius="br2" templateColumns="repeat(3, 1fr)" columnGap="s20">
      <Box display="flex" flexDirection="column" gap="s4" alignItems="flex-start">
        <Text fontSize="s3" fontWeight={500} color="neutralColorLight.Gray-80">
          {t['agentOverviewTotalAssignedMembers']}
        </Text>
        <Text fontSize="l1" fontWeight={500} color="neutralColorLight.Gray-60">
          {agentDetailQueryData?.transaction?.agentDetail?.data?.totalMembers ?? 0}
        </Text>

        <Button
          variant="link"
          onClick={() => router.push(`/transactions/agent/${id}/assigned-members`)}
        >
          {t['agentOverviewViewAllMembers']}
        </Button>
      </Box>
      <Box display="flex" flexDirection="column" gap="s4" alignItems="flex-start">
        <Text fontSize="s3" fontWeight={500} color="neutralColorLight.Gray-80">
          {t['agentOverviewTodaysMemberList']}
        </Text>
        <Text fontSize="l1" fontWeight={500} color="neutralColorLight.Gray-60">
          {todaysCount}
        </Text>

        {/* <Button variant="link" disabled>
          View Members
        </Button> */}
      </Box>
    </Grid>
  );
};
