import { GroupContainer } from '@coop/cbs/kym-form/ui-containers';
import { FormEditableTable } from '@coop/shared/form';
import { Box } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

import { SubText, TextBoxContainer, TopText } from '../formui';

type AccountServiceTable = {
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
  const { t } = useTranslation();

  return (
    <GroupContainer
      scrollMarginTop={'200px'}
      display="flex"
      flexDirection={'column'}
      gap="s16"
    >
      <TextBoxContainer>
        <TopText>{t['loanProductAccountServiceCharge']} </TopText>
        <SubText>{t['loanProductAdddifferentservicecharges']}.</SubText>
      </TextBoxContainer>
      <Box>
        <FormEditableTable<AccountServiceTable>
          name="serviceCharge"
          debug={false}
          columns={[
            {
              accessor: 'serviceName',
              header: t['loanAccServiceTableServiceName'],
              fieldType: 'select',
              cellWidth: 'auto',

              selectOptions: service_name,
            },
            {
              accessor: 'ledgerName',
              header: t['loanAccServiceTableLedgerName'],
              fieldType: 'select',
              cellWidth: 'auto',
              selectOptions: ledger_name,
            },
            {
              accessor: 'amount',
              header: t['loanAccServiceTableAmount'],
              cellWidth: 'auto',
              isNumeric: true,
            },
          ]}
        />
      </Box>
    </GroupContainer>
  );
};
