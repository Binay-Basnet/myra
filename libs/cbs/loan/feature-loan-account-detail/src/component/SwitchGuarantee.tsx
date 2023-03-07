import { MutableRefObject, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  ListItem,
  UnorderedList,
  useDisclosure,
} from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';
import omit from 'lodash/omit';

import { Alert, asyncToast, Box, Button, Grid, Modal, Text } from '@myra-ui';

import {
  LoanAccountGurantee,
  LoanProduct,
  SwitchGuaranteeInput,
  useGetAccountDetailsDataQuery,
  useGetLoanProductDetailsDataQuery,
  useLoanAccountGuaranteeActionsMutation,
} from '@coop/cbs/data-access';
import { FormAccountSelect, FormAmountInput, FormMemberSelect } from '@coop/shared/form';
import { amountConverter } from '@coop/shared/utils';

import { useLoanAccountDetailHooks } from '../hooks/useLoanAccountDetailHooks';

interface ISwitchGuaranteeProps {
  isAlertOpen: boolean;
  alertCancelRef: MutableRefObject<HTMLButtonElement>;
  onAlertToggle: () => void;
  onAlertClose: () => void;
  guarantee: LoanAccountGurantee | null | undefined;
}

export const SwitchGuarantee = ({
  isAlertOpen,
  alertCancelRef,
  onAlertToggle,
  onAlertClose,
  guarantee,
}: ISwitchGuaranteeProps) => {
  const { overviewData } = useLoanAccountDetailHooks();

  const queryClient = useQueryClient();

  const methods = useForm();

  const switchMemberId = methods.watch('memberID');

  const switchLoanAccId = methods.watch('accountID');

  const {
    isOpen: isSwitchModalOpen,
    onClose: onSwitchModalClose,
    onToggle: onSwitchModalToggle,
  } = useDisclosure();

  const { data: accountDetailQueryData } = useGetAccountDetailsDataQuery(
    { id: switchLoanAccId as string },
    { enabled: !!switchLoanAccId }
  );

  const selectedAccount = useMemo(
    () => accountDetailQueryData?.account?.accountDetails?.data,
    [accountDetailQueryData]
  );

  const currentBalance = selectedAccount?.availableBalance ?? '0';

  const { data: loanProductDetails } = useGetLoanProductDetailsDataQuery(
    { id: overviewData?.generalInformation?.productId },
    {
      enabled: !!overviewData?.generalInformation?.productId,
    }
  );
  const loanProduct = useMemo(
    () => loanProductDetails?.settings?.general?.loanProducts?.formState?.data as LoanProduct,
    [loanProductDetails?.settings?.general?.loanProducts?.formState?.data]
  );

  const maxGuarantee = loanProduct?.maxPercentOfGurantee
    ? (Number(currentBalance) * Number(loanProduct?.maxPercentOfGurantee)) / 100
    : currentBalance;

  const { mutateAsync: switchGuarantee } = useLoanAccountGuaranteeActionsMutation();

  const handleSwitchGuarantee = () => {
    const values = methods.getValues();

    asyncToast({
      id: 'loan-account-detail-switch-guarantee',
      promise: switchGuarantee({
        actionType: 'SWITCH',
        data: {
          loanAccID: overviewData?.generalInformation?.accountId,
          loanGuaranteeID: guarantee?.guaranteeId,
          switchInput: {
            ...omit(values, ['maxGuranteeAmountLimit']),
          } as SwitchGuaranteeInput,
        },
      }),
      msgs: {
        loading: 'Switching guarantee',
        success: 'Guarantee switched',
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['getLoanAccountGuaranteeDetails']);
        handleSwitchModalClose();
      },
    });
  };

  const handleSwitchModalClose = () => {
    methods.reset({ memberID: '', accountID: '', maxGuranteeAmountLimit: '', guaranteeAmount: '' });
    onSwitchModalClose();
  };

  return (
    <>
      <AlertDialog
        isOpen={isAlertOpen}
        leastDestructiveRef={alertCancelRef}
        onClose={onAlertClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader
              fontSize="lg"
              fontWeight="bold"
              borderBottom="1px"
              borderColor="border.layout"
            >
              <Text fontWeight="SemiBold" fontSize="r2" color="gray.800" lineHeight="150%">
                Switch Guarantee
              </Text>
            </AlertDialogHeader>

            <AlertDialogBody borderBottom="1px solid" borderBottomColor="border.layout" p="s16">
              <Text fontSize="s3" fontWeight={400} color="gray.800">
                All the details of the existing guarantee will be lost and replaced by the new
                guarantee. Do you want to continue switching this guarantee with a new one?
              </Text>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={alertCancelRef} variant="outline" onClick={onAlertClose}>
                Cancel
              </Button>
              <Button
                ml={3}
                onClick={() => {
                  onAlertToggle();
                  onSwitchModalToggle();
                }}
              >
                Confirm
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <Modal
        open={isSwitchModalOpen}
        onClose={handleSwitchModalClose}
        primaryButtonLabel="Save Changes"
        primaryButtonHandler={handleSwitchGuarantee}
        title="Switch Guarantee"
      >
        <FormProvider {...methods}>
          <Box display="flex" flexDirection="column" gap="s16">
            <Alert status="info" title="Existing Guarantee Details" hideCloseIcon>
              <UnorderedList>
                <ListItem>{guarantee?.memberName}</ListItem>
                <ListItem>{guarantee?.accountName}</ListItem>
                <ListItem>{`Guarantee Amount: ${amountConverter(
                  guarantee?.guranteeAmount ?? 0
                )}`}</ListItem>
              </UnorderedList>
            </Alert>

            <FormMemberSelect name="memberID" label="Select Member" menuPosition="fixed" />

            <FormAccountSelect
              name="accountID"
              label="Select Account"
              memberId={switchMemberId}
              menuPosition="fixed"
            />

            <Grid templateColumns="repeat(2,1fr)" gap="s16">
              <FormAmountInput
                name="maxGuranteeAmountLimit"
                label="Maximum Guarantee Amount Available"
                value={maxGuarantee}
                isDisabled
              />
              <FormAmountInput
                name="guaranteeAmount"
                label="Guarantee Amount"
                rules={{
                  max: {
                    value: maxGuarantee,
                    message: 'Guaranntee Limit Exceeeded',
                  },
                }}
              />
            </Grid>
          </Box>
        </FormProvider>
      </Modal>
    </>
  );
};
