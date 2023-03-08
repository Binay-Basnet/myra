import { DetailCardContent, DetailsCard } from '@myra-ui';

import { localizedText } from '@coop/cbs/utils';

import { useUserDetailsHooks } from '../../hooks/useUserDetailsHooks';

export const UserPermanentAddress = () => {
  const { detailData } = useUserDetailsHooks();

  return (
    <DetailsCard title="Permanent Address" bg="white" hasThreeRows>
      <DetailCardContent
        title="Province"
        subtitle={localizedText(detailData?.userBio?.permanentAddress?.state) ?? '-'}
      />
      <DetailCardContent
        title="District"
        subtitle={localizedText(detailData?.userBio?.permanentAddress?.district) ?? '-'}
      />
      <DetailCardContent
        title="Local Government"
        subtitle={detailData?.userBio?.permanentAddress?.localGovernment?.local ?? '-'}
      />
      <DetailCardContent
        title="Ward No"
        subtitle={detailData?.userBio?.permanentAddress?.wardNo ?? '-'}
      />
      <DetailCardContent
        title="Locality"
        subtitle={detailData?.userBio?.permanentAddress?.locality?.local ?? '-'}
      />
      <DetailCardContent
        title="House No"
        subtitle={detailData?.userBio?.permanentAddress?.houseNo ?? '-'}
      />
    </DetailsCard>
  );
};
