import { useRouter } from 'next/router';

import { DetailsCard } from '@myra-ui';

import { useGetMemberDetailsOverviewQuery } from '@coop/cbs/data-access';

import { ReportTableComponent } from './ChequeTableComponent';

export const ChequeTable = () => {
  const router = useRouter();

  const memberDetails = useGetMemberDetailsOverviewQuery({
    id: router.query['id'] as string,
  });
  const memberReportsDetails = memberDetails?.data?.members?.memberOverview?.data?.cheques;

  const memberListData =
    memberReportsDetails?.map((data, index) => ({
      sn: Number(index) + 1,
      accounttName: data?.accountName,
      used: data?.used,
      left: data?.left,
    })) || [];
  return (
    <DetailsCard hasTable bg="white" title="Reports List">
      <ReportTableComponent data={memberListData} />
    </DetailsCard>
  );
};
