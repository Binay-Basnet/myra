import { GroupContainer } from '@coop/cbs/kym-form/ui-containers';
import { TextBoxContainer, TopText } from '@coop/shared/components';
import { FormEditableTable } from '@coop/shared/form';
import { Box } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

type AccountServiceTable = {
  serviceName: string;
  ledgerName: string;
  amount: number;
};

export function ProductTypeTable() {
  const { t } = useTranslation();

  return (
    <Box pb="s20" width="full" display={'flex'} flexDirection={'column'}>
      <GroupContainer
        scrollMarginTop={'200px'}
        display="flex"
        flexDirection={'column'}
        gap="s16"
      >
        <TextBoxContainer>
          <TopText>{t['loanProductAccountServiceCharge']} </TopText>
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
              },
              {
                accessor: 'ledgerName',
                header: t['loanAccServiceTableLedgerName'],
                fieldType: 'select',
                cellWidth: 'auto',
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
    </Box>
  );
}

export default ProductTypeTable;
