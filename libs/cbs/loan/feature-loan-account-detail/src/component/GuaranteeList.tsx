import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Chips,
  Modal,
  Text,
} from '@myra-ui';

import { GuaranteeStatus, LoanAccountGurantee } from '@coop/cbs/data-access';
import { FormTextArea } from '@coop/shared/form';

import { AccordianListCardComponent } from './AccordianCard';

type GauranteeProps = {
  gauranteeList: LoanAccountGurantee | null | undefined;
};

export const GuaranteeList = ({ gauranteeList }: GauranteeProps) => {
  const methods = useForm();
  const [openModal, setOpenModal] = useState(false);

  const onCloseModal = () => {
    setOpenModal(false);
  };

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
          <AccordionPanel>
            <AccordianListCardComponent columns={3} accordionCardDetails={gauranteeListDetails} />
            {/* <Divider />
            <Box display="flex" w="50px" gap="s16" p="s16">
              <IconButton
                colorScheme="transparent"
                aria-label="Release"
                icon={<IoTrash />}
                color="danger.500"
                size="sm"
                onClick={() => setOpenModal(true)}
              />
              <Button color="danger.500" variant="link">
                Release
              </Button>
            </Box> */}
          </AccordionPanel>
        </AccordionItem>
      </Accordion>

      <Modal
        open={openModal}
        onClose={onCloseModal}
        primaryButtonLabel="Done"
        secondaryButtonLabel="Undo"
        title="Do you sure want to Decline ?"
      >
        <FormProvider {...methods}>
          <Box display="flex" flexDir="column" gap="s8">
            <FormTextArea
              rules={{ required: { value: true, message: 'This field is required' } }}
              h="100px"
              name="reasonForDeclination"
              label="Reason for Declination"
            />
          </Box>
        </FormProvider>
      </Modal>
    </>
  );
};
