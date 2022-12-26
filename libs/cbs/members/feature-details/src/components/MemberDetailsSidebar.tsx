import { IoCopyOutline } from 'react-icons/io5';
import { useRouter } from 'next/router';
import { Avatar } from '@chakra-ui/react';

import { Box, Chips, DetailPageTabs, Icon, Text } from '@myra-ui';

import {
  CooperativeBasicMinInfo,
  CooperativeUnionBasicMinInfo,
  IndividualBasicMinInfo,
  InstitutionBasicMinInfo,
  useGetMemberOverviewBasicDetailsQuery,
} from '@coop/cbs/data-access';
import { copyToClipboard } from '@coop/shared/utils';

export const MemberDetailsSidebar = () => {
  const router = useRouter();
  const memberDetails = useGetMemberOverviewBasicDetailsQuery({
    id: router.query['id'] as string,
  });

  const memberInfo =
    memberDetails?.data?.members?.memberOverview?.data?.overview?.basicInformation?.__typename ===
    'IndividualBasicMinInfo'
      ? (memberDetails?.data?.members?.memberOverview?.data?.overview
          ?.basicInformation as IndividualBasicMinInfo)
      : null;

  const memberBasicInstitution =
    memberDetails?.data?.members?.memberOverview?.data?.overview?.basicInformation?.__typename ===
    'InstitutionBasicMinInfo'
      ? (memberDetails?.data?.members?.memberOverview?.data?.overview
          ?.basicInformation as InstitutionBasicMinInfo)
      : null;
  const memberBasicCooperative =
    memberDetails?.data?.members?.memberOverview?.data?.overview?.basicInformation?.__typename ===
    'CooperativeBasicMinInfo'
      ? (memberDetails?.data?.members?.memberOverview?.data?.overview
          ?.basicInformation as CooperativeBasicMinInfo)
      : null;
  const memberBasicCooperativeUnion =
    memberDetails?.data?.members?.memberOverview?.data?.overview?.basicInformation?.__typename ===
    'CooperativeUnionBasicMinInfo'
      ? (memberDetails?.data?.members?.memberOverview?.data?.overview
          ?.basicInformation as CooperativeUnionBasicMinInfo)
      : null;

  return (
    <Box bg="white">
      <Box
        borderBottom="1px"
        borderBottomColor="border.layout"
        display="flex"
        flexDirection="column"
        gap="s16"
        p="s16"
      >
        <Avatar
          h="288px"
          w="288px"
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
        <Box display="flex" flexDirection="column" gap="s8">
          <Box display="flex" alignItems="center" gap="s8">
            <Text fontSize="l1" fontWeight="600">
              {memberInfo?.memberName}
              {memberBasicInstitution?.memberName}
              {memberBasicCooperative?.memberName}
              {memberBasicCooperativeUnion?.memberName}
            </Text>
            {memberInfo?.isStaff && (
              <Chips
                variant="solid"
                theme="info"
                size="md"
                type="label"
                label="Staff"
                minWidth="fit-content"
              />
            )}
            {memberBasicInstitution && (
              <Chips
                variant="solid"
                theme="info"
                size="md"
                type="label"
                label="Institute"
                minWidth="fit-content"
              />
            )}
            {memberBasicCooperative && (
              <Chips
                variant="solid"
                theme="info"
                size="md"
                type="label"
                label="Coop"
                minWidth="fit-content"
              />
            )}
            {memberBasicCooperativeUnion && (
              <Chips
                variant="solid"
                theme="info"
                size="md"
                type="label"
                label="Coop Union"
                minWidth="fit-content"
              />
            )}
          </Box>
          {memberInfo?.memberCode && (
            <Box display="flex" alignItems="center" gap="s4">
              <Text fontSize="r1" fontWeight="600">
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
          <Text fontSize="r1" fontWeight="600">
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
