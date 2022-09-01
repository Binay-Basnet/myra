import { Member } from '@coop/cbs/data-access';
import { useTranslation } from '@coop/shared/utils';

import Avatar from '../avatar/Avatar';
import Box from '../box/Box';
import Text from '../text/Text';

/* eslint-disable-next-line */
export interface ShareMemberCardProps {
  memberDetails: Partial<Member>;
}

export function ShareMemberCard({ memberDetails }: ShareMemberCardProps) {
  const { t } = useTranslation();

  // const memberProfile =
  //   memberDetails?.profile && memberDetails?.profile?.data?.formData;
  return (
    <Box bg="gray.0" h="100%">
      <Box px="s12" py="s8">
        <Text
          fontWeight="Medium"
          fontSize="s3"
          color="neutralColorLight.Gray-60"
        >
          {t['memberInfo']}
        </Text>
      </Box>

      <Box p="s16" gap="s8" display="flex">
        <Avatar
          name={memberDetails?.name?.local ?? 'Member'}
          size="lg"
          src={memberDetails?.name?.local}
          cursor="pointer"
        />
        <Box display="flex" flexDirection="column">
          <Text fontWeight="Medium" fontSize="r1" color="primary.500">
            {memberDetails?.name?.local}
          </Text>
          <Text
            fontWeight="Regular"
            fontSize="r1"
            color="neutralColorLight.Gray-80"
          >
            {memberDetails?.id}
          </Text>
          <Text
            fontWeight="Regular"
            fontSize="r1"
            color="neutralColorLight.Gray-80"
          >
            {/* {memberProfile?.basicInformation?.gender?.local} |{' '}
            {memberProfile?.basicInformation?.age} */}
            Male | 19
          </Text>
        </Box>
      </Box>

      <Box p="s16">
        <Box
          bg="gray.100"
          display="flex"
          flexDirection="column"
          gap="s8"
          p="s16"
          border="1px solid"
          borderColor="border.layout"
        >
          <Box display="flex" justifyContent="space-between">
            <Text
              fontWeight="Medium"
              fontSize="s3"
              color="neutralColorLight.Gray-60"
            >
              Total Share Count
            </Text>
            <Text
              as="span"
              fontWeight="Medium"
              fontSize="s3"
              color="neutralColorLight.Gray-60"
            >
              600
            </Text>
          </Box>

          <Box display="flex" justifyContent="space-between">
            <Text
              fontWeight="Medium"
              fontSize="s3"
              color="neutralColorLight.Gray-60"
            >
              Total Share Balance
            </Text>
            <Text
              as="span"
              fontWeight="Medium"
              fontSize="s3"
              color="neutralColorLight.Gray-60"
            >
              600000
            </Text>
          </Box>
        </Box>

        <Box border="1px solid" borderColor="border.layout">
          <Box
            px="s12"
            py="s8"
            borderBottom="1px solid"
            borderBottomColor="border.layout"
            display="flex"
            justifyContent="space-between"
          >
            <Text
              fontWeight="Medium"
              fontSize="s3"
              color="neutralColorLight.Gray-60"
            >
              Share Issue
            </Text>
            <Text
              as="span"
              fontWeight="Medium"
              fontSize="s3"
              color="neutralColorLight.Gray-60"
            >
              100
            </Text>
          </Box>

          <Box
            px="s12"
            py="s8"
            display="flex"
            justifyContent="space-between"
            borderBottom="1px solid"
            borderBottomColor="border.layout"
          >
            <Text
              fontWeight="Medium"
              fontSize="s3"
              color="neutralColorLight.Gray-60"
            >
              Share Return
            </Text>
            <Text
              as="span"
              fontWeight="Medium"
              fontSize="s3"
              color="neutralColorLight.Gray-60"
            >
              100
            </Text>
          </Box>

          <Box px="s12" py="s8" display="flex" justifyContent="space-between">
            <Text fontWeight="Medium" fontSize="s3" color="primary.500">
              View All
            </Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default ShareMemberCard;
