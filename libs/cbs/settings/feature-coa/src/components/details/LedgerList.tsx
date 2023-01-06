import { ReactNode, useMemo } from 'react';
import { useRouter } from 'next/router';

import { Box, Button, DetailsCard, Tooltip } from '@myra-ui';
import { Column, Table } from '@myra-ui/table';

import { LedgerList } from '@coop/cbs/data-access';
import { localizedDate, ROUTES } from '@coop/cbs/utils';

interface ILedgerListsProps {
  ledgers: LedgerList[];
  headerButton?: ReactNode;
}

export const LedgerLists = ({ ledgers, headerButton }: ILedgerListsProps) => {
  const router = useRouter();

  const ledgersList = useMemo(
    () =>
      ledgers?.map((ledger, index) => ({
        index: String(index + 1),
        ...ledger,
      })) ?? [],
    [ledgers]
  );

  const columns = useMemo<Column<typeof ledgersList[0]>[]>(
    () => [
      {
        header: 'SN',
        accessorKey: 'index',
        cell: (props) => (props.getValue() ? props.getValue() : 'N/A'),
      },
      {
        header: 'Date',
        accessorKey: 'date',
        cell: (props) => localizedDate(props?.row?.original?.date),
      },
      {
        header: 'Ledger Name',
        cell: (props) => (
          <Box display="flex" flexDirection="column" gap="s4">
            <Button
              variant="link"
              onClick={() =>
                router.push(
                  `${ROUTES.SETTINGS_GENERAL_COA_DETAILS}?id=${props?.row?.original?.accountCode}`
                )
              }
            >
              <Tooltip title={props?.row?.original?.ledgerName as string} />
            </Button>
          </Box>
        ),
      },
      {
        header: 'Service Center',
        accessorKey: 'serviceCenter',
      },
      {
        header: 'Balance',
        accessorFn: (row) => row?.balance as string,
      },
    ],
    []
  );

  return (
    <DetailsCard title="Ledger Lists" hasTable leftBtn={headerButton}>
      <Table isDetailPageTable isStatic data={ledgersList} columns={columns} />
    </DetailsCard>
  );
};
