import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useQueryClient } from '@tanstack/react-query';
import { omit } from 'lodash';

import { Alert, asyncToast, Box, Grid, GridItem, Modal, Text } from '@myra-ui';

import {
  PrematurePenalty,
  PrematurePenaltyDateType,
  useUpdateLoanPrematurePenaltyMutation,
} from '@coop/cbs/data-access';
import { BoxContainer, SubHeadingText, TextBoxContainer } from '@coop/shared/components';
import { FormAmountInput, FormNumberInput, FormSelect, FormSwitchTab } from '@coop/shared/form';
import { amountConverter, useTranslation } from '@coop/shared/utils';

import { useLoanProductDepositHook } from '../hooks/useLoanProductDepositHook';

interface IUpdatePrematurePenaltyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UpdateLoanPrematurePenaltyModal = ({
  isOpen,
  onClose,
}: IUpdatePrematurePenaltyModalProps) => {
  const { t } = useTranslation();

  const { detailData } = useLoanProductDepositHook();

  const queryClient = useQueryClient();

  const router = useRouter();

  const methods = useForm<PrematurePenalty & { allowPenalty: boolean }>({
    defaultValues: { allowPenalty: true },
  });

  const prematurePenaltyEnable = methods.watch('allowPenalty');

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

  const penaltyDataType = [
    {
      label: t['depositProductEffectiveDaysFromStart'],
      value: PrematurePenaltyDateType.EffectiveDaysFromStart,
    },
    {
      label: t['depositProductRemainingDaystoGetMatured'],
      value: PrematurePenaltyDateType.RemainingDaysToGetMatured,
    },
  ];

  const { mutateAsync: updatePrematurePenalty } = useUpdateLoanPrematurePenaltyMutation();

  const handleSave = () => {
    const values = methods.getValues();

    asyncToast({
      id: 'update-loan-product-premature-penalty',
      msgs: {
        success: 'Premature penalty updated',
        loading: 'Updating premature penalty',
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['getLoanProductDetail']);

        handleClose();
      },
      promise: updatePrematurePenalty({
        productId: router?.query?.['id'] as string,
        allowPenalty: values?.['allowPenalty'],
        payload: omit(values, ['allowPenalty']),
      }),
    });
  };

  const handleClose = () => {
    methods.reset({
      allowPenalty: true,
      penaltyDateType: null,
      noOfDays: null,
      penaltyAmount: '',
      penaltyRate: null,
    });

    onClose();
  };

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      isCentered
      title="Update Premature Penalty"
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
                  <Text fontSize="s3" display="flex" gap="s4">
                    Penalty Date Type:{' '}
                    {detailData?.prematurePenaltySetup?.penaltyDateType ? (
                      <Text textTransform="capitalize">
                        {detailData?.prematurePenaltySetup?.penaltyDateType
                          ?.replace(/_/g, ' ')
                          ?.toLowerCase()}
                      </Text>
                    ) : (
                      'N/A'
                    )}
                  </Text>
                </li>
                <li>
                  <Text fontSize="s3">
                    No of Days: {`${detailData?.prematurePenaltySetup?.noOfDays} days`}
                  </Text>
                </li>
                <li>
                  <Text fontSize="s3">
                    Penalty Amount:{' '}
                    {`${amountConverter(detailData?.prematurePenaltySetup?.penaltyAmount)}`}
                  </Text>
                </li>
                <li>
                  <Text fontSize="s3">
                    Penalty Rate: {`${detailData?.prematurePenaltySetup?.penaltyRate}`}
                  </Text>
                </li>
              </ul>
            </Box>
          </Alert>
          <BoxContainer>
            <Box display="flex" justifyContent="space-between">
              <TextBoxContainer>
                <SubHeadingText>{t['prematurePenaltyEnable']} </SubHeadingText>
              </TextBoxContainer>
              <FormSwitchTab name="allowPenalty" options={enableSwitch} />
            </Box>
            {prematurePenaltyEnable && (
              <Grid templateColumns="repeat(2,1fr)" gap="s16">
                <FormSelect
                  name="penaltyDateType"
                  label={t['depositProductPenaltyDateType']}
                  options={penaltyDataType}
                />
                <FormNumberInput name="noOfDays" label={t['depositProductNumberofDays']} />

                <FormNumberInput
                  isRequired
                  name="penaltyRate"
                  label={t['depositProductPenaltyRate']}
                  rightElement={
                    <Text fontWeight="Medium" fontSize="r1" color="primary.500">
                      %
                    </Text>
                  }
                  textAlign="right"
                />
                <FormAmountInput name="penaltyAmount" label={t['depositProductPenaltyAmount']} />
                <GridItem colSpan={2}>
                  <Alert status="warning">
                    <Text fontWeight="Medium" fontSize="r1">
                      {t['penaltyAlert']}
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

export default UpdateLoanPrematurePenaltyModal;
