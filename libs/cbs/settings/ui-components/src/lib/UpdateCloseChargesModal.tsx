import { useEffect, useMemo } from 'react';
import { FormProvider, UseFormReturn } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useQueryClient } from '@tanstack/react-query';
import omit from 'lodash/omit';

import { Alert, asyncToast, Box, Modal } from '@myra-ui';

import { useGetCloseChargeListQuery, useUpdateCloseChargeMutation } from '@coop/cbs/data-access';
import { COASelectModal } from '@coop/shared/components';
import { FormDatePicker, FormEditableTable, FormFileInput, FormTextArea } from '@coop/shared/form';

interface IUpdatePenaltyModalProps {
  isOpen: boolean;
  onClose: () => void;
  methods: UseFormReturn;
}
type ServiceType = {
  serviceName: string;
  amount: string;
  ledgerName: string;
};

export const UpdateCloseChargesModal = ({ isOpen, onClose, methods }: IUpdatePenaltyModalProps) => {
  const router = useRouter();
  const { mutateAsync } = useUpdateCloseChargeMutation();
  const queryClient = useQueryClient();

  const { data: closeServiceChargeData } = useGetCloseChargeListQuery({
    productId: router?.query?.['id'] as string,
  });

  const chargesEditData = useMemo(() => {
    const chargesList =
      closeServiceChargeData?.settings?.general?.depositProduct?.listCloseCharge?.data;

    return chargesList?.[0];
  }, [closeServiceChargeData]);

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
      id: 'settings-saving-product-close-charge-update',
      msgs: {
        loading: 'Updating Close Charge',
        success: 'Close Charge Updated',
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['getCloseChargeList']);
        onClose();
      },
      promise: mutateAsync({
        productId: router?.query?.['id'] as string,
        payload: values['payload'],
        additionalData: values?.additionalData,
      }),
    });
  };

  return (
    <Modal
      title="Update Account Close Charges"
      open={isOpen}
      onClose={handleClose}
      primaryButtonLabel="Save Changes"
      width="3xl"
      primaryButtonHandler={handleSave}
    >
      <FormProvider {...methods}>
        <form>
          <Box display="flex" flexDir="column" gap={5}>
            {chargesEditData && (
              <Alert title="Immediate Previous Details" status="info">
                {chargesEditData?.payload?.map((item) => (
                  <ul>
                    <li>
                      {item?.serviceName}: {item?.amount}
                    </li>
                  </ul>
                ))}
              </Alert>
            )}
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
                minTransactionDate
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
