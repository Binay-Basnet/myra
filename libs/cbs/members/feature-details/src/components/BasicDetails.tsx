import { useRouter } from 'next/router';

import { useGetMemberDetailsOverviewQuery } from '@coop/cbs/data-access';
import { DetailsCard, Text } from '@myra-ui';

export const MemberBasicInformation = () => {
  const router = useRouter();
  const memberDetails = useGetMemberDetailsOverviewQuery({
    id: router.query['id'] as string,
  });

  const memberBasicInfo =
    memberDetails?.data?.members?.memberOverview?.data?.overview?.basicInformation;
  return (
    <DetailsCard title="Basic Information " bg="white" hasThreeRows>
      {memberBasicInfo?.gender?.local && (
        <Text fontSize="s2" fontWeight="400">
          Gender:<b>{memberBasicInfo?.gender?.local}</b>
        </Text>
      )}
      {memberBasicInfo?.maritalStatus?.local && (
        <Text fontSize="s2" fontWeight="400">
          <>
            Marital Status:<b> {memberBasicInfo?.maritalStatus?.local} </b>
          </>
        </Text>
      )}
      {memberBasicInfo?.contactNumber && (
        <Text fontSize="s2" fontWeight="400">
          Contat Number:<b> {memberBasicInfo?.contactNumber} </b>
        </Text>
      )}
      {memberBasicInfo?.email && (
        <Text fontSize="s2" fontWeight="400">
          Email:<b> {memberBasicInfo?.email} </b>
        </Text>
      )}
      {memberBasicInfo?.address?.local && (
        <Text fontSize="s2" fontWeight="400">
          Address:<b>{memberBasicInfo?.address?.local} </b>
        </Text>
      )}
      {memberBasicInfo?.fathersName && (
        <Text fontSize="s2" fontWeight="400">
          Father’s Name:<b> {memberBasicInfo?.fathersName} </b>
        </Text>
      )}
      {memberBasicInfo?.mothersName && (
        <Text fontSize="s2" fontWeight="400">
          Mother’s Name<b> {memberBasicInfo?.mothersName}</b>
        </Text>
      )}
      {memberBasicInfo?.grandFathersName && (
        <Text fontSize="s2" fontWeight="400">
          Grandfather’s Name:<b> {memberBasicInfo?.grandFathersName} </b>
        </Text>
      )}
    </DetailsCard>
  );
};
