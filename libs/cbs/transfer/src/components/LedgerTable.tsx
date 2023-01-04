import { useState } from 'react';

import { FormSection, GridItem } from '@myra-ui';

import { useGetCoaAccountsUnderLeafListQuery } from '@coop/cbs/data-access';
import { COASelectModal } from '@coop/shared/components';
import { FormEditableTable } from '@coop/shared/form';

export type LedgerTableProps = {
  ledgerId: string;
  accountId: string;
  dr: string;
  cr: string;
};
export const LedgerTable = () => {
  const [parentId, setParentId] = useState<string>('');
  const { refetch } = useGetCoaAccountsUnderLeafListQuery({ parentId, currentBranch: true });

  const getAccountsList = async (pId: string) =>
    new Promise<{ label: string; value: string }[]>((resolve) => {
      setParentId(pId);

      refetch()?.then(({ data }) => {
        resolve(
          data?.settings?.chartsOfAccount?.accountsUnderLeaf?.map((account) => ({
            label: account?.name as string,
            value: account?.accountId as string,
          })) ?? []
        );
      });
    });

  return (
    <FormSection header="My Ledger" subHeader="Select Source Ledger & account." templateColumns={1}>
      <GridItem colSpan={3}>
        <FormEditableTable<LedgerTableProps>
          name="selfEntries"
          debug={false}
          columns={[
            {
              accessor: 'accountId',
              header: 'Account',
              fieldType: 'modal',
              cellWidth: 'auto',
              modal: COASelectModal,
            },
            {
              accessor: 'ledgerId',
              header: 'Ledger',
              loadOptions: (row) => getAccountsList(row?.accountId),
              fieldType: 'select',
              cellWidth: 'auto',
            },
            {
              accessor: 'dr',
              header: 'DR',
              isNumeric: true,
              cellWidth: 'lg',
            },
            {
              accessor: 'cr',
              header: 'CR',
              isNumeric: true,
              cellWidth: 'lg',
            },
          ]}
        />
      </GridItem>
    </FormSection>
  );
};
