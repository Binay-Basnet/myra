import { useMemo, useState } from 'react';
import { HiOutlineRefresh } from 'react-icons/hi';
import { useDisclosure } from '@chakra-ui/react';

import { Box, DetailPageQuickLinks, Scrollable, Text } from '@myra-ui';

import {
  SideBar,
  UpdateLoanAccountPremiumModal,
  UpdateLoanPrematurePenaltyModal,
  UpdateLoanTenureModal,
} from '../components';
import UpdateBalanceLimitModal from '../components/LoanDetailsUpdateBalanceLimitModal';

export const GeneralUpdatesPage = () => {
  const [isUpdateBalanceLimitOpen, setIsUpdateBalanceLimitOpen] = useState(false);

  const handleUpdateBalanceLimitModalClose = () => {
    setIsUpdateBalanceLimitOpen(false);
  };

  const {
    isOpen: isAccountPremiumModalOpen,
    onClose: onAccountPremiumModalClose,
    onToggle: onAccountPremiumModalToggle,
  } = useDisclosure();

  const {
    isOpen: isUpdateTenureModalOpen,
    onClose: onUpdateTenureModalClose,
    onToggle: onUpdateTenureModalToggle,
  } = useDisclosure();

  const {
    isOpen: isUpdatePrematureModalOpen,
    onClose: onUpdatePrematureModalClose,
    onToggle: onUpdatePrematureModalToggle,
  } = useDisclosure();

  const updateOptions = useMemo(
    () => [
      {
        title: 'Loan Limit',
        onClick: () => setIsUpdateBalanceLimitOpen(true),
        icon: HiOutlineRefresh,
      },
      {
        title: 'Account Premium',
        onClick: onAccountPremiumModalToggle,
        icon: HiOutlineRefresh,
      },
      {
        title: 'Tenure',
        onClick: onUpdateTenureModalToggle,
        icon: HiOutlineRefresh,
      },
      {
        title: 'Premature Penalty',
        onClick: onUpdatePrematureModalToggle,
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

      <UpdateLoanAccountPremiumModal
        isOpen={isAccountPremiumModalOpen}
        onClose={onAccountPremiumModalClose}
      />

      <UpdateLoanTenureModal isOpen={isUpdateTenureModalOpen} onClose={onUpdateTenureModalClose} />

      <UpdateLoanPrematurePenaltyModal
        isOpen={isUpdatePrematureModalOpen}
        onClose={onUpdatePrematureModalClose}
      />
    </>
  );
};

export default GeneralUpdatesPage;
