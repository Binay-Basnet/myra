import { useEffect, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import { omit } from 'lodash';

import { Alert, Box, FormSection } from '@myra-ui';

import { useGetEndOfDayDateDataQuery, useGetOpenChargeListQuery } from '@coop/cbs/data-access';
import { COASelectModal } from '@coop/shared/components';
import { FormDatePicker, FormEditableTable } from '@coop/shared/form';

type ServiceType = {
  serviceName: string;
  amount: string;
  ledgerName: string;
};

export const AccountOpenFeesAndChargesUpdate = () => {
  const methods = useFormContext();

  const productId = methods.watch('productId');
  const { data: openServiceChargeData } = useGetOpenChargeListQuery({
    productId,
  });

  const { data: endOfDayData } = useGetEndOfDayDateDataQuery();
  const closingDate = useMemo(() => endOfDayData?.transaction?.endOfDayDate?.value, [endOfDayData]);

  const chargesEditData = useMemo(() => {
    const chargesList =
      openServiceChargeData?.settings?.general?.depositProduct?.listOpenCharge?.data;

    return chargesList?.[0];
  }, [openServiceChargeData]);
  useEffect(() => {
    if (chargesEditData) {
      methods.setValue(
        'openCharge.payload',
        chargesEditData?.payload?.map((charge) => omit(charge, ['percentage']))
      );
      methods.setValue(
        'openCharge.additionalData',
        omit(chargesEditData?.additionalData, ['id', 'createdAt'])
      );
    }
  }, [chargesEditData]);
  return (
    <FormSection flexLayout header="Account Open Charges Update">
      <Box display="flex" flexDir="column" gap={5}>
        {chargesEditData && (
          <Alert title="Immediate Previous Details" status="info" hideCloseIcon>
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
          name="openCharge.payload"
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
            name="openCharge.additionalData.effectiveDate"
            label="Effective From"
            minDate={closingDate?.local ? new Date(closingDate?.en ?? '') : new Date()}
          />
        </Box>
      </Box>
    </FormSection>
  );
};
