import { useRouter } from 'next/router';

import { Button, DetailsCard } from '@myra-ui';

import { ROUTES } from '@coop/cbs/utils';

import { RolesTableComponent } from './RolesTable';
import { useUserDetailsHooks } from '../hooks/useUserDetailsHooks';

export const RolesTable = () => {
  const { detailData } = useUserDetailsHooks();
  const router = useRouter();
  const rolesData =
    detailData?.userOverview?.role?.slice(0, 5)?.map((data, index) => ({
      sn: Number(index) + 1,
      id: data?.id,
      name: data?.name,
    })) || [];
  return (
    <DetailsCard
      hasTable
      bg="white"
      title="Roles"
      leftBtn={
        <Button
          variant="ghost"
          size="md"
          onClick={() =>
            router.push(`${ROUTES.SETTINGS_USERS_DETAILS}?id=${router.query['id']}&tab=roles`)
          }
        >
          View All Roles
        </Button>
      }
    >
      <RolesTableComponent data={rolesData} />
    </DetailsCard>
  );
};
