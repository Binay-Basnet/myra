import { Dispatch, SetStateAction, useMemo } from 'react';

import { Box, FormSection, Text } from '@myra-ui';
import { Column, Table } from '@myra-ui/table';

import { useGetLoanProvisionAccountsQuery } from '@coop/cbs/data-access';
import { FormCOASelectModal } from '@coop/shared/form';
import { amountConverter } from '@coop/shared/utils';

export const Matured1to30Days = ({
  setSelectedAccounts,
}: {
  setSelectedAccounts: Dispatch<SetStateAction<string[]>>;
}) => {
  const { data: loanProvisionAccountsData } = useGetLoanProvisionAccountsQuery();

  const oneTo30DaysAccounts = useMemo(
    () => loanProvisionAccountsData?.loanAccount?.loanProvisionAccounts?.oneTo30Days ?? [],
    [loanProvisionAccountsData]
  );

  const columns = useMemo<Column<typeof oneTo30DaysAccounts[0]>[]>(
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
            1
            <Text fontWeight="Medium" fontSize="r1" color="primary.500">
              %
            </Text>
          </Box>
        ),
      },
      {
        header: 'Provision Amount',
        accessorKey: 'amount',
        cell: (props) => amountConverter((Number(props?.row?.original?.amount) * 0.01).toFixed(2)),
        meta: {
          isNumeric: true,
        },
      },
    ],
    []
  );

  return (
    <>
      <FormSection templateColumns={1} header="Matured (Due) - 1 to 30 days" divider={false}>
        <Table
          data={oneTo30DaysAccounts}
          columns={columns}
          isStatic
          allowSelection
          allowSearch
          tablePagination
          onRowSelect={setSelectedAccounts}
          getRowId={(row) => row?.id as string}
        />
      </FormSection>

      <FormSection header="Ledger Mapping for Matured (Due) - 1 to 30 days">
        <Box display="flex" flexDirection="column" gap="s4">
          <Text variant="formLabel">From</Text>
          <FormCOASelectModal name="provision1To30D.provisionMapping.from" />
        </Box>
        <Box display="flex" flexDirection="column" gap="s4">
          <Text variant="formLabel">To</Text>
          <FormCOASelectModal name="provision1To30D.provisionMapping.to" />
        </Box>
      </FormSection>
    </>
  );
};
