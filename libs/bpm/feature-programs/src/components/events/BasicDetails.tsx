import { FormSection } from '@myra-ui';

import { BpmEventType } from '@coop/cbs/data-access';
import { FormInput, FormSelect } from '@coop/shared/form';

const eventType = [
  {
    label: 'Indoor',
    value: BpmEventType?.Indoor,
  },
  {
    label: 'Outdoor',
    value: BpmEventType?.Outdoor,
  },
];

export const EventsBasicDetails = () => (
  <FormSection templateColumns={2}>
    <FormInput name="name" label="Event Name" />
    <FormSelect name="eventType" label="Event Type" options={eventType} />
  </FormSection>
);
