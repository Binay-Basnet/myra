import { IoCopyOutline } from 'react-icons/io5';
import { useRouter } from 'next/router';
import { Avatar } from '@chakra-ui/react';

import { Box, Chips, DetailPageTabs, Icon, Text } from '@myra-ui';

import {
  CooperativeBasicMinInfo,
  CooperativeUnionBasicMinInfo,
  IndividualBasicMinInfo,
  InstitutionBasicMinInfo,
  useGetMemberKymDetailsOverviewQuery,
} from '@coop/cbs/data-access';
import { copyToClipboard } from '@coop/shared/utils';

export const MemberDetailsSidebar = () => {
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
    <Box bg="white">
      <Box borderBottom="1px" borderBottomColor="border.layout" display="flex" gap="s12" p="s16">
        <Avatar
          h="72px"
          w="72px"
          borderRadius="br2"
          src={
            memberInfo?.profilePic ??
            memberBasicInstitution?.profilePic ??
            memberBasicCooperative?.profilePic ??
            memberBasicCooperativeUnion?.profilePic ??
            ''
          }
          name={
            memberInfo?.memberName
              ? (memberInfo?.memberName as string)
              : memberBasicInstitution?.memberName
              ? (memberBasicInstitution?.memberName as string)
              : memberBasicCooperative?.memberName
              ? (memberBasicCooperative?.memberName as string)
              : (memberBasicCooperativeUnion?.memberName as string)
          }
        />
        <Box display="flex" flexDirection="column" gap="s4">
          <Box display="inline-block">
            {memberInfo?.isStaff && (
              <Chips variant="outline" theme="info" size="md" type="label" label="Staff" />
            )}
            {memberBasicInstitution && (
              <Chips variant="outline" theme="info" size="sm" type="label" label="Institute" />
            )}
            {memberBasicCooperative && (
              <Chips variant="outline" theme="info" size="sm" type="label" label="Coop" />
            )}
            {memberBasicCooperativeUnion && (
              <Chips variant="outline" theme="info" size="sm" type="label" label="Coop Union" />
            )}
          </Box>
          <Text fontSize="r3" lineHeight="125%" fontWeight="600">
            {memberInfo?.memberName}
            {memberBasicInstitution?.memberName}
            {memberBasicCooperative?.memberName}
            {memberBasicCooperativeUnion?.memberName}
          </Text>

          {memberInfo?.memberCode && (
            <Box display="flex" alignItems="center" gap="s4">
              <Text fontSize="r1" color="primary.500" fontWeight="600">
                {' '}
                {memberInfo?.memberCode}
                {memberBasicInstitution?.memberCode}
                {memberBasicCooperative?.memberCode}
                {memberBasicCooperativeUnion?.memberCode}
              </Text>
              <Icon
                _hover={{ cursor: 'pointer' }}
                size="sm"
                as={IoCopyOutline}
                onClick={() =>
                  copyToClipboard(
                    memberInfo
                      ? (memberInfo?.memberCode as string)
                      : memberBasicInstitution
                      ? (memberBasicInstitution?.memberCode as string)
                      : memberBasicCooperative
                      ? (memberBasicCooperative?.memberCode as string)
                      : (memberBasicCooperativeUnion?.memberCode as string)
                  )
                }
              />
            </Box>
          )}
          <Text fontSize="s3" color="gray.500" lineHeight="125%" fontWeight="400">
            {' '}
            Member Since :{' '}
            {memberInfo?.memberJoined?.local ??
              memberBasicInstitution?.memberJoined?.local ??
              memberBasicCooperative?.memberJoined?.local ??
              memberBasicCooperativeUnion?.memberJoined?.local}
          </Text>
        </Box>
      </Box>

      <DetailPageTabs
        tabs={[
          'Overview',
          'Saving Accounts',
          'Share',
          // 'Reports',
          'Loan',
          'Bio',
          'Transactions',
          // 'Activity',
          'Withdraw Slip',
          // 'Documents',
          // 'Tasks',
        ]}
      />
    </Box>
  );
};
