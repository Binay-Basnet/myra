import { useEffect, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import { omit } from 'lodash';

import { Alert, Box, FormSection } from '@myra-ui';

import { useGetCloseChargeListQuery, useGetEndOfDayDateDataQuery } from '@coop/cbs/data-access';
import { COASelectModal } from '@coop/shared/components';
import { FormDatePicker, FormEditableTable, FormFileInput, FormTextArea } from '@coop/shared/form';

type ServiceType = {
  serviceName: string;
  amount: string;
  ledgerName: string;
};

export const AccountCloseFeesAndChargesUpdate = () => {
  const methods = useFormContext();

  const productId = methods.watch('productId');
  const { data: closeServiceChargeData } = useGetCloseChargeListQuery({
    productId,
  });

  const { data: endOfDayData } = useGetEndOfDayDateDataQuery();
  const closingDate = useMemo(() => endOfDayData?.transaction?.endOfDayDate?.value, [endOfDayData]);

  const chargesEditData = useMemo(() => {
    const chargesList =
      closeServiceChargeData?.settings?.general?.depositProduct?.listCloseCharge?.data;

    return chargesList?.[0];
  }, [closeServiceChargeData]);

  useEffect(() => {
    if (chargesEditData) {
      methods.setValue(
        'closeCharge.payload',
        chargesEditData?.payload?.map((charge) => omit(charge, ['percentage']))
      );
      methods.setValue(
        'closeCharge.additionalData',
        omit(chargesEditData?.additionalData, ['id', 'createdAt'])
      );
    }
  }, [chargesEditData]);
  return (
    <FormSection flexLayout header="Account Open Charges Update">
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
          name="closeCharge.payload"
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
            name="closeCharge.additionalData.effectiveDate"
            label="Effective From"
            minDate={closingDate?.local ? new Date(closingDate?.en ?? '') : new Date()}
          />
        </Box>
        <FormFileInput name="closeCharge.additionalData.fileUploads" label="File Upload" />
        <FormTextArea name="closeCharge.additionalData.notes" label="Note" />
      </Box>
    </FormSection>
  );
};
