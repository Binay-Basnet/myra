import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useQueryClient } from '@tanstack/react-query';
import { omit } from 'lodash';

import { Alert, asyncToast, Box, Grid, GridItem, Modal, Text } from '@myra-ui';

import { RebateTypeInput, useUpdateSavingProductRebateMutation } from '@coop/cbs/data-access';
import { BoxContainer, SubHeadingText, TextBoxContainer } from '@coop/shared/components';
import { FormAmountInput, FormNumberInput, FormSwitchTab } from '@coop/shared/form';
import { amountConverter, useTranslation } from '@coop/shared/utils';

import { useSavingDepositHook } from '../hooks/useSavingDepositHook';

interface IUpdateRebateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UpdateRebateModal = ({ isOpen, onClose }: IUpdateRebateModalProps) => {
  const { t } = useTranslation();

  const { detailData } = useSavingDepositHook();

  const queryClient = useQueryClient();

  const router = useRouter();

  const methods = useForm<RebateTypeInput & { isRebateAllowed: boolean }>({
    defaultValues: { isRebateAllowed: true },
  });

  const isRebateAllowed = methods.watch('isRebateAllowed');

  const enableSwitch = [
    {
      label: t['enable'],
      value: true,
    },
    {
      label: t['disable'],
      value: false,
    },
  ];

  const { mutateAsync: updateRebate } = useUpdateSavingProductRebateMutation();

  const handleSave = () => {
    const values = methods.getValues();

    asyncToast({
      id: 'update-saving-product-rebate',
      msgs: {
        success: 'Rebate updated',
        loading: 'Updating rebate',
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['getSavingsProductDetail']);

        handleClose();
      },
      promise: updateRebate({
        productId: router?.query?.['id'] as string,
        isRebateAllowed: values?.['isRebateAllowed'],
        payload: omit(values, ['isRebateAllowed']),
      }),
    });
  };

  const handleClose = () => {
    methods.reset({
      isRebateAllowed: true,
      dayBeforeInstallmentDate: null,
      rebateRate: null,
      rebateAmount: '',
      noOfInstallment: null,
    });

    onClose();
  };

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      isCentered
      title="Update Rebate"
      primaryButtonLabel="Save Changes"
      primaryButtonHandler={handleSave}
      width="xl"
    >
      <FormProvider {...methods}>
        <Box display="flex" flexDir="column" gap={5}>
          <Alert title="Existing Details" status="info" hideCloseIcon>
            <Box display="flex" flexDir="column">
              <ul>
                <li>
                  <Text fontSize="s3">
                    Days Before Installment Date:{' '}
                    {detailData?.rebateData?.dayBeforeInstallmentDate
                      ? `${detailData?.rebateData?.dayBeforeInstallmentDate} days`
                      : 'N/A'}
                  </Text>
                </li>
                <li>
                  <Text fontSize="s3">
                    No of Installment: {detailData?.rebateData?.noOfInstallment ?? 'N/A'}
                  </Text>
                </li>
                <li>
                  <Text fontSize="s3">
                    Rebate Amount: {`${amountConverter(detailData?.rebateData?.rebateAmount)}`}
                  </Text>
                </li>
                <li>
                  <Text fontSize="s3">
                    Rebate Rate:{' '}
                    {detailData?.rebateData?.rebateRate
                      ? `${detailData?.rebateData?.rebateRate}`
                      : 'N/A'}
                  </Text>
                </li>
              </ul>
            </Box>
          </Alert>
          <BoxContainer>
            <Box display="flex" justifyContent="space-between">
              <TextBoxContainer>
                <SubHeadingText>Allow Rebate </SubHeadingText>
              </TextBoxContainer>
              <FormSwitchTab name="isRebateAllowed" options={enableSwitch} />
            </Box>
            {isRebateAllowed && (
              <Grid templateColumns="repeat(2,1fr)" gap="s16">
                <FormNumberInput
                  name="dayBeforeInstallmentDate"
                  label={t['depositProductDayBeforetheinstallmentdate']}
                />
                <FormNumberInput
                  name="noOfInstallment"
                  label={t['depositProductNoInstallment']}
                  helperText={t['depositProductEnterNumberInstallments']}
                />

                <FormNumberInput
                  isRequired
                  name="rebateRate"
                  label={t['depositProductPercentageDepositedAmount']}
                  rightElement={
                    <Text fontWeight="Medium" fontSize="r1" color="primary.500">
                      %
                    </Text>
                  }
                  textAlign="right"
                />
                <FormAmountInput name="rebateAmount" label={t['depositProductRebateAmount']} />
                <GridItem colSpan={2}>
                  <Alert status="warning">
                    <Text fontWeight="Medium" fontSize="r1">
                      {t['rebateAlert']}
                    </Text>
                  </Alert>
                </GridItem>
              </Grid>
            )}
          </BoxContainer>
        </Box>
      </FormProvider>
    </Modal>
  );
};

export default UpdateRebateModal;
