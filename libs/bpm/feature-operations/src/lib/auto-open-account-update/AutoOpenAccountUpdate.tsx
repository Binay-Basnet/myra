import { useMemo } from 'react';
import { useRouter } from 'next/router';
import { useDisclosure } from '@chakra-ui/react';

import { PageHeader } from '@myra-ui';
import { Column, Table } from '@myra-ui/table';

import { useGetOperationsAutoOpenListQuery } from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import { getPaginationQuery } from '@coop/shared/utils';

import { AutoOpenAccountDetailModal } from '../../components/auto-openaccount/AccountDetailsModal';

export const BPMOperationsAccountAutopUpdateList = () => {
  const { data: meetingData, isLoading } = useGetOperationsAutoOpenListQuery({
    pagination: getPaginationQuery(),
  });
  const rowData = meetingData?.bpm?.operations?.autoOpenAccount?.listAutoOpenAccount?.edges ?? [];
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        header: 'Member Code',
        accessorKey: 'node.code',
      },
      {
        header: ' Name',
        accessorKey: 'node.name',

        meta: {
          width: '50%',
        },
      },
      {
        header: 'Account-open Accounts Updated',
        accessorKey: 'node.count',
      },
    ],
    []
  );

  return (
    <>
      <PageHeader heading="Auto-open Accounts Updates" />
      <Table
        isLoading={isLoading}
        data={rowData}
        columns={columns}
        rowOnClick={(row) => {
          router.push(
            `${ROUTES.BPM_OPERATIONS_AUTO_OPEN_ACCOUNT_UPDATES_LIST}?id=${row?.node?.id}`
          );
          onOpen();
        }}
        pagination={{
          total:
            meetingData?.bpm?.operations?.autoOpenAccount?.listAutoOpenAccount?.totalCount ??
            'Many',
          pageInfo: meetingData?.bpm?.operations?.autoOpenAccount?.listAutoOpenAccount?.pageInfo,
        }}
      />
      <AutoOpenAccountDetailModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};
