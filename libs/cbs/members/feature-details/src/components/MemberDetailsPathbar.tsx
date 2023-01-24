import { useRouter } from 'next/router';

import { Box, DetailPageHeader } from '@myra-ui';

import {
  CooperativeBasicMinInfo,
  CooperativeUnionBasicMinInfo,
  IndividualBasicMinInfo,
  InstitutionBasicMinInfo,
  useGetMemberKymDetailsOverviewQuery,
} from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';

interface PathBarProps {
  title: string;
}

export const MemberDetailsPathBar = ({ title }: PathBarProps) => {
  const router = useRouter();
  const memberDetails = useGetMemberKymDetailsOverviewQuery({
    id: router.query['id'] as string,
  });

  const memberInfo =
    memberDetails?.data?.members?.memberOverviewV2?.overview?.data?.basicInformation?.__typename ===
    'IndividualBasicMinInfo'
      ? (memberDetails?.data?.members?.memberOverviewV2?.overview?.data
          ?.basicInformation as IndividualBasicMinInfo)
      : null;

  const memberBasicInstitution =
    memberDetails?.data?.members?.memberOverviewV2?.overview?.data?.basicInformation?.__typename ===
    'InstitutionBasicMinInfo'
      ? (memberDetails?.data?.members?.memberOverviewV2?.overview?.data
          ?.basicInformation as InstitutionBasicMinInfo)
      : null;
  const memberBasicCooperative =
    memberDetails?.data?.members?.memberOverviewV2?.overview?.data?.basicInformation?.__typename ===
    'CooperativeBasicMinInfo'
      ? (memberDetails?.data?.members?.memberOverviewV2?.overview?.data
          ?.basicInformation as CooperativeBasicMinInfo)
      : null;
  const memberBasicCooperativeUnion =
    memberDetails?.data?.members?.memberOverviewV2?.overview?.data?.basicInformation?.__typename ===
    'CooperativeUnionBasicMinInfo'
      ? (memberDetails?.data?.members?.memberOverviewV2?.overview?.data
          ?.basicInformation as CooperativeUnionBasicMinInfo)
      : null;

  return (
    <Box position="sticky" top="0" w="100%" zIndex={10}>
      <DetailPageHeader
        title={title}
        backLink={ROUTES.CBS_MEMBER_LIST}
        member={{
          name: memberInfo?.memberName
            ? (memberInfo?.memberName as string)
            : memberBasicInstitution?.memberName
            ? (memberBasicInstitution?.memberName as string)
            : memberBasicCooperative?.memberName
            ? (memberBasicCooperative?.memberName as string)
            : (memberBasicCooperativeUnion?.memberName as string),
        }}
      />
    </Box>
  );
};
