import { DetailsCard } from '@myra-ui';

import { RolesTableComponent } from './RolesTable';
import { useUserDetailsHooks } from '../hooks/useUserDetailsHooks';

export const RolesFullTable = () => {
  const { detailData } = useUserDetailsHooks();

  const rolesData =
    detailData?.userOverview?.role?.map((data, index) => ({
      sn: Number(index) + 1,
      id: data?.id,
      name: data?.name,
    })) || [];
  return (
    <DetailsCard hasTable bg="white" title="Roles">
      <RolesTableComponent data={rolesData} />
    </DetailsCard>
  );
};
