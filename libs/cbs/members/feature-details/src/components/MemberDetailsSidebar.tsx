import { IoCopyOutline } from 'react-icons/io5';
import { useRouter } from 'next/router';
import { Avatar } from '@chakra-ui/react';

import { Box, DetailPageTabs, Icon, Tags, Text } from '@myra-ui';

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
              {' '}
              {memberInfo?.memberName}
              {memberBasicInstitution?.memberName}
              {memberBasicCooperative?.memberName}
              {memberBasicCooperativeUnion?.memberName}
            </Text>
            {memberInfo?.isStaff && (
              <Tags
                label="staff"
                type="chip"
                bg="info.0"
                labelColor="info.500"
                minW="fit-content"
              />
            )}
            {memberBasicInstitution && (
              <Tags
                label="institute"
                type="chip"
                bg="info.0"
                labelColor="info.500"
                minW="fit-content"
              />
            )}
            {memberBasicCooperative && (
              <Tags label="coop" type="chip" bg="info.0" labelColor="info.500" minW="fit-content" />
            )}
            {memberBasicCooperativeUnion && (
              <Tags
                label="coop-union"
                type="chip"
                bg="info.0"
                labelColor="info.500"
                minW="fit-content"
              />
            )}
            {memberBasicInstitution && (
              <Tags label="institute" type="chip" bg="info.0" labelColor="info.500" />
            )}
            {memberBasicCooperative && (
              <Tags label="coop" type="chip" bg="info.0" labelColor="info.500" />
            )}
            {memberBasicCooperativeUnion && (
              <Tags label="coop-union" type="chip" bg="info.0" labelColor="info.500" />
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
          'Reports',
          'Loan',
          'Bio',
          'Transactions',
          // 'Activity',
          'Withdraw Slip',
          // 'Documents',
          'Tasks',
        ]}
      />
    </Box>
  );
};
