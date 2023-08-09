import { DetailsCard } from '@myra-ui';

import { EmployeeDetailsTable } from './EMployeeDetailsTable';
import { useEventsDetailsHook } from '../hooks/useEventsDetails';

export const AttendeesTable = () => {
  const { detailData } = useEventsDetailsHook();
  const purchaseData =
    detailData?.overview?.attendees?.map((data, index) => ({
      sn: Number(index) + 1,
      name: data?.name,
      designation: data?.designation,
      email: data?.email,

      contact: data?.contact,
    })) || [];
  return (
    <DetailsCard hasTable bg="white" title="Attendees">
      <EmployeeDetailsTable data={purchaseData} />{' '}
    </DetailsCard>
  );
};
