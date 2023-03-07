import { useRef } from 'react';
import { AiOutlineSend } from 'react-icons/ai';
import { FiServer } from 'react-icons/fi';
import { HiOutlineSwitchHorizontal } from 'react-icons/hi';
import { useDisclosure } from '@chakra-ui/react';

import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Chips,
  Divider,
  Text,
} from '@myra-ui';

import { GuaranteeStatus, LoanAccountGurantee } from '@coop/cbs/data-access';

import { AccordianListCardComponent } from './AccordianCard';
import { PartialReleaseGuarantee } from './PartialReleaseGuarantee';
import { ReleaseGuarantee } from './ReleaseGuarantee';
import { SwitchGuarantee } from './SwitchGuarantee';

type GauranteeProps = {
  gauranteeList: LoanAccountGurantee | null | undefined;
};

export const GuaranteeList = ({ gauranteeList }: GauranteeProps) => {
  const switchAlertCancelRef = useRef<HTMLButtonElement | null>(null);

  const {
    isOpen: isSwitchAlertOpen,
    onClose: onSwitchAlertClose,
    onToggle: onSwitchAlertToggle,
  } = useDisclosure();

  const releaseAlertCancelRef = useRef<HTMLButtonElement | null>(null);

  const {
    isOpen: isReleaseAlertOpen,
    onClose: onReleaseAlertClose,
    onToggle: onReleaseAlertToggle,
  } = useDisclosure();

  const {
    isOpen: isPartialReleaseModalOpen,
    onClose: onPartialReleaseModalClose,
    onToggle: onPartialReleaseModalToggle,
  } = useDisclosure();

  const gauranteeListDetails = [
    {
      label: 'Member Name',
      value: gauranteeList?.memberName,
    },
    {
      label: 'Account Name',
      value: gauranteeList?.accountName,
    },
    {
      label: 'Maximum Guarantee Amount Available',
      value: gauranteeList?.maxGuranteeAmountLimit,
    },
    {
      label: 'Total Gurantee Amount',
      value: gauranteeList?.totalAmount,
    },
  ];

  return (
    <>
      <Box>
        <Accordion defaultIndex={[0]} display="flex" flexDirection="column" gap="s16" allowToggle>
          <AccordionItem key={1}>
            <AccordionButton>
              <Box
                flex="1"
                display="flex"
                p="s4"
                justifyContent="flex-start"
                gap="s8"
                alignItems="center"
              >
                <Box display="flex" flexDirection="column" gap="s4" textAlign="left">
                  <Box display="flex" gap="s8" alignItems="center">
                    <Text fontSize="r1" color="gray.800" lineHeight="150%" fontWeight="SemiBold">
                      {gauranteeList?.accountName}
                    </Text>
                    <Chips
                      variant="solid"
                      type="label"
                      size="sm"
                      theme={
                        gauranteeList?.guaranteeStatus === GuaranteeStatus.Active
                          ? 'success'
                          : 'warning'
                      }
                      label={gauranteeList?.guaranteeStatus as string}
                    />
                  </Box>
                  <Text fontSize="s3" color="gray.500" lineHeight="125%" fontWeight="Regular">
                    {gauranteeList?.productName}
                  </Text>
                </Box>
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel p="0">
              <AccordianListCardComponent columns={3} accordionCardDetails={gauranteeListDetails} />
              <Divider />
              <Box display="flex" gap="s16" p="s16">
                <Button leftIcon={<AiOutlineSend />} onClick={onReleaseAlertToggle}>
                  Release
                </Button>

                <Button
                  leftIcon={<FiServer />}
                  variant="outline"
                  onClick={onPartialReleaseModalToggle}
                >
                  Partial Release
                </Button>

                <Button
                  leftIcon={<HiOutlineSwitchHorizontal />}
                  onClick={onSwitchAlertToggle}
                  variant="ghost"
                >
                  Switch Guarantee
                </Button>
              </Box>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Box>

      <SwitchGuarantee
        isAlertOpen={isSwitchAlertOpen}
        alertCancelRef={switchAlertCancelRef}
        onAlertToggle={onSwitchAlertToggle}
        onAlertClose={onSwitchAlertClose}
        guarantee={gauranteeList}
      />

      <ReleaseGuarantee
        isAlertOpen={isReleaseAlertOpen}
        alertCancelRef={releaseAlertCancelRef}
        onAlertToggle={onReleaseAlertToggle}
        onAlertClose={onReleaseAlertClose}
        guarantee={gauranteeList}
      />

      <PartialReleaseGuarantee
        isModalOpen={isPartialReleaseModalOpen}
        onModalClose={onPartialReleaseModalClose}
        guarantee={gauranteeList}
      />
    </>
  );
};
