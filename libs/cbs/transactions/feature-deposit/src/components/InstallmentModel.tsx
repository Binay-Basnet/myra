import { useEffect, useState } from 'react';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';

import { asyncToast, Box, Button, Divider, Text } from '@myra-ui';

import {
  DateType,
  InstallmentState,
  MemberAccountDetails,
  NatureOfDepositProduct,
  useAppSelector,
  useGetInstallmentsListDataQuery,
  useSetAccountForgiveInstallmentDataMutation,
} from '@coop/cbs/data-access';
import { localizedDate } from '@coop/cbs/utils';
import { useTranslation } from '@coop/shared/utils';

interface IInstallmentModelProps {
  isOpen: boolean;
  onClose: () => void;
  accountId: string | undefined;
  productType: NatureOfDepositProduct | undefined;
  selectedAccount: MemberAccountDetails;
}

export const InstallmentModel = ({
  isOpen,
  onClose,
  accountId,
  productType,
  selectedAccount,
}: IInstallmentModelProps) => {
  const preferenceDate = useAppSelector((state) => state?.auth?.preference?.date);

  const { t } = useTranslation();

  const [forgivenList, setForgivenList] = useState<string[]>([]);

  const { data: installmentsListQueryData, refetch } = useGetInstallmentsListDataQuery(
    { id: accountId as string },
    {
      enabled: !!(
        accountId &&
        (productType === NatureOfDepositProduct.RecurringSaving ||
          (selectedAccount?.product?.nature === NatureOfDepositProduct.Saving &&
            selectedAccount?.product?.isMandatorySaving))
      ),
    }
  );

  const installmentList = installmentsListQueryData?.account?.getInstallments?.data?.map(
    (installment) => ({
      ...installment,
      // dueDate: preferenceDate === DateType.Bs ? installment?.dueDate?.np : installment?.dueDate?.en,
      monthName:
        preferenceDate === DateType.Bs ? installment?.monthName?.np : installment?.monthName?.en,
    })
  );

  const { mutateAsync: setForgiveInstallment } = useSetAccountForgiveInstallmentDataMutation();

  useEffect(() => {
    if (accountId && productType === NatureOfDepositProduct.RecurringSaving) {
      refetch();
    }
  }, [accountId, productType]);

  const handleForgiveInstallment = (installmentDate: string) => {
    setForgivenList((list) => [...list, installmentDate]);
  };

  const handleUnforgiveInstallment = (installmentDate: string) => {
    setForgivenList((list) => {
      const temp = [...list];
      const unforgiveIndex = list.indexOf(installmentDate);
      temp.splice(unforgiveIndex, 1);
      return temp;
    });
  };

  const handleSave = () => {
    if (forgivenList?.length) {
      asyncToast({
        id: 'set-forgive-installments',
        promise: setForgiveInstallment({
          id: accountId as string,
          installmentDates: forgivenList,
        }),
        msgs: {
          loading: 'Adding installments to forgive',
          success: 'Added installments to forgive',
        },
        onSuccess: () => {
          handleModalClose();
          refetch();
        },
      });
    }
  };

  const handleModalClose = () => {
    setForgivenList([]);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleModalClose} isCentered>
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
            {installmentList?.map((installment) => (
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
                      {localizedDate(installment?.dueDate)}
                    </Text>
                  </Box>
                </Box>

                <Box>
                  {installment?.status === InstallmentState.Paid ||
                  installment?.status === InstallmentState.Cancelled ? (
                    <Text fontSize="r1" fontWeight={500} color="neutralColorLight.Gray-60">
                      {t['installmentModalDone']}
                    </Text>
                  ) : forgivenList.includes(installment?.dueDate?.en as string) ? (
                    <Button
                      variant="ghost"
                      onClick={() => handleUnforgiveInstallment(installment?.dueDate?.en as string)}
                    >
                      Unforgive
                    </Button>
                  ) : (
                    <Button
                      variant="ghost"
                      onClick={() => handleForgiveInstallment(installment?.dueDate?.en as string)}
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
          <Button variant="solid" onClick={handleSave}>
            {t['installmentModalSave']}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
