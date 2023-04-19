import { useMemo, useState } from 'react';
import { HiOutlineRefresh } from 'react-icons/hi';

import { Box, DetailPageQuickLinks, Scrollable, Text } from '@myra-ui';

import UpdateBalanceLimitModal from './UpdateBalanceLimitModal';
import { SideBar } from '../components';

export const GeneralUpdatesPage = () => {
  const [isUpdateBalanceLimitOpen, setIsUpdateBalanceLimitOpen] = useState(false);

  const handleUpdateBalanceLimitModalClose = () => {
    setIsUpdateBalanceLimitOpen(false);
  };

  const updateOptions = useMemo(
    () => [
      {
        title: 'Update Balance Limit',
        onClick: () => setIsUpdateBalanceLimitOpen(true),
        icon: HiOutlineRefresh,
      },
    ],
    []
  );

  return (
    <>
      <Box display="flex">
        <Box
          bg="gray.0"
          w="320px"
          position="fixed"
          h="calc(100vh - 110px)"
          borderRight="1px"
          borderRightColor="border.layout"
        >
          <SideBar />
        </Box>

        <Scrollable detailPage>
          <Box bg="background.500" ml="320px" p="s16" display="flex" flexDir="column" gap="s16">
            <Box display="flex" justifyContent="space-between" alignItems="center" w="100%">
              <Text fontWeight="SemiBold" fontSize="r3" color="gray.800" lineHeight="150%">
                General Updates
              </Text>
            </Box>
          </Box>
          <Box bg="background.500" ml="320px" p="s16" minH="100vh">
            <DetailPageQuickLinks links={updateOptions} />
          </Box>
        </Scrollable>
      </Box>
      <UpdateBalanceLimitModal
        isOpen={isUpdateBalanceLimitOpen}
        onClose={handleUpdateBalanceLimitModalClose}
      />
    </>
  );
};

export default GeneralUpdatesPage;
