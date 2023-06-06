import { IoCopyOutline } from 'react-icons/io5';

import { Box, DetailPageTabs, Icon, Text } from '@myra-ui';

import { copyToClipboard } from '@coop/shared/utils';

import { useSupplierDetails } from '../hooks/useSuppliersDetails';

export const SupplierDetailsSideBar = () => {
  const { detailData } = useSupplierDetails();
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
          <Box display="flex" flexDir="column" gap="s4">
            <Text fontSize="r1" fontWeight="600" color="primary.800" wordBreak="break-all">
              {detailData?.supplierName}
            </Text>
            <Box display="flex" gap="s8">
              <Text fontSize="r1" fontWeight="400" color="gray.800" wordBreak="break-all">
                {detailData?.supplierCode}
              </Text>
              <Icon
                _hover={{ cursor: 'pointer' }}
                size="sm"
                as={IoCopyOutline}
                onClick={() => copyToClipboard(detailData?.supplierCode)}
              />
            </Box>
          </Box>
        </Box>
      </Box>{' '}
      <DetailPageTabs tabs={['OVERVIEW']} />
    </>
  );
};
