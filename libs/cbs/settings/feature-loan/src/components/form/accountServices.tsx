import { GroupContainer } from '@coop/cbs/kym-form/ui-containers';
import { FormEditableTable } from '@coop/shared/form';
// import { KymIndMemberInput } from '@coop/shared/data-access';
import { Box } from '@coop/shared/ui';

import { SubText, TextBoxContainer, TopText } from '../formui';

type SalesTable = {
  serviceName: string;
  ledgerName: string;
  amount: number;
};

const serviceName = [
  { label: 'MI 001 - Lenovo Laptop', value: 'mi001' },
  { label: 'MI 002 - Lenovo Laptop', value: 'mi002' },
];

export const AccountServicesCharge = () => {
  // const { t } = useTranslation();

  return (
    <GroupContainer
      scrollMarginTop={'200px'}
      display="flex"
      flexDirection={'column'}
      gap="s16"
    >
      <TextBoxContainer>
        <TopText>Account Service Charge</TopText>
        <SubText>Add different service charges.</SubText>
      </TextBoxContainer>
      <Box p="s16" bg="white" minH="100vh">
        <FormEditableTable<SalesTable>
          name="data"
          debug={true}
          columns={[
            {
              accessor: 'serviceName',
              header: 'Service Name',
              // cellWidth: 'auto',
              fieldType: 'select',
              searchOptions: serviceName,
            },
            {
              accessor: 'ledgerName',
              header: 'Ledger Name',
              // cellWidth: 'lg',
              fieldType: 'select',
              selectOptions: [
                {
                  label: 'Purchase Ledger',
                  value: 'purchaseLedger',
                },
                {
                  label: 'Sales Ledger',
                  value: 'salesLedger',
                },
              ],
            },
            {
              accessor: 'amount',
              header: 'Amount',
              isNumeric: true,
              // accessorFn: (row) => row.amount,
            },
          ]}
        />
      </Box>
    </GroupContainer>
  );
};
