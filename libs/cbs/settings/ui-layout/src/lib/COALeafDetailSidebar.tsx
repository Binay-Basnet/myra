import { IoCopyOutline } from 'react-icons/io5';

import { Box, DetailPageTabs, Icon, Text } from '@myra-ui';

import { copyToClipboard } from '@coop/shared/utils';
import {
  useCOAAccountDetails,
  useCOALeafNodeDetails,
} from 'libs/cbs/settings/feature-coa/src/hooks';
import { localizedDate, localizedText } from '@coop/cbs/utils';

export const COALeafDetailSidebar = () => {
  const { leafNodeData } = useCOALeafNodeDetails();

  return (
    <>
      <Box
        borderBottom="1px"
        borderBottomColor="border.layout"
        display="flex"
        p="s16"
        justifyContent="space-between"
      >
        <Box display="flex" flexDirection="column" gap="s8" width="100%">
          <Box display="flex" flexDirection="column">
            <Box display="flex" justifyContent="space-between">
              <Text fontSize="r1" fontWeight={600} color="primary.500">
                {localizedText(leafNodeData?.accountName)}
              </Text>
            </Box>
            <Box display="flex" alignItems="center" gap="s4">
              <Text
                fontSize="s3"
                fontWeight={400}
                color="neutralColorLight.Gray-50"
                wordBreak="break-all"
              >
                #{leafNodeData?.id}
              </Text>
              <Icon
                _hover={{ cursor: 'pointer' }}
                size="sm"
                as={IoCopyOutline}
                onClick={() => copyToClipboard('#122334343434434')}
              />
            </Box>
          </Box>
          <Text fontSize="s3" fontWeight={400} color="neutralColorLight.Gray-70">
            {leafNodeData?.accountType}
          </Text>
        </Box>
      </Box>

      <Box borderBottom="1px" borderBottomColor="border.layout" p="s16" display="flex" gap="s4">
        <Text fontSize="s3" fontWeight={400} color="neutralColorLight.Gray-70">
          Created Date:
        </Text>
        <Text fontSize="s3" fontWeight={500} color="neutralColorLight.Gray-70">
          {localizedDate(leafNodeData?.date)}
        </Text>
      </Box>

      {/* <Box
        borderBottom="1px"
        borderBottomColor="border.layout"
        display="flex"
        flexDirection="column"
      >
        <DetailPageMemberCard
          name={accountDetails?.member?.name?.local as string}
          profilePicUrl={accountDetails?.member?.profilePicUrl ?? ''}
        />
      </Box> */}

      <DetailPageTabs
        tabs={[
          'Overview',
          'Ledger',
          // 'ATM',
          // 'Activity',
          // 'Documents',
          // 'Tasks',
        ]}
      />
    </>
  );
};
