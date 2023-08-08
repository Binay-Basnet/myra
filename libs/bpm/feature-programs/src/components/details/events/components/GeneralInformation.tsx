import dayjs from 'dayjs';

import { DetailCardContent, DetailsCard } from '@myra-ui';

import { localizedDate } from '@coop/cbs/utils';

import { useEventsDetailsHook } from '../hooks/useEventsDetails';

export const GeneralInformationEventDetails = () => {
  const { detailData } = useEventsDetailsHook();
  const overviewData = detailData?.overview;

  return (
    <DetailsCard title="General Information" bg="white" hasThreeRows>
      <DetailCardContent title="Event Name" subtitle={overviewData?.eventName} />

      <DetailCardContent title="Event Type" subtitle={overviewData?.eventType} />
      <DetailCardContent title="Total Attendees" subtitle={overviewData?.totalAttendees} />
      <DetailCardContent
        title="Start Date"
        subtitle={overviewData?.startDate ? localizedDate(overviewData?.startDate) : '-'}
      />
      <DetailCardContent
        title="Start Time"
        subtitle={overviewData?.startTime ? dayjs(overviewData?.startTime)?.format('hh:mm A') : '-'}
      />
      <DetailCardContent title="Pirority" subtitle={overviewData?.priority} />
      <DetailCardContent title="Scheduled By" subtitle={overviewData?.scheduledBy} />
      <DetailCardContent title="Position" subtitle={overviewData?.position} />
    </DetailsCard>
  );
};
