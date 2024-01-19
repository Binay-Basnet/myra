import { useEffect, useMemo, useRef } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { ListItem, UnorderedList, useDisclosure } from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';

import { Alert, asyncToast, Box, Grid, GridItem, Modal, Text } from '@myra-ui';

import {
  InterestRateSetupInput,
  ProductWithAccountNode,
  useGetEndOfDayDateDataQuery,
  useGetSavingsProductDetailQuery,
  useUpdateMultipleInterestRateMutation,
} from '@coop/cbs/data-access';
import { ConfirmationDialog } from '@coop/shared/components';
import { FormCBSDatePicker, FormFileInput, FormInput, FormTextArea } from '@coop/shared/form';

interface IUpdateMultipleInterestRateModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedBreakdown: ProductWithAccountNode;
}

export const UpdateMultipleInterestRateModal = ({
  isOpen,
  onClose,
  selectedBreakdown,
}: IUpdateMultipleInterestRateModalProps) => {
  const { data: endOfDayData } = useGetEndOfDayDateDataQuery();
  const closingDate = useMemo(() => endOfDayData?.transaction?.endOfDayDate?.value, [endOfDayData]);

  const queryClient = useQueryClient();

  const methods = useForm();

  const {
    isOpen: isConfirmationOpen,
    onClose: onConfirmationClose,
    onToggle: onConfirmationToggle,
  } = useDisclosure();

  const updateCancelRef = useRef<HTMLButtonElement | null>(null);

  const handleClose = () => {
    methods.reset({ rate: null, effectiveDate: null, fileUploads: [], note: '' });
    onClose();
  };

  const router = useRouter();
  const { id } = router.query;

  const { data: savingProductDetailData } = useGetSavingsProductDetailQuery(
    { id: id as string },
    { enabled: !!id }
  );

  const { minRate, maxRate, changeMin, changeMax } = useMemo(
    () => ({
      minRate:
        savingProductDetailData?.settings?.general?.depositProduct?.depositProductDetail?.data
          ?.interest?.minRate,
      maxRate:
        savingProductDetailData?.settings?.general?.depositProduct?.depositProductDetail?.data
          ?.interest?.maxRate,
      changeMin:
        savingProductDetailData?.settings?.general?.depositProduct?.depositProductDetail?.data
          ?.interest?.changeMin,
      changeMax:
        savingProductDetailData?.settings?.general?.depositProduct?.depositProductDetail?.data
          ?.interest?.changeMax,
    }),
    [savingProductDetailData]
  );

  const { mutateAsync: updateMultipleInterestRate } = useUpdateMultipleInterestRateMutation();

  const handleSaveInterestRate = () => {
    asyncToast({
      id: 'settings-saving-account-multiple-account-premium-update',
      msgs: {
        loading: 'Updating Account Premium',
        success: 'Account Premium Updated',
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['viewSavingProductWithAccount']);
        handleClose();
      },
      promise: updateMultipleInterestRate({
        accountId: selectedBreakdown?.accountIds as string[],
        data: { ...methods.getValues() } as InterestRateSetupInput,
      }),
    });
  };

  const rate = methods.watch('rate');

  useEffect(() => {
    if (selectedBreakdown?.accountPremium) {
      methods.setValue('rate', selectedBreakdown.accountPremium);
    }
  }, [selectedBreakdown?.accountPremium]);

  return (
    <>
      <Modal
        title="Update Account Premium"
        open={isOpen}
        onClose={handleClose}
        primaryButtonLabel="Update"
        primaryButtonHandler={onConfirmationToggle}
        width="2xl"
      >
        <FormProvider {...methods}>
          <Grid templateColumns="repeat(2, 1fr)" rowGap="s16" columnGap="s20">
            <GridItem colSpan={2}>
              <Alert status="info" title="Account Premium Details" hideCloseIcon>
                <UnorderedList>
                  <ListItem>
                    <Box display="flex" gap="s4">
                      <Text fontSize="s3" fontWeight={400} color="gray.700">
                        Account Premium Rate:
                      </Text>
                      <Text fontSize="s3" fontWeight={500} color="gray.700">
                        {minRate} % - {maxRate} %
                      </Text>
                    </Box>
                  </ListItem>
                  <ListItem>
                    <Box display="flex" gap="s4">
                      <Text fontSize="s3" fontWeight={400} color="gray.700">
                        Allowable Update Rate:
                      </Text>
                      <Text fontSize="s3" fontWeight={500} color="gray.700">
                        {changeMin} % - {changeMax} %
                      </Text>
                    </Box>
                  </ListItem>
                </UnorderedList>
              </Alert>
            </GridItem>

            <FormInput
              name="rate"
              type="number"
              label="New Account Premium"
              textAlign="right"
              rightElement={
                <Text fontWeight="Medium" fontSize="r1" color="primary.500">
                  %
                </Text>
              }
            />

            <FormCBSDatePicker
              name="effectiveDate"
              label="Effective Date"
              minDate={closingDate?.local ? new Date(closingDate?.en ?? '') : new Date()}
            />

            {rate && (
              <GridItem colSpan={2}>
                <Alert status="info" title="New Interest Details" hideCloseIcon>
                  <UnorderedList>
                    <ListItem>
                      <Box display="flex" gap="s4">
                        <Text fontSize="s3" fontWeight={400} color="gray.700">
                          Organization Premium:
                        </Text>
                        <Text fontSize="s3" fontWeight={500} color="gray.700">
                          {selectedBreakdown?.organizationPremium} %
                        </Text>
                      </Box>
                    </ListItem>
                    <ListItem>
                      <Box display="flex" gap="s4">
                        <Text fontSize="s3" fontWeight={400} color="gray.700">
                          Product Premium:
                        </Text>
                        <Text fontSize="s3" fontWeight={500} color="gray.700">
                          {selectedBreakdown?.productPremium} %
                        </Text>
                      </Box>
                    </ListItem>
                    <ListItem>
                      <Box display="flex" gap="s4">
                        <Text fontSize="s3" fontWeight={400} color="gray.700">
                          Old Account Premium:
                        </Text>
                        <Text fontSize="s3" fontWeight={500} color="gray.700">
                          {selectedBreakdown?.accountPremium} %
                        </Text>
                      </Box>
                    </ListItem>
                    <ListItem>
                      <Box display="flex" gap="s4">
                        <Text fontSize="s3" fontWeight={400} color="gray.700">
                          Old Effective Interest Rate:
                        </Text>
                        <Text fontSize="s3" fontWeight={500} color="gray.700">
                          {selectedBreakdown?.effectiveInterestRate} %
                        </Text>
                      </Box>
                    </ListItem>
                    <ListItem>
                      <Box display="flex" gap="s4">
                        <Text fontSize="s3" fontWeight={400} color="gray.700">
                          New Effective Interest Rate:
                        </Text>
                        <Text fontSize="s3" fontWeight={500} color="gray.700">
                          {(Number(selectedBreakdown?.organizationPremium) || 0) +
                            (Number(selectedBreakdown?.productPremium) || 0) +
                            (Number(rate) || 0)}
                          %
                        </Text>
                      </Box>
                    </ListItem>
                  </UnorderedList>
                </Alert>
              </GridItem>
            )}

            <GridItem colSpan={2}>
              <FormFileInput name="fileUploads" label="File Upload" size="md" />
            </GridItem>

            <GridItem colSpan={2}>
              <FormTextArea name="note" label="Note" rows={3} />
            </GridItem>
          </Grid>
        </FormProvider>
      </Modal>

      <ConfirmationDialog
        isOpen={isConfirmationOpen}
        onClose={onConfirmationClose}
        cancelRef={updateCancelRef}
        handleConfirm={handleSaveInterestRate}
        title="Update Account Premium"
        description={`This action will update account premium for ${selectedBreakdown?.count} accounts. Are you sure you want
          to continue?`}
      />
    </>
  );
};
