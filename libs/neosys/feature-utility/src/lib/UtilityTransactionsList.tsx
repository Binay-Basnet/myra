import { useMemo } from 'react';
import { useDisclosure } from '@chakra-ui/react';

import { Column, PageHeader, Table } from '@myra-ui';

import { useGetUtilityTransactionListQuery } from '@coop/neosys-admin/data-access';
import { amountConverter, getPaginationQuery } from '@coop/shared/utils';

import { AddTransactionModal } from '../components/AddTransactionModal';

export const UtilityTransactionsList = () => {
  const {
    isOpen: isAddModalOpen,
    onClose: onAddModalClose,
    onToggle: onAddModalToggle,
  } = useDisclosure();

  const { data, isFetching } = useGetUtilityTransactionListQuery({
    paginate: getPaginationQuery(),
  });

  const rowData = useMemo(() => data?.utility?.listUtilityRecords?.edges ?? [], [data]);

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        header: 'SACCOS',
        accessorFn: (row) => `${row?.node?.slug} [${row?.node?.saccossName}]`,
        meta: {
          width: 'auto',
        },
      },
      {
        header: 'Debit',
        accessorFn: (row) => amountConverter(row?.node?.drAmount || 0),
        meta: {
          isNumeric: true,
        },
      },
      {
        header: 'Credit',
        accessorFn: (row) => amountConverter(row?.node?.crAmount || 0),
        meta: {
          isNumeric: true,
        },
      },
      {
        header: 'Utility',
        accessorFn: (row) => row?.node?.utility,
      },
      {
        header: 'Transaction Status',
        accessorFn: (row) => row?.node?.txnStatus,
      },
      {
        header: 'Remaining Balance',
        accessorFn: (row) => amountConverter(row?.node?.amount || 0),
        meta: {
          isNumeric: true,
        },
      },
    ],
    []
  );

  return (
    <>
      <PageHeader
        heading="Utility Transactions"
        button
        buttonTitle="Add Transaction"
        onClick={onAddModalToggle}
      />

      <Table isLoading={isFetching} data={rowData} columns={columns} />

      <AddTransactionModal isOpen={isAddModalOpen} onClose={onAddModalClose} />
    </>
  );
};
