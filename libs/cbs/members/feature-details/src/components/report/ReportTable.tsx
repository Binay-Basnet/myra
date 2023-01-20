import { useRouter } from 'next/router';

import { DetailsCard } from '@myra-ui';

import { useGetMemberKymDetailsReportQuery } from '@coop/cbs/data-access';

import { ReportTableComponent } from './ReportTableComponent';

export const ReportTable = () => {
  const router = useRouter();

  const memberDetails = useGetMemberKymDetailsReportQuery({
    id: router.query['id'] as string,
  });
  const memberReportsDetails = memberDetails?.data?.members?.memberOverviewV2?.reports?.data?.list;

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
