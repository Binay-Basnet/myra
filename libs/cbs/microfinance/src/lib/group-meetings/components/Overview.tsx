import { useRouter } from 'next/router';

import { Alert, Box, DetailPageQuickLinks } from '@myra-ui';

import { MfDecisions, MfMeetingOverview } from '@coop/cbs/data-access';
import { readableTimeParser, ROUTES } from '@coop/cbs/utils';
import {
  DetailsKeyValueCard,
  DetailsKeyValueCards,
  DetailsPageHeaderBox,
} from '@coop/shared/components';

export const Overview = (props: { data: MfMeetingOverview; decision: MfDecisions }) => {
  const { data, decision } = props;
  const router = useRouter();

  const links = [
    { title: 'Add Group Meetings', link: ROUTES?.CBS_MICRO_FINANCE_GROUP_MEETINGS_ADD },
    {
      title: 'Add Attendance',
      link: `${ROUTES?.CBS_MICRO_FINANCE_GROUP_METTINGS_DETAILS}?id=${router?.query?.['id']}&tab=attendance`,
    },
  ];

  return (
    <>
      <DetailsPageHeaderBox title="Overview" />
      <Box px="s24">
        {' '}
        <DetailPageQuickLinks links={links} />
      </Box>
      {!decision?.note && (
        <Box px="s24">
          <Alert
            status="warning"
            title="Alert"
            subtitle="The decision for this meeting has not been added yet."
            bottomButtonlabel="Add Decision"
            bottomButtonHandler={() =>
              router.push(
                `${ROUTES?.CBS_MICRO_FINANCE_GROUP_METTINGS_DETAILS}?id=${router?.query?.['id']}&tab=decision`
              )
            }
          />
        </Box>
      )}

      <DetailsKeyValueCards
        keyValueList={[
          { label: 'Member Invited', value: data?.membersInvited },
          { label: 'No of Attendees', value: data?.presentMembers },
        ]}
      />
      <DetailsKeyValueCard
        title="General Information"
        keyValueList={[
          { label: 'Group', value: data?.groupName },
          { label: 'Agenda', value: data?.agenda },
          { label: 'Date', value: data?.date?.local },
          { label: 'Start Time', value: readableTimeParser(data?.startTime) },
          { label: 'End time', value: readableTimeParser(data?.endTime) },
        ]}
      />
    </>
  );
};

export default Overview;
