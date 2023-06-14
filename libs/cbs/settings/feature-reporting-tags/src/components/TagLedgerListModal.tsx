import { useMemo } from 'react';
import Link from 'next/link';

import { Breadcrumb, Modal, Text } from '@myra-ui';
import { Column, Table } from '@myra-ui/table';

import { useListTagLedgersQuery } from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';

interface ITagLedgerListModalProps {
  isOpen: boolean;
  onClose: () => void;
  tagId: string;
  tagName: string;
}

export const TagLedgerListModal = ({
  isOpen,
  onClose,
  tagId,
  tagName,
}: ITagLedgerListModalProps) => {
  const { data: tagLedgerListData, isFetching } = useListTagLedgersQuery(
    {
      pagination: {
        after: '',
        first: -1,
        order: {
          arrange: 'DESC',
          column: 'ledgerId',
        },
      },

      filter: {
        orConditions: [
          { andConditions: [{ column: 'tagid', comparator: 'EqualTo', value: tagId }] },
        ],
      },
    },
    { enabled: !!tagId }
  );

  const tagLedgerList =
    tagLedgerListData?.settings?.chartsOfAccount?.tag?.listTagLedgers?.edges?.map((tag, index) => ({
      index: index + 1,
      ...tag,
    })) ?? [];

  const columns = useMemo<Column<typeof tagLedgerList[0]>[]>(
    () => [
      {
        header: 'SN',
        accessorKey: 'index',
        meta: {
          width: '80px',
        },
      },
      {
        header: 'Date',
        id: 'ledgerName',
        cell: (props) => (
          <Link
            target="_blank"
            href={`${ROUTES.SETTINGS_GENERAL_COA_DETAILS}?id=${props.row?.original?.node?.ledgerId}`}
          >
            <Text color="primary.500" _hover={{ textDecoration: 'underline' }}>
              {props?.row?.original?.node?.name}
            </Text>
          </Link>
        ),
      },
      {
        header: 'Service Center',
        accessorFn: (row) => row?.node?.branchName,
      },
    ],
    []
  );

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      isCentered
      title={
        <Breadcrumb paths={[{ label: tagName }, { label: `Ledgers (${tagLedgerList?.length})` }]} />
      }
      width="5xl"
    >
      <Table isStatic data={tagLedgerList} isLoading={isFetching} columns={columns} />
    </Modal>
  );
};
