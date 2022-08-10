import { BiRightArrowAlt } from 'react-icons/bi';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';

import { Box, Button, Divider, Icon, Text } from '@coop/shared/ui';

const installmentsList = [
  {
    from: '01-05-2079',
    to: '01-06-2079',
    status: 'Done',
    title: 'Bhadra',
  },
  {
    from: '01-06-2079',
    to: '01-07-2079',
    status: 'Forgive',
    title: 'Asoj',
  },
  {
    from: '01-07-2079',
    to: '01-08-2079',
    status: 'Forgive',
    title: 'Kartik',
  },
];

interface IInstallmentModelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InstallmentModel = ({
  isOpen,
  onClose,
}: IInstallmentModelProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered={true}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Text
            fontSize="r2"
            color="neutralColorLight.Gray-80"
            fontWeight="SemiBold"
          >
            Installments
          </Text>
        </ModalHeader>
        <Divider />

        <ModalCloseButton />
        <ModalBody p="s16">
          <Box
            border="1px"
            borderColor="border.layout"
            borderRadius="br2"
            px="s12"
            py="s8"
            display="flex"
            flexDirection="column"
            gap="s16"
          >
            {installmentsList.map((installment) => (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box display="flex" flexDirection="column">
                  <Text
                    fontSize="r1"
                    fontWeight={500}
                    color="neutralColorLight.Gray-80"
                  >
                    {installment.title}
                  </Text>
                  <Box display="flex" alignItems="center">
                    <Text
                      fontSize="s3"
                      fontWeight={400}
                      color="neutralColorLight.Gray-60"
                    >
                      {installment.from}
                    </Text>
                    <Icon
                      as={BiRightArrowAlt}
                      w="s16"
                      cursor="pointer"
                      color="neutralColorLight.Gray-60"
                      h="s16"
                    />
                    <Text
                      fontSize="s3"
                      fontWeight={400}
                      color="neutralColorLight.Gray-60"
                    >
                      {installment.to}
                    </Text>
                  </Box>
                </Box>

                <Box>
                  <Text
                    fontSize="r1"
                    fontWeight={500}
                    color={
                      installment.status === 'Done'
                        ? 'neutralColorLight.Gray-60'
                        : 'primary.500'
                    }
                  >
                    {installment.status}
                  </Text>
                </Box>
              </Box>
            ))}
          </Box>
        </ModalBody>

        <Divider />
        <ModalFooter>
          <Button variant="solid" onClick={onClose}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
