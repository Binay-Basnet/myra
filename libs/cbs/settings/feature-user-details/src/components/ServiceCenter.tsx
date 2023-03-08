import { useRouter } from 'next/router';

import { Button, DetailsCard } from '@myra-ui';

import { ROUTES } from '@coop/cbs/utils';

import { ServiceCenterTableComponent } from './ServiceCenterTable';
import { useUserDetailsHooks } from '../hooks/useUserDetailsHooks';

export const ServiceCenterTable = () => {
  const { detailData } = useUserDetailsHooks();
  const router = useRouter();
  const rolesData =
    detailData?.userOverview?.branches?.slice(0, 5)?.map((data, index) => ({
      sn: Number(index) + 1,
      id: data?.id,
      name: data?.name,
      branchCode: data?.branchCode,
    })) || [];
  return (
    <DetailsCard
      hasTable
      bg="white"
      title="Service Centers List"
      leftBtn={
        <Button
          variant="ghost"
          size="md"
          onClick={() =>
            router.push({
              pathname: ROUTES?.SETTINGS_USERS_DETAILS,
              query: {
                tab: 'service center',
                id: router.query['id'],
              },
            })
          }
        >
          View All Service Centers
        </Button>
      }
    >
      <ServiceCenterTableComponent data={rolesData} />{' '}
    </DetailsCard>
  );
};
