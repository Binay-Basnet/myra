import { useRouter } from 'next/router';

import { useGetMemberDetailsOverviewQuery } from '@coop/cbs/data-access';
import { DetailsCard } from '@coop/shared/ui';

import { ReportTableComponent } from './ReportTableComponent';

export const ReportTable = () => {
  const router = useRouter();

  const memberDetails = useGetMemberDetailsOverviewQuery({
    id: router.query['id'] as string,
  });
  const memberReportsDetails = memberDetails?.data?.members?.memberOverview?.data?.reports?.list;

  const memberListData =
    memberReportsDetails?.map((data, index) => ({
      sn: Number(index) + 1,
      code: data?.code,
      reportName: data?.reportName,
      category: data?.category,
    })) || [];
  return (
    <DetailsCard hasTable bg="white" title="Reports List">
      <ReportTableComponent data={memberListData} />
    </DetailsCard>
  );
};
