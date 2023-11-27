import { useMemo } from 'react';
import { useDisclosure } from '@chakra-ui/react';

import { Column, PageHeader, Table } from '@myra-ui';

import { useListSaccosAvailableSmsCountQuery } from '@coop/neosys-admin/data-access';
import { getPaginationQuery } from '@coop/shared/utils';

import { AddSMSCreditModal } from '../components/AddSMSCreditModal';

export const UtilityClientSMSBalanceList = () => {
  const {
    isOpen: isAddModalOpen,
    onClose: onAddModalClose,
    onToggle: onAddModalToggle,
  } = useDisclosure();

  const { data, isFetching } = useListSaccosAvailableSmsCountQuery({
    paginate: { ...getPaginationQuery(), first: -1 },
  });

  const rowData = useMemo(() => data?.sms?.listSaccosAvailableSmsCount?.edges ?? [], [data]);

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
        header: 'Available Credit',
        accessorFn: (row) => row?.node?.messageCount || 0,
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
        heading="Utility SMS Balance"
        button
        buttonTitle="Add Credit"
        onClick={onAddModalToggle}
      />

      <Table isLoading={isFetching} data={rowData} columns={columns} />

      <AddSMSCreditModal isOpen={isAddModalOpen} onClose={onAddModalClose} />
    </>
  );
};
