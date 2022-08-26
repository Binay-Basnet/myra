import { useGetCoaListQuery } from '@coop/cbs/data-access';
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

export const AccountServicesCharge = () => {
  const { t } = useTranslation();

  const { data: coa } = useGetCoaListQuery({
    filter: {
      active: true,
    },
  });

  const coaData = coa?.settings?.general?.chartsOfAccount?.accounts?.data;

  const coaList = coaData?.map((item) => {
    return {
      label: item?.name?.en as string,
      value: item?.id as string,
    };
  });

  return (
    <GroupContainer>
      <TextBoxContainer>
        <TopText>{t['depositProductAccountOpenServiceCharge']} </TopText>
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
            selectOptions: coaList,
          },
          {
            accessor: 'amount',
            header: t['depositProductAccServiceTableAmount'],
            cellWidth: 'auto',
            isNumeric: true,
          },
        ]}
      />

      <TextBoxContainer>
        <TopText>{t['depositProductAccountCloseServiceCharge']} </TopText>
        <SubText>{t['depositProductAdddifferentservicecharges']} </SubText>
      </TextBoxContainer>
      <FormEditableTable<AccountServiceTable>
        name="accountCloseCharge"
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
            selectOptions: coaList,
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
