import { useRouter } from 'next/router';

import { useGetSettingsUserDetailsDataQuery } from '@coop/cbs/data-access';
import { localizedDate } from '@coop/cbs/utils';

export const useUserDetailsHooks = () => {
  const router = useRouter();

  const { id } = router.query;
  const { data } = useGetSettingsUserDetailsDataQuery({ userID: id as string });

  const detailData = data?.settings?.myraUser?.userDetail;

  const sidebarData = {
    userName: detailData?.basicInfo?.name,
    userId: detailData?.basicInfo?.userId,
    userProfilePic: detailData?.basicInfo?.profilePicUrl,
  };
  const userStats = [
    {
      summary: 'Roles',
      data: detailData?.userOverview?.rolesCount,
    },
    {
      summary: 'Associated Service Centers',
      data: detailData?.userOverview?.serviceCenterCount,
    },
    {
      summary: 'Last Active Date',
      data: localizedDate(detailData?.userOverview?.lastActiveDate),
    },
  ];

  return {
    detailData,
    sidebarData,
    userStats,
  };
};
