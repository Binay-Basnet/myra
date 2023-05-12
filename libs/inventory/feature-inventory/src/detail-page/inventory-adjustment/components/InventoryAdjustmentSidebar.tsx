import { Box, Chips, DetailPageTabs, Text } from '@myra-ui';

import { useInventoryAdjustmentHook } from '../hooks/useInventoryAdjustmentHook';

export const InventoryAdjustmentDetailsSidebar = () => {
  const { detailData } = useInventoryAdjustmentHook();

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
          px="s16"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box display="flex" flexDir="column">
            <Text fontSize="r1" fontWeight="600" color="primary.800" wordBreak="break-all">
              {detailData?.code}
            </Text>

            <Text fontSize="r1" fontWeight="400" color="gray.800" wordBreak="break-all">
              {`REF-NO: ${detailData?.referenceNo}`}
            </Text>
          </Box>
          <Chips variant="solid" type="label" size="md" theme="success" label="Adjusted" />
        </Box>
      </Box>{' '}
      <DetailPageTabs tabs={['OVERVIEW']} />
    </>
  );
};
