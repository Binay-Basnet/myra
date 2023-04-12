import { useMemo } from 'react';
import { useRouter } from 'next/router';
import { useDisclosure } from '@chakra-ui/react';

import { PageHeader } from '@myra-ui';
import { Column, Table, TablePopover } from '@myra-ui/table';

import { useGetCommitteeListQuery } from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';

import { EditCommitteeModal } from '../components/AddNewCommiteeModal';

export const CommitteListTable = () => {
  const router = useRouter();
  const { data, isFetching } = useGetCommitteeListQuery();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const rowData = useMemo(() => data?.settings?.general?.organization?.committee ?? [], [data]);
  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        id: 'accountOpenedDate',
        header: 'Committee Name',
        accessorFn: (row) => row?.name,
      },

      {
        header: 'Tenure',
        accessorFn: (row) => row?.tenure,
      },

      {
        header: 'Total Members',
        accessorFn: (row) => row?.memberCount,
      },
      {
        id: '_actions',
        header: '',

        cell: (props) =>
          props?.row?.original && (
            <TablePopover
              node={props?.row?.original}
              items={[
                {
                  title: 'Edit Committee',
                  aclKey: 'CBS_MEMBERS_MEMBER',
                  action: 'VIEW',
                  onClick: () => {
                    router.push(
                      `${ROUTES?.SETTINGS_GENERAL_COMMITTEE}?id=${props?.row?.original?.id}`
                    );
                    onOpen();
                  },
                },
              ]}
            />
          ),
        meta: {
          width: '20px',
        },
      },
    ],
    [data]
  );
  const pageHeaderHandler = async () => {
    await router.push({ query: {} });
    onOpen();
  };

  return (
    <>
      {' '}
      <PageHeader
        heading="Committee"
        button
        buttonTitle="Add new committee"
        onClick={pageHeaderHandler}
      />
      <Table
        isLoading={isFetching}
        data={rowData}
        columns={columns}
        rowOnClick={(row) => {
          router.push(`${ROUTES.SETTINGS_GENERAL_COMMITTEE_DETAILS}?id=${row?.id}`);
        }}
      />
      <EditCommitteeModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};
