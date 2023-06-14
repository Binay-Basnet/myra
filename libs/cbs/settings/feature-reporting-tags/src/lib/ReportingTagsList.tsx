import { useMemo, useState } from 'react';
import { useDisclosure } from '@chakra-ui/react';

import { Text } from '@myra-ui';
import { Column, Table } from '@myra-ui/table';

import { useLedgerTagsListQuery } from '@coop/cbs/data-access';
import { SettingsPageHeader } from '@coop/cbs/settings/ui-layout';
import { localizedDate } from '@coop/cbs/utils';
import { getFilterQuery, getPaginationQuery } from '@coop/shared/utils';

import { NewTagModal, TagLedgerListModal } from '../components';

export const ReportingTagsList = () => {
  const [selectedTag, setSelectedTag] = useState({ id: '', name: '' });

  const {
    isOpen: isNewTagModalOpen,
    onClose: onNewTagModalClose,
    onToggle: onNewTagModalToggle,
  } = useDisclosure();

  const {
    isOpen: isTagLedgerListModalOpen,
    onClose: onTagLedgerListModalClose,
    onToggle: onTagLedgerListModalToggle,
  } = useDisclosure();

  const { data: ledgerTagsListData, isFetching } = useLedgerTagsListQuery({
    pagination: getPaginationQuery(),
    filter: getFilterQuery(),
  });

  const rowData = useMemo(
    () => ledgerTagsListData?.settings?.chartsOfAccount?.tag?.list?.edges ?? [],
    [ledgerTagsListData]
  );

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        header: 'Created Date',
        accessorFn: (row) => localizedDate(row?.node?.createdAt),
      },
      {
        header: 'Tag Name',
        accessorFn: (row) => row?.node?.name,
      },
      {
        header: 'Description',
        accessorFn: (row) => row?.node?.description,
      },
      {
        header: 'No. of Assigned Ledgers',
        cell: (props) => (
          <Text
            color="primary.500"
            fontWeight={500}
            fontSize="r1"
            cursor="pointer"
            onClick={() => {
              setSelectedTag({
                id: props?.row?.original?.node?.id as string,
                name: props?.row?.original?.node?.name as string,
              });
              onTagLedgerListModalToggle();
            }}
          >
            {props?.row?.original?.node?.ledgerCount}
          </Text>
        ),
      },
    ],
    []
  );

  return (
    <>
      <SettingsPageHeader
        heading="Reporting Tags"
        buttonLabel="Create New Tag"
        buttonHandler={onNewTagModalToggle}
      />

      <Table
        data={rowData}
        getRowId={(row) => String(row?.node?.id)}
        isLoading={isFetching}
        columns={columns}
        pagination={{
          total: ledgerTagsListData?.settings?.chartsOfAccount?.tag?.list?.totalCount ?? 'Many',
          pageInfo: ledgerTagsListData?.settings?.chartsOfAccount?.tag?.list?.pageInfo,
        }}
      />

      <NewTagModal isOpen={isNewTagModalOpen} onClose={onNewTagModalClose} />

      <TagLedgerListModal
        isOpen={isTagLedgerListModalOpen}
        onClose={onTagLedgerListModalClose}
        tagId={selectedTag.id}
        tagName={selectedTag.name}
      />
    </>
  );
};
