import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import { Box, FormSection, Text } from '@myra-ui';

import { useGetDepositProductSettingsEditDataQuery } from '@coop/cbs/data-access';
import { COASelectModal } from '@coop/shared/components';
import { FormEditableTable, FormSwitchTab } from '@coop/shared/form';

type AllowChequeTable = {
  serviceName: string;
  ledgerName: string;
  amount: number;
};
const chequeList = [{ label: 'Cheque issue charge', value: 'Cheque issue charge' }];

export const ChequeServicesUpdate = () => {
  const methods = useFormContext();
  const { watch } = methods;

  const productId = methods.watch('productId');

  const chequeIssue = watch('chequeUpdate.chequeIssue');

  const { data: editValues } = useGetDepositProductSettingsEditDataQuery(
    {
      id: productId as string,
    },
    {
      staleTime: 0,
    }
  );

  useEffect(() => {
    if (editValues) {
      const editValueData = editValues?.settings?.general?.depositProduct?.formState?.data;

      if (editValueData) {
        methods.setValue('chequeUpdate.chequeIssue', editValueData?.chequeIssue);
        methods.setValue('chequeUpdate.chequeCharge', editValueData?.chequeCharge);
      }
    }
  }, [editValues, productId]);

  const yesNo = [
    { label: 'Yes', value: true },
    { label: 'No', value: false },
  ];
  return (
    <FormSection flexLayout header="Cheque Issue Charges Update">
      <Box display="flex" flexDirection="column" gap="s32">
        <Box display="flex" flexDirection="row" justifyContent="space-between">
          <Text fontSize="s3" fontWeight="500" color="gray.700">
            Allow Cheque Issue
          </Text>
          <FormSwitchTab name="chequeUpdate.chequeIssue" options={yesNo} />
        </Box>

        {chequeIssue && <AllowChequeIssue />}
      </Box>
    </FormSection>
  );
};
const AllowChequeIssue = () => (
  <Box>
    <FormEditableTable<AllowChequeTable>
      name="chequeUpdate.chequeCharge"
      debug={false}
      canAddRow={false}
      canDeleteRow
      columns={[
        {
          accessor: 'serviceName',
          header: 'Service Name',
          cellWidth: 'auto',
          fieldType: 'select',
          selectOptions: chequeList,
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
          isNumeric: true,
        },
      ]}
    />
  </Box>
);
