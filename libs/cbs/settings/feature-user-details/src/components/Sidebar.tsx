import { Avatar, Box, DetailPageTabs, Text } from '@myra-ui';

import { localizedText } from '@coop/cbs/utils';

import { useUserDetailsHooks } from '../hooks/useUserDetailsHooks';

export const UsersDetailsSideBar = () => {
  const { sidebarData } = useUserDetailsHooks();

  return (
    <>
      <Box
        borderBottom="1px"
        borderBottomColor="border.layout"
        display="flex"
        flexDirection="column"
        // _hover={{
        //   cursor: 'pointer',
        // }}
      >
        <Box h="94px" w="100%" px="s16" display="flex" alignItems="center" gap="s8">
          <Avatar
            src={sidebarData?.userProfilePic as string}
            size="sm"
            name={localizedText(sidebarData?.userName)}
          />
          <Box display="flex" flexDir="column">
            <Text fontSize="r1" fontWeight="600" color="primary.800" wordBreak="break-all">
              {localizedText(sidebarData?.userName)}
            </Text>

            <Text fontSize="r1" fontWeight="400" color="gray.800" wordBreak="break-all">
              {sidebarData?.userId}
            </Text>
          </Box>
        </Box>
      </Box>{' '}
      <DetailPageTabs
        tabs={[
          'OVERVIEW',
          'BIO',
          'ROLES',
          'SERVICE CENTER',
          // 'ACTIVITY', 'DOCUMENTS', 'TASKS'
        ]}
      />
    </>
  );
};
