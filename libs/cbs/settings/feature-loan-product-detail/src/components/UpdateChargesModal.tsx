import { useEffect, useMemo } from 'react';
import { FormProvider, UseFormReturn } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useQueryClient } from '@tanstack/react-query';
import omit from 'lodash/omit';

import { asyncToast, Box, Modal } from '@myra-ui';

import {
  useGetEndOfDayDateDataQuery,
  useGetLoanProductProcessingChargesListQuery,
  useUpdateLoanProductProcessingChargeMutation,
} from '@coop/cbs/data-access';
import { COASelectModal } from '@coop/shared/components';
import { FormDatePicker, FormEditableTable, FormFileInput, FormTextArea } from '@coop/shared/form';

interface IUpdateChargesModalProps {
  isOpen: boolean;
  onClose: () => void;
  methods: UseFormReturn;
}
type ServiceType = {
  serviceName: string;
  amount: string;
  ledgerName: string;
  percentage: number;
};

export const UpdateChargesModal = ({ isOpen, onClose, methods }: IUpdateChargesModalProps) => {
  const router = useRouter();
  const { mutateAsync: updateLoanProcessingCharges } =
    useUpdateLoanProductProcessingChargeMutation();
  const queryClient = useQueryClient();

  const { data: loanProcessingChargesListData } = useGetLoanProductProcessingChargesListQuery({
    productId: router?.query?.['id'] as string,
  });

  const { data: endOfDayData } = useGetEndOfDayDateDataQuery();
  const closingDate = useMemo(() => endOfDayData?.transaction?.endOfDayDate?.value, [endOfDayData]);

  const chargesEditData = useMemo(() => {
    const chargesList =
      loanProcessingChargesListData?.settings?.general?.loanProducts?.listProcessingCharge?.data;

    return chargesList?.[0];
  }, [loanProcessingChargesListData]);

  useEffect(() => {
    if (chargesEditData) {
      methods.reset({
        payload: chargesEditData?.payload?.map((charge) => omit(charge, ['percentage'])),
        additionalData: omit(chargesEditData?.additionalData, ['id', 'createdAt']),
      });
    }
  }, [chargesEditData]);

  const handleClose = () => {
    if (chargesEditData) {
      methods.reset({
        payload: chargesEditData?.payload?.map((charge) => omit(charge, ['percentage'])),
        additionalData: omit(chargesEditData?.additionalData, ['id', 'createdAt']),
      });
    } else {
      methods.reset({
        payload: [],
        additionalData: { effectiveDate: null, fileUploads: [], notes: '' },
      });
    }
    onClose();
  };

  const handleSave = () => {
    const values = methods?.getValues();
    asyncToast({
      id: 'settings-loan-product-processing-charge-update',
      msgs: {
        loading: 'Updating Processing Charge',
        success: 'Processing Charge Updated',
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['getLoanProductProcessingChargesList']);
        onClose();
      },
      promise: updateLoanProcessingCharges({
        productId: router?.query?.['id'] as string,
        payload: values['payload'],
        additionalData: values?.['additionalData'],
      }),
    });
  };

  const payload = methods.watch('payload') as ServiceType[];

  const isSaveButtonDisabled = useMemo(
    () => payload?.findIndex((charge) => !charge?.ledgerName) !== -1,
    [payload]
  );

  return (
    <Modal
      title="Update Loan Processing Charges"
      open={isOpen}
      onClose={handleClose}
      primaryButtonLabel="Save Changes"
      width="3xl"
      primaryButtonHandler={handleSave}
      isDisabled={isSaveButtonDisabled}
    >
      <FormProvider {...methods}>
        <form>
          <Box display="flex" flexDir="column" gap={5}>
            <FormEditableTable<ServiceType>
              name="payload"
              columns={[
                {
                  accessor: 'serviceName',
                  header: 'Service Name',
                  cellWidth: 'auto',
                },
                {
                  accessor: 'ledgerName',
                  header: 'Ledger Name',
                  cellWidth: 'auto',
                  fieldType: 'modal',
                  modal: COASelectModal,
                },
                {
                  accessor: 'percentage',
                  header: 'Rate (%)',
                  isNumeric: true,
                  cellWidth: 'auto',
                },
                {
                  accessor: 'amount',
                  header: 'Amount',
                  cellWidth: 'auto',
                },
              ]}
            />
            <Box w="-webkit-fit-content">
              <FormDatePicker
                name="additionalData.effectiveDate"
                label="Effective From"
                minDate={closingDate?.local ? new Date(closingDate?.en ?? '') : new Date()}
              />
            </Box>
            <FormFileInput name="additionalData.fileUploads" label="File Upload" />
            <FormTextArea name="additionalData.notes" label="Note" />
          </Box>
        </form>
      </FormProvider>
    </Modal>
  );
};
