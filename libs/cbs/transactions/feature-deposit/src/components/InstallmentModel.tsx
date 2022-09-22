import { useEffect } from 'react';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';

import {
  InstallmentState,
  NatureOfDepositProduct,
  useGetInstallmentsListDataQuery,
  useSetAccountForgiveInstallmentDataMutation,
} from '@coop/cbs/data-access';
import { Box, Button, Divider, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

interface IInstallmentModelProps {
  isOpen: boolean;
  onClose: () => void;
  accountId: string | undefined;
  productType: NatureOfDepositProduct | undefined;
  isMandatory: boolean;
}

export const InstallmentModel = ({
  isOpen,
  onClose,
  accountId,
  productType,
  isMandatory,
}: IInstallmentModelProps) => {
  const { t } = useTranslation();

  const { data: installmentsListQueryData, refetch } = useGetInstallmentsListDataQuery(
    { id: accountId as string },
    {
      enabled:
        (!!accountId && productType === NatureOfDepositProduct.RecurringSaving) ||
        (productType === NatureOfDepositProduct.Saving && isMandatory),
    }
  );

  const { mutate } = useSetAccountForgiveInstallmentDataMutation();

  useEffect(() => {
    if (accountId) {
      refetch();
    }
  }, [accountId]);

  const handleForgiveInstallment = (installmentDate: string) => {
    mutate({ id: accountId as string, installmentDate }, { onSuccess: () => refetch() });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Text fontSize="r2" color="neutralColorLight.Gray-80" fontWeight="SemiBold">
            {t['installmentModalInstallments']}
          </Text>
        </ModalHeader>
        <Divider />

        <ModalCloseButton />
        <ModalBody p="s16" maxHeight="60vh" overflowY="scroll">
          <Box borderRadius="br2" px="s12" py="s8" display="flex" flexDirection="column" gap="s16">
            {installmentsListQueryData?.account?.getInstallments?.data?.map((installment) => (
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box display="flex" flexDirection="column">
                  <Text fontSize="r1" fontWeight={500} color="neutralColorLight.Gray-80">
                    {installment?.monthName}
                  </Text>
                  <Box display="flex" alignItems="center">
                    {/* <Text
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
                    /> */}
                    <Text fontSize="s3" fontWeight={400} color="neutralColorLight.Gray-60">
                      {installment?.dueDate}
                    </Text>
                  </Box>
                </Box>

                <Box>
                  {installment?.status === InstallmentState.Paid ||
                  installment?.status === InstallmentState.Cancelled ? (
                    <Text fontSize="r1" fontWeight={500} color="neutralColorLight.Gray-60">
                      {t['installmentModalDone']}
                    </Text>
                  ) : (
                    <Button
                      variant="ghost"
                      onClick={() => handleForgiveInstallment(installment?.dueDate as string)}
                    >
                      {t['installmentModalForgive']}
                    </Button>
                  )}
                </Box>
              </Box>
            ))}
          </Box>
        </ModalBody>

        <Divider />
        <ModalFooter>
          <Button variant="solid" onClick={onClose}>
            {t['installmentModalSave']}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
