import { useMemo, useState } from 'react';
import { IconType } from 'react-icons';
import { HiOutlineRefresh } from 'react-icons/hi';
import { useDisclosure } from '@chakra-ui/react';

import { Box, DetailPageQuickLinks, Scrollable, Text } from '@myra-ui';

import UpdateBalanceLimitModal from './UpdateBalanceLimitModal';
import {
  SideBar,
  UpdateAccountPremiumModal,
  UpdatePrematurePenaltyModal,
  UpdateRebateModal,
  UpdateTenureModal,
  UpdateWithdrawPenaltyModal,
} from '../components';
import { useSavingDepositHook } from '../hooks/useSavingDepositHook';

export const GeneralUpdatesPage = () => {
  const { detailData } = useSavingDepositHook();

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
    isOpen: isTenureModalOpen,
    onClose: onTenureModalClose,
    onToggle: onTenureModalToggle,
  } = useDisclosure();

  const {
    isOpen: isPrematurePenaltyModalOpen,
    onClose: onPrematurePenaltyModalClose,
    onToggle: onPrematurePenaltyModalToggle,
  } = useDisclosure();

  const {
    isOpen: isWithdrawPenaltyModalOpen,
    onClose: onWithdrawPenaltyModalClose,
    onToggle: onWithdrawPenaltyModalToggle,
  } = useDisclosure();

  const {
    isOpen: isRebateModalOpen,
    onClose: onRebateModalClose,
    onToggle: onRebateModalToggle,
  } = useDisclosure();

  const updateOptions = useMemo(() => {
    const options: { title: string; link?: string; icon?: IconType; onClick?: () => void }[] = [
      {
        title: 'Balance Limit',
        onClick: () => setIsUpdateBalanceLimitOpen(true),
        icon: HiOutlineRefresh,
      },
      {
        title: 'Account Premium',
        onClick: onAccountPremiumModalToggle,
        icon: HiOutlineRefresh,
      },
    ];

    if (detailData?.nature === 'RECURRING_SAVING' || detailData?.nature === 'TERM_SAVING_OR_FD') {
      options.push(
        ...[
          {
            title: 'Tenure',
            onClick: onTenureModalToggle,
            icon: HiOutlineRefresh,
          },
          {
            title: 'Premature Penalty',
            onClick: onPrematurePenaltyModalToggle,
            icon: HiOutlineRefresh,
          },
          {
            title: 'Withdraw Penalty',
            onClick: onWithdrawPenaltyModalToggle,
            icon: HiOutlineRefresh,
          },
        ]
      );
    }

    if (
      detailData?.nature === 'RECURRING_SAVING' ||
      (detailData?.nature === 'SAVING' && detailData?.isMandatorySaving)
    ) {
      options.push({
        title: 'Rebate',
        onClick: onRebateModalToggle,
        icon: HiOutlineRefresh,
      });
    }

    return options;
  }, [detailData]);

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

      <UpdateAccountPremiumModal
        isOpen={isAccountPremiumModalOpen}
        onClose={onAccountPremiumModalClose}
      />

      <UpdateTenureModal isOpen={isTenureModalOpen} onClose={onTenureModalClose} />

      <UpdatePrematurePenaltyModal
        isOpen={isPrematurePenaltyModalOpen}
        onClose={onPrematurePenaltyModalClose}
      />

      <UpdateWithdrawPenaltyModal
        isOpen={isWithdrawPenaltyModalOpen}
        onClose={onWithdrawPenaltyModalClose}
      />

      <UpdateRebateModal isOpen={isRebateModalOpen} onClose={onRebateModalClose} />
    </>
  );
};

export default GeneralUpdatesPage;
