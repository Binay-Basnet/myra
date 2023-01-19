import { useRouter } from 'next/router';

import { DetailsCard } from '@myra-ui';

import { useGetMemberKymDetailsWithdrawSlipsQuery } from '@coop/cbs/data-access';

import { ReportTableComponent } from './ChequeTableComponent';

export const ChequeTable = () => {
  const router = useRouter();

  const memberDetails = useGetMemberKymDetailsWithdrawSlipsQuery({
    id: router.query['id'] as string,
  });
  const memberReportsDetails = memberDetails?.data?.members?.memberOverviewV2?.cheques?.data;

  const memberListData =
    memberReportsDetails?.map((data, index) => ({
      sn: Number(index) + 1,
      id: data?.accountId,
      accounttName: data?.accountName,
      used: data?.used,
      left: data?.left,
    })) || [];
  return (
    <DetailsCard hasTable bg="white" title="Issued Withdraw Slip List">
      <ReportTableComponent data={memberListData} />
    </DetailsCard>
  );
};
