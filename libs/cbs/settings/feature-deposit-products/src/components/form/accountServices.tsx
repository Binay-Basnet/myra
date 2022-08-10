import { GroupContainer } from '@coop/cbs/kym-form/ui-containers';
import { FormEditableTable } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

import { SubText, TextBoxContainer, TopText } from '../formui';

type AccountServiceTable = {
  serviceName: string;
  ledgerName: string;
  amount: number;
};

const service_name = [
  { label: 'Cheque Book Issue', value: 'chequeBookIssue' },
  { label: 'Atm issue', value: 'atmIssue' },
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
        <TopText>{t['depositProductAccountServiceCharge']} </TopText>
        <SubText>{t['depositProductAdddifferentservicecharges']} </SubText>
      </TextBoxContainer>
      <FormEditableTable<AccountServiceTable>
        name="serviceCharge"
        debug={false}
        columns={[
          {
            accessor: 'serviceName',
            header: t['depositProductAccServiceTableServiceName'],
            fieldType: 'select',
            cellWidth: 'auto',
            selectOptions: service_name,
          },
          {
            accessor: 'ledgerName',
            header: t['depositProductAccServiceTableLedgerName'],
            fieldType: 'select',
            cellWidth: 'auto',
            selectOptions: ledger_name,
          },
          {
            accessor: 'amount',
            header: t['depositProductAccServiceTableAmount'],
            cellWidth: 'auto',
            isNumeric: true,
          },
        ]}
      />
    </GroupContainer>
  );
};
