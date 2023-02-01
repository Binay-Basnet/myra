import { useRouter } from 'next/router';

import { DetailCardContent, DetailsCard, Text } from '@myra-ui';

import {
  CooperativeBasicMinInfo,
  CooperativeUnionBasicMinInfo,
  IndividualBasicMinInfo,
  InstitutionBasicMinInfo,
  useGetMemberKymDetailsOverviewQuery,
} from '@coop/cbs/data-access';

export const MemberBasicInformation = () => {
  const router = useRouter();
  const memberDetails = useGetMemberKymDetailsOverviewQuery({
    id: router.query['id'] as string,
  });

  const memberBasicInfo =
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
    <>
      {' '}
      {memberBasicInfo && (
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
          <DetailCardContent title="Member Service Centre" subtitle={memberBasicInfo?.branchName} />
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
      )}
      {memberBasicInstitution && (
        <DetailsCard title="Basic Information " bg="white" hasThreeRows>
          <DetailCardContent
            title="Name of Institution"
            subtitle={memberBasicInstitution?.memberName}
          />
          <DetailCardContent title="Institution Type" subtitle={memberBasicInstitution?.type} />
          <DetailCardContent
            title="Member Service Centre"
            subtitle={memberBasicInstitution?.branchName}
          />
          <DetailCardContent title="Nature of Business" subtitle={memberBasicInstitution?.nature} />
          <DetailCardContent
            title="Registration Date"
            subtitle={memberBasicInstitution?.registrationDate?.local}
          />
          <DetailCardContent title="VAT/PAN No" subtitle={memberBasicInstitution?.vatPanNo} />
          <DetailCardContent
            title="No of Service Centre"
            subtitle={memberBasicInstitution?.noOfServiceCenters}
          />
        </DetailsCard>
      )}
      {memberBasicCooperative && (
        <DetailsCard title="Basic Information " bg="white" hasThreeRows>
          <DetailCardContent
            title="Name of Institution"
            subtitle={memberBasicCooperative?.memberName}
          />
          <DetailCardContent
            title="Registration No"
            subtitle={memberBasicCooperative?.registrationNo}
          />
          <DetailCardContent
            title="Member Service Centre"
            subtitle={memberBasicCooperative?.branchName}
          />
          <DetailCardContent
            title="Registration Office"
            subtitle={memberBasicCooperative?.registrationOffice}
          />
          <DetailCardContent
            title="Registration Date"
            subtitle={memberBasicCooperative?.registrationDate?.local}
          />
        </DetailsCard>
      )}
      {memberBasicCooperativeUnion && (
        <DetailsCard title="Basic Information " bg="white" hasThreeRows>
          <DetailCardContent
            title="Name of Institution"
            subtitle={memberBasicCooperativeUnion?.memberName}
          />
          <DetailCardContent
            title="Institution Type"
            subtitle={memberBasicCooperativeUnion?.type}
          />
          <DetailCardContent
            title="Member Service Centre"
            subtitle={memberBasicCooperativeUnion?.branchName}
          />
          <DetailCardContent
            title="Nature of Business"
            subtitle={memberBasicCooperativeUnion?.nature}
          />
          <DetailCardContent
            title="Registration Date"
            subtitle={memberBasicCooperativeUnion?.registrationDate?.local}
          />
          <DetailCardContent title="VAT/PAN No" subtitle={memberBasicCooperativeUnion?.vatPanNo} />
          <DetailCardContent
            title="No of Service Centre"
            subtitle={memberBasicCooperativeUnion?.noOfServiceCenters}
          />
        </DetailsCard>
      )}
    </>
  );
};
