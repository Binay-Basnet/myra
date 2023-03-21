import { useRouter } from 'next/router';

import { Box, Scrollable } from '@myra-ui';

import {
  CooperativeBasicMinInfo,
  CooperativeUnionBasicMinInfo,
  IndividualBasicMinInfo,
  InstitutionBasicMinInfo,
  useGetMemberKymDetailsOverviewQuery,
} from '@coop/cbs/data-access';

import { AddMinorModal, MemberDetailsPathBar, MemberDetailsSidebar } from '../components';
import {
  Accounts,
  Activity,
  Bio,
  Documents,
  Loan,
  MemberShareInfo,
  Overview,
  Reports,
  Tasks,
  Transactions,
  WithdrawSlip,
} from '../tabs';

export interface CbsMemberDetailsProps {
  isAddMinorModalOpen?: boolean;
  handleMinorAccountClose: () => void;
  options?: { label: string; handler: () => void }[];
}
export const MemberDetails = ({
  isAddMinorModalOpen,
  handleMinorAccountClose,
  options,
}: CbsMemberDetailsProps) => {
  const router = useRouter();

  const memberId = router.query['id'] as string;
  const tabQuery = router.query['tab'] as string;
  const memberDetailsData = useGetMemberKymDetailsOverviewQuery({
    id: memberId as string,
  });
  const memberIndividual =
    memberDetailsData?.data?.members?.memberOverviewV2?.overview?.data?.basicInformation
      ?.__typename === 'IndividualBasicMinInfo'
      ? (memberDetailsData?.data?.members?.memberOverviewV2?.overview?.data
          ?.basicInformation as IndividualBasicMinInfo)
      : null;

  const memberBasicInstitution =
    memberDetailsData?.data?.members?.memberOverviewV2?.overview?.data?.basicInformation
      ?.__typename === 'InstitutionBasicMinInfo'
      ? (memberDetailsData?.data?.members?.memberOverviewV2?.overview?.data
          ?.basicInformation as InstitutionBasicMinInfo)
      : null;

  const memberBasicCooperative =
    memberDetailsData?.data?.members?.memberOverviewV2?.overview?.data?.basicInformation
      ?.__typename === 'CooperativeBasicMinInfo'
      ? (memberDetailsData?.data?.members?.memberOverviewV2?.overview?.data
          ?.basicInformation as CooperativeBasicMinInfo)
      : null;

  const memberBasicCooperativeUnion =
    memberDetailsData?.data?.members?.memberOverviewV2?.overview?.data?.basicInformation
      ?.__typename === 'CooperativeUnionBasicMinInfo'
      ? (memberDetailsData?.data?.members?.memberOverviewV2?.overview?.data
          ?.basicInformation as CooperativeUnionBasicMinInfo)
      : null;

  let memberType = 'individual';
  if (memberIndividual) {
    memberType = 'individual';
  } else if (memberBasicInstitution) {
    memberType = 'institution';
  } else if (memberBasicCooperative) {
    memberType = 'coop';
  } else if (memberBasicCooperativeUnion) {
    memberType = 'coop_union';
  } else {
    memberType = 'individual';
  }

  return (
    <>
      <MemberDetailsPathBar
        title="Member List"
        options={memberType === 'individual' ? options : undefined}
      />
      <Box display="flex">
        <Box
          w="320px"
          h="100%"
          sx={{
            '&::-webkit-scrollbar': {
              display: 'none',
            },
          }}
        >
          <MemberDetailsSidebar />
        </Box>

        <Scrollable detailPage>
          <Box display="flex" p="s16" flexDir="column" gap="s16" bg="background.500">
            {(tabQuery === 'overview' || tabQuery === 'undefined' || !tabQuery) && <Overview />}
            {tabQuery === 'saving accounts' && <Accounts />}
            {tabQuery === 'activity' && <Activity />}
            {tabQuery === 'loan' && <Loan />}
            {tabQuery === 'bio' && <Bio />}
            {tabQuery === 'documents' && <Documents />}
            {tabQuery === 'reports' && <Reports />}
            {tabQuery === 'tasks' && <Tasks />}
            {tabQuery === 'share' && <MemberShareInfo />}
            {tabQuery === 'transactions' && <Transactions />}
            {tabQuery === 'withdraw slip' && <WithdrawSlip />}
          </Box>
        </Scrollable>
      </Box>

      <AddMinorModal
        isOpen={isAddMinorModalOpen as boolean}
        onClose={handleMinorAccountClose}
        memberId={memberId}
      />
    </>
  );
};
