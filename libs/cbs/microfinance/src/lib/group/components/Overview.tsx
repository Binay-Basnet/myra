import { Box, DetailPageQuickLinks } from '@myra-ui';

import { MfGroupOverview } from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import {
  DetailsKeyValueCard,
  DetailsKeyValueCards,
  DetailsPageHeaderBox,
} from '@coop/shared/components';

export const Overview = (props: { data: MfGroupOverview }) => {
  const { data } = props;

  const links = [{ title: 'Add new member', link: ROUTES?.CBS_MICRO_FINANCE_GROUP_ADD }];

  return (
    <>
      <DetailsPageHeaderBox title="Overview" />
      <Box px="s24">
        {' '}
        <DetailPageQuickLinks links={links} />
      </Box>
      <DetailsKeyValueCards
        keyValueList={[
          { label: 'New Member', value: data?.newMemberCount },
          { label: 'Total Meetings', value: data?.totalMeeting },
          { label: 'Total Members', value: data?.totalMember },
          { label: 'Total Balance', value: data?.totalBalance },
        ]}
      />
      <DetailsKeyValueCard
        title="General Information"
        keyValueList={[
          { label: 'Group Name', value: data?.groupName },
          { label: 'Group ID', value: data?.groupId },
          { label: 'Total Members', value: data?.totalMember },
        ]}
      />
    </>
  );
};

export default Overview;
