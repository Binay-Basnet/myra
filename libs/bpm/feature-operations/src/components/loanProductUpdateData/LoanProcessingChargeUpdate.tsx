import { useEffect, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import { omit } from 'lodash';

import { Box, FormSection } from '@myra-ui';

import {
  useGetEndOfDayDateDataQuery,
  useGetLoanProductProcessingChargesListQuery,
} from '@coop/cbs/data-access';
import { COASelectModal } from '@coop/shared/components';
import { FormDatePicker, FormEditableTable } from '@coop/shared/form';

type ServiceType = {
  serviceName: string;
  amount: string;
  ledgerName: string;
  percentage: number;
};

export const LoanProcessingChargesUpdate = () => {
  const methods = useFormContext();

  const productId = methods.watch('productId');

  const { data: loanProcessingChargesListData } = useGetLoanProductProcessingChargesListQuery({
    productId: productId as string,
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
      methods.setValue(
        'loanProcessingCharge.payload',
        chargesEditData?.payload?.map((charge) => omit(charge, ['percentage']))
      );
      methods.setValue(
        'loanProcessingCharge.additionalData',
        omit(chargesEditData?.additionalData, ['id', 'createdAt'])
      );
    }
  }, [chargesEditData]);

  return (
    <FormSection flexLayout header="Loan Processing Charges Update">
      <Box display="flex" flexDir="column" gap={5}>
        <FormEditableTable<ServiceType>
          name="loanProcessingCharge.payload"
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
            name="loanProcessingCharge.additionalData.effectiveDate"
            label="Effective From"
            minDate={closingDate?.local ? new Date(closingDate?.en ?? '') : new Date()}
          />
        </Box>
      </Box>
    </FormSection>
  );
};
