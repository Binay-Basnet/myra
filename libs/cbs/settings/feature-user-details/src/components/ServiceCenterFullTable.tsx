import { DetailsCard } from '@myra-ui';

import { ServiceCenterTableComponent } from './ServiceCenterTable';
import { useUserDetailsHooks } from '../hooks/useUserDetailsHooks';

export const ServiceCenterFullTable = () => {
  const { detailData } = useUserDetailsHooks();
  const rolesData =
    detailData?.userOverview?.branches?.map((data, index) => ({
      sn: Number(index) + 1,
      id: data?.id,
      name: data?.name,
      branchCode: data?.branchCode,
    })) || [];
  return (
    <DetailsCard hasTable bg="white" title="Service Centers List">
      <ServiceCenterTableComponent data={rolesData} />{' '}
    </DetailsCard>
  );
};
