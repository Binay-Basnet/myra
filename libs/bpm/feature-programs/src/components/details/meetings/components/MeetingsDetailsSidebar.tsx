import { Box, DetailPageTabs, Text } from '@myra-ui';

import { useMeetingDetailsHook } from '../hooks/useMeetingDetails';

export const MeetingDetailsSideBar = () => {
  const { detailData } = useMeetingDetailsHook();
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
        <Box
          h="94px"
          w="100%"
          px="s32"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box display="flex" flexDir="column">
            <Text fontSize="r1" fontWeight="600" color="primary.800" wordBreak="break-all">
              {detailData?.overview?.title}
            </Text>
          </Box>
        </Box>
      </Box>{' '}
      <DetailPageTabs tabs={['OVERVIEW', 'MINUTES']} />
    </>
  );
};
