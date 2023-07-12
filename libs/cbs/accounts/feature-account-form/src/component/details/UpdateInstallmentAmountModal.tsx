import { useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useQueryClient } from '@tanstack/react-query';

import { Alert, asyncToast, Box, Button, Grid, GridItem, Modal, Text } from '@myra-ui';

import {
  useGetEndOfDayDateDataQuery,
  useSetupdateInstallmentAmountMutation,
} from '@coop/cbs/data-access';
import { FormAmountInput, FormDatePicker } from '@coop/shared/form';
import { amountConverter } from '@coop/shared/utils';

import { useAccountDetails } from '../../hooks/useAccountDetails';

interface IUpdateInstallmentProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UpdateInstallmentAmountModal = ({ isOpen, onClose }: IUpdateInstallmentProps) => {
  const { accountDetails } = useAccountDetails();

  const { data: endOfDayData } = useGetEndOfDayDateDataQuery();
  const closingDate = useMemo(() => endOfDayData?.transaction?.endOfDayDate?.value, [endOfDayData]);

  const queryClient = useQueryClient();

  const router = useRouter();

  const methods = useForm({
    mode: 'onChange',
  });

  const { mutateAsync } = useSetupdateInstallmentAmountMutation();

  const handleSave = () => {
    const values = methods.getValues();

    asyncToast({
      id: 'update-installment',
      msgs: {
        success: 'Installment updated successfully',
        loading: 'Updating Installment',
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['getAccountDetailsData']);

        handleClose();
      },
      promise: mutateAsync({
        accountId: router?.query?.['id'] as string,
        newInstallmentAmount: values?.['newInstallmentAmount'],
        effectiveDate: values?.['effectiveDate'],
      }),
    });
  };

  const handleClose = () => {
    methods.reset({ newInstallmentAmount: '', effectiveDate: null });
    onClose();
  };

  return isOpen ? (
    <Modal
      open={isOpen}
      onClose={handleClose}
      isCentered
      title={
        <Text fontSize="r2" color="neutralColorLight.Gray-80" fontWeight="SemiBold">
          Update Installment Amount
        </Text>
      }
      footer={
        <Box display="flex" px={5} pb={5} justifyContent="flex-end">
          <Button onClick={handleSave}>Save Changes</Button>
        </Box>
      }
      width="xl"
    >
      <FormProvider {...methods}>
        <Grid templateColumns="repeat(2, 1fr)" gap={5}>
          <GridItem colSpan={2}>
            <Alert status="info" hideCloseIcon>
              <Box display="flex" justifyContent="space-between">
                <Text>
                  Existing installment amount:{' '}
                  {amountConverter(accountDetails?.installmentAmount || 0)}
                </Text>
              </Box>
            </Alert>
          </GridItem>
          <FormAmountInput label="New Installment Amount" name="newInstallmentAmount" />

          <FormDatePicker
            name="effectiveDate"
            label="Effective Date"
            minDate={closingDate?.local ? new Date(closingDate?.en) : new Date()}
          />
        </Grid>
      </FormProvider>
    </Modal>
  ) : null;
};
