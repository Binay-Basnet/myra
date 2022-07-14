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

const service_name = [
  { label: 'Lenovo Laptop', value: 'mi001' },
  { label: 'Alienware Laptop', value: 'mi002' },
];

const ledger_name = [
  {
    label: 'Purchase Ledger',
    value: 'purchaseLedger',
  },
  {
    label: 'Sales Ledger',
    value: 'salesLedger',
  },
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
      <Box>
        <FormEditableTable<SalesTable>
          name="data"
          columns={[
            {
              accessor: 'serviceName',
              header: 'Service Name',
              fieldType: 'select',
              cellWidth: 'auto',

              selectOptions: service_name,
            },
            {
              accessor: 'ledgerName',
              header: 'Ledger Name',
              fieldType: 'select',
              cellWidth: 'auto',
              selectOptions: ledger_name,
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
    </GroupContainer>
  );
};
