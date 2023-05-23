import { Dispatch, SetStateAction, useMemo } from 'react';

import { Box, FormSection, Text } from '@myra-ui';
import { Column, Table } from '@myra-ui/table';

import { useGetLoanProvisionAccountsQuery } from '@coop/cbs/data-access';
import { FormCOASelectModal } from '@coop/shared/form';
import { amountConverter } from '@coop/shared/utils';

export const MaturedAbove12Months = ({
  setSelectedAccounts,
}: {
  setSelectedAccounts: Dispatch<SetStateAction<string[]>>;
}) => {
  const { data: loanProvisionAccountsData } = useGetLoanProvisionAccountsQuery();

  const oneTo12Months = useMemo(
    () => loanProvisionAccountsData?.loanAccount?.loanProvisionAccounts?.oneTo12Months ?? [],
    [loanProvisionAccountsData]
  );

  const columns = useMemo<Column<typeof oneTo12Months[0]>[]>(
    () => [
      {
        header: 'Loan Account No.',
        accessorKey: 'id',
      },
      {
        header: 'Loan Account Name',
        accessorKey: 'name',
      },
      {
        header: 'Good Amount',
        accessorFn: (row) => amountConverter(row?.amount || 0),
        meta: {
          isNumeric: true,
        },
      },
      {
        header: 'Provision %',
        accessorKey: 'amount',
        cell: () => (
          <Box display="flex" gap="s4" justifyContent="flex-end">
            100
            <Text fontWeight="Medium" fontSize="r1" color="primary.500">
              %
            </Text>
          </Box>
        ),
      },
      {
        header: 'Provision Amount',
        accessorFn: (row) => amountConverter(row?.amount || 0),

        meta: {
          isNumeric: true,
        },
      },
    ],
    []
  );

  return (
    <>
      <FormSection templateColumns={1} header="Matured (Due) - Above 12 months" divider={false}>
        <Table
          data={oneTo12Months}
          columns={columns}
          isStatic
          allowSelection
          allowSearch
          onRowSelect={setSelectedAccounts}
          getRowId={(row) => row?.id as string}
        />
      </FormSection>

      <FormSection header="Ledger Mapping for Matured (Due) - Above 12 months">
        <Box display="flex" flexDirection="column" gap="s4">
          <Text variant="formLabel">From</Text>
          <FormCOASelectModal name="provisionAbove12M.provisionMapping.from" />
        </Box>
        <Box display="flex" flexDirection="column" gap="s4">
          <Text variant="formLabel">To</Text>
          <FormCOASelectModal name="provisionAbove12M.provisionMapping.to" />
        </Box>
      </FormSection>
    </>
  );
};
