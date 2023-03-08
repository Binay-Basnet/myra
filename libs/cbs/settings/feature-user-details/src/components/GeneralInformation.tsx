import { DetailCardContent, DetailsCard } from '@myra-ui';

import { localizedDate, localizedText } from '@coop/cbs/utils';

import { useUserDetailsHooks } from '../hooks/useUserDetailsHooks';

export const GeneralInformationUsers = () => {
  const { detailData } = useUserDetailsHooks();

  return (
    <DetailsCard title="General Information" bg="white" hasThreeRows>
      <DetailCardContent title="Name" subtitle={localizedText(detailData?.userOverview?.name)} />

      <DetailCardContent
        title="Core Employee"
        subtitle={detailData?.userOverview?.isCoreEmployee ? 'Yes' : 'No'}
      />
      <DetailCardContent title="Employee Code" subtitle={detailData?.userOverview?.empCode} />
      <DetailCardContent title="Gender" subtitle={detailData?.userOverview?.gender} />

      <DetailCardContent title="Mobile Number" subtitle={detailData?.userOverview?.contactNo} />

      <DetailCardContent title="Email" subtitle={detailData?.userOverview?.email} />

      <DetailCardContent
        title="Date Joined"
        subtitle={localizedDate(detailData?.userOverview?.dateJoined)}
      />
    </DetailsCard>
  );
};
