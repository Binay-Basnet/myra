import { useEffect, useMemo } from 'react';
import { FormProvider, UseFormReturn } from 'react-hook-form';
import { ListItem, UnorderedList } from '@chakra-ui/react';
import NepaliDate from 'nepali-date-converter';

import { Alert, Box, Grid, GridItem, Modal, Text } from '@myra-ui';

import {
  DateType,
  InterestRateSetup,
  store,
  useGetEndOfDayDateDataQuery,
  useGetLoanProductDetailQuery,
} from '@coop/cbs/data-access';
import { CustomInterestRateSetupInput } from '@coop/cbs/utils';
import { FormDatePicker, FormFileInput, FormInput, FormTextArea } from '@coop/shared/form';

import { useLoanAccountDetailHooks } from '../hooks/useLoanAccountDetailHooks';

interface IAccountInterestUpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  onEdit?: () => void;
  methods: UseFormReturn<CustomInterestRateSetupInput>;
  rate?: InterestRateSetup | null | undefined;
  baseRate: number;
}

export const AccountInterestUpdateModal = ({
  isOpen,
  onClose,
  onSave,
  onEdit,
  methods,
  rate,
  baseRate,
}: IAccountInterestUpdateModalProps) => {
  const dateType = store.getState().auth?.preference?.date || DateType.Ad;

  const { data: endOfDayData } = useGetEndOfDayDateDataQuery();

  const closingDate = useMemo(() => endOfDayData?.transaction?.endOfDayDate?.value, [endOfDayData]);

  const { productId } = useLoanAccountDetailHooks();

  const { data: loanProductDetailData } = useGetLoanProductDetailQuery(
    { id: productId },
    { enabled: !!productId }
  );

  const { minRate, maxRate, changeMin, changeMax } = useMemo(
    () => ({
      minRate:
        loanProductDetailData?.settings?.general?.loanProducts?.getProductDetail?.data?.interest
          ?.minRate,
      maxRate:
        loanProductDetailData?.settings?.general?.loanProducts?.getProductDetail?.data?.interest
          ?.maxRate,
      changeMin:
        loanProductDetailData?.settings?.general?.loanProducts?.getProductDetail?.data?.interest
          ?.changeMin,
      changeMax:
        loanProductDetailData?.settings?.general?.loanProducts?.getProductDetail?.data?.interest
          ?.changeMax,
    }),
    [loanProductDetailData]
  );

  const rateDiff = methods.watch('rate');

  useEffect(() => {
    if (rate) {
      methods.reset({
        rate: null,
        effectiveDate: rate.effectiveDate,
        fileUploads: rate.fileUploads as unknown as string[],
        note: rate.note,
      });
    }
  }, [JSON.stringify(rate)]);

  const handleClose = () => {
    methods.reset({
      rate: null,
      effectiveDate: null,
      fileUploads: [],
      note: '',
    });
    onClose();
  };

  return (
    <Modal
      title="Update Rate"
      open={isOpen}
      onClose={handleClose}
      primaryButtonLabel="Apply"
      primaryButtonHandler={rate ? onEdit : onSave}
    >
      <FormProvider {...methods}>
        <Grid templateColumns="repeat(2, 1fr)" rowGap="s16" columnGap="s20">
          <GridItem colSpan={2}>
            <Alert status="info" title="Current Interest Details" hideCloseIcon>
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
            label="Update Account Premium By"
            textAlign="right"
            rightElement={
              <Text fontWeight="Medium" fontSize="r1" color="primary.500">
                %
              </Text>
            }
          />

          <FormDatePicker
            name="effectiveDate"
            label="Effective Date"
            minDate={
              closingDate
                ? dateType === 'BS'
                  ? new NepaliDate(closingDate?.np).toJsDate()
                  : new Date(closingDate?.en)
                : new Date()
            }
          />

          {rateDiff && (
            <GridItem colSpan={2}>
              <Alert
                status="info"
                title={`New Account Premium is ${Number(rateDiff) + baseRate} %`}
                hideCloseIcon
              />
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
  );
};