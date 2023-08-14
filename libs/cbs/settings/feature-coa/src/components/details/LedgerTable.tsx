import { RefObject, useMemo, useRef, useState } from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';
import { Pagination } from 'libs/@myra/table/src/types/Table';

import { asyncToast, Box, Button, Chips, Switch, Text, Tooltip } from '@myra-ui';
import { Column, Table, TablePopover } from '@myra-ui/table';

import {
  LedgerList,
  TagConciseEntry,
  useAddTagToLedgerMutation,
  useGetMemberFilterMappingQuery,
  useUpdateLedgerStatusMutation,
} from '@coop/cbs/data-access';
import { localizedDate, RedirectButton, ROUTES } from '@coop/cbs/utils';
import { debitCreditConverter } from '@coop/shared/utils';

import { EditTagsModal } from '../modals';

interface ILedgerTableProps {
  ledgersList: LedgerList[];
  pagination?: Pagination;
  tableRef?: RefObject<HTMLTableElement>;
  isLoading?: boolean;
}

export const LedgerTable = ({
  ledgersList,
  pagination,
  tableRef,
  isLoading,
}: ILedgerTableProps) => {
  const [selectedLedgerId, setSelectedLedgerId] = useState('');
  const [selectedTags, setSelectedTags] = useState<(TagConciseEntry | null)[]>([]);

  const alertCancelRef = useRef<HTMLButtonElement | null>(null);

  const queryClient = useQueryClient();

  const {
    isOpen: isEditTagModalOpen,
    onClose: onEditTagModalClose,
    onToggle: onEditTagModalToggle,
  } = useDisclosure();

  const { isOpen: isAlertOpen, onClose: onAlertClose, onToggle: onAlertToggle } = useDisclosure();

  const { data: filterMapping } = useGetMemberFilterMappingQuery();

  const { mutateAsync: removeTags } = useAddTagToLedgerMutation();

  const handleRemoveTags = () => {
    asyncToast({
      id: 'coa-remove-ledger-tags',
      msgs: {
        loading: 'Removing tags',
        success: 'Tags removed',
      },
      promise: removeTags({
        ledgerId: selectedLedgerId,
        tagId: [],
      }),
      onSuccess: () => {
        onAlertClose();
        queryClient.invalidateQueries(['getLedgerList']);
      },
    });
  };

  const { mutateAsync: changeLedgerStatus } = useUpdateLedgerStatusMutation();

  const columns = useMemo<Column<typeof ledgersList[0]>[]>(
    () => [
      {
        id: 'date',
        header: 'Date',
        accessorKey: 'date',
        cell: (props) => localizedDate(props?.row?.original?.date),
        enableColumnFilter: true,
        filterFn: 'dateTime',
      },
      {
        header: 'Ledger Name',
        cell: (props) => (
          <RedirectButton
            label={<Tooltip title={props?.row?.original?.ledgerName as string} />}
            link={`${ROUTES.SETTINGS_GENERAL_COA_DETAILS}?id=${props?.row?.original?.accountCode}`}
          />
        ),
      },
      {
        header: 'Service Center',
        accessorKey: 'serviceCenter',
        enableColumnFilter: true,
        // filterFn: 'dateTime',
        meta: {
          filterMaps: {
            list: filterMapping?.members?.filterMapping?.serviceCenter,
          },
        },
      },
      {
        header: 'Tags',
        id: 'tags',
        cell: (props) => (
          <Box display="flex" gap="s4">
            {props?.row?.original?.tags?.map((tag) => (
              <Chips
                label={tag?.name as string}
                type="label"
                variant="solid"
                theme="neutral"
                size="sm"
              />
            ))}
          </Box>
        ),
      },
      {
        id: 'balance',
        header: 'Balance',
        accessorFn: (row) =>
          debitCreditConverter(row?.balance as string, row?.balanceType as string),
        enableColumnFilter: true,
        filterFn: 'amount',
      },
      {
        header: 'Status',
        // accessorFn: (row) => row?.balance as string,
        cell: (props) => (
          <Switch
            defaultChecked={props?.row?.original?.status as boolean}
            onChange={(e) =>
              changeLedgerStatus({
                id: props?.row?.original?.accountCode as string,
                status: e.target.checked,
              })
            }
          />
        ),
      },
      {
        id: '_actions',
        header: '',
        accessorKey: 'actions',
        cell: (props) => (
          <TablePopover
            items={[
              {
                title: 'Edit Tags',
                onClick: () => {
                  setSelectedLedgerId(props?.row?.original?.accountCode as string);
                  setSelectedTags(props?.row?.original?.tags || []);
                  onEditTagModalToggle();
                },
              },
              {
                title: 'Remove All Tags',
                onClick: () => {
                  setSelectedLedgerId(props?.row?.original?.accountCode as string);
                  onAlertToggle();
                },
              },
            ]}
            node={props?.row?.original}
          />
        ),
        meta: {
          width: '60px',
        },
      },
    ],
    [filterMapping?.members?.filterMapping?.serviceCenter]
  );

  return (
    <>
      <Table
        isDetailPageTable
        isStatic
        isLoading={isLoading}
        data={ledgersList}
        columns={columns}
        pagination={pagination}
        ref={tableRef}
      />

      <EditTagsModal
        isOpen={isEditTagModalOpen}
        onClose={onEditTagModalClose}
        ledgerId={selectedLedgerId}
        tags={selectedTags}
      />

      <AlertDialog
        isOpen={isAlertOpen}
        leastDestructiveRef={alertCancelRef}
        onClose={onAlertClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader
              fontSize="lg"
              fontWeight="bold"
              borderBottom="1px"
              borderColor="border.layout"
            >
              <Text fontWeight="SemiBold" fontSize="r2" color="gray.800" lineHeight="150%">
                Remove Tags
              </Text>
            </AlertDialogHeader>

            <AlertDialogBody borderBottom="1px solid" borderBottomColor="border.layout" p="s16">
              <Text fontSize="s3" fontWeight={400} color="gray.800">
                All the tags will be removed from the ledger. Do you want to continue?
              </Text>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={alertCancelRef} variant="outline" onClick={onAlertClose}>
                Cancel
              </Button>
              <Button shade="danger" ml={3} onClick={handleRemoveTags}>
                Confirm
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};
