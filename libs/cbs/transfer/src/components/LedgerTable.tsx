import { useState } from 'react';

import { FormSection, GridItem } from '@myra-ui';

import { useGetCoaAccountsUnderLeafListQuery } from '@coop/cbs/data-access';
import { COASelectModal } from '@coop/shared/components';
import { FormEditableTable } from '@coop/shared/form';

type LedgerTableProps = {
  ledger: string;
  account: string;
  dr: string;
  cr: string;
};
export const LedgerTable = () => {
  const [parentId, setParentId] = useState<string>('');

  //   const { watch } = useFormContext<LedgerTableProps>();

  //   const { crTotal, drTotal } = useMemo(() => {
  //     let tempCR = 0;
  //     let tempDR = 0;

  //     entries?.forEach((entry) => {
  //       tempCR += Number(entry?.crAmount ?? 0);
  //       tempDR += Number(entry?.drAmount ?? 0);
  //     });

  //     return { crTotal: tempCR, drTotal: tempDR };
  //   }, [entries]);

  const { refetch } = useGetCoaAccountsUnderLeafListQuery({ parentId });

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

  //   const tableSummaryColumns: TableOverviewColumnType[] = [
  //     { label: 'Total', width: 'auto', isNumeric: true },
  //     { label: String(drTotal), width: 'lg', isNumeric: true },
  //     { label: String(crTotal), width: 'lg', isNumeric: true },
  //   ];
  return (
    //   console.log({ branchListQueryData });
    <FormSection header="My Ledger" subHeader="Select Source Ledger & account." templateColumns={1}>
      <GridItem colSpan={3}>
        <FormEditableTable<LedgerTableProps>
          name="dormantSetup"
          debug={false}
          columns={[
            {
              accessor: 'account',
              header: 'Account',
              fieldType: 'modal',
              cellWidth: 'auto',
              modal: COASelectModal,
            },
            {
              accessor: 'ledger',
              header: 'Ledger',
              loadOptions: (row) => getAccountsList(row?.ledger),
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
