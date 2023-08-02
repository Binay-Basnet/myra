import dayjs from 'dayjs';

import { DetailCardContent, DetailsCard } from '@myra-ui';

import { localizedDate } from '@coop/cbs/utils';

import { useMeetingDetailsHook } from '../hooks/useMeetingDetails';

export const GeneralInformationMeetingDetails = () => {
  const { detailData } = useMeetingDetailsHook();
  const overviewData = detailData?.overview;

  return (
    <DetailsCard title="General Information" bg="white" hasThreeRows>
      <DetailCardContent title="Meeting Title" subtitle={overviewData?.title} />

      <DetailCardContent title="Meeting Type" subtitle={overviewData?.type} />
      <DetailCardContent title="Total Attendees" subtitle={overviewData?.totalAttendees} />
      <DetailCardContent title="Date" subtitle={localizedDate(overviewData?.date)} />
      <DetailCardContent title="Time" subtitle={dayjs(overviewData?.time)?.format('hh:mm A')} />
    </DetailsCard>
  );
};
