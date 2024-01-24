import { useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { useDisclosure } from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';

import { asyncToast, PageHeader } from '@myra-ui';
import { Column, Table, TablePopover } from '@myra-ui/table';

import {
  Arrange,
  useAppSelector,
  useDeleteSubmissionListCollectedMutation,
  useListMrSubmissionListQuery,
} from '@coop/cbs/data-access';
import { localizedDate, ROUTES } from '@coop/cbs/utils';
import { ConfirmationDialog } from '@coop/shared/components';
import { amountConverter, getPaginationQuery, useTranslation } from '@coop/shared/utils';

export const MarketRepresentativeCollectionList = () => {
  const { t } = useTranslation();

  const {
    isOpen: isDeleteConfirmOpen,
    onClose: onDeleteConfirmClose,
    onToggle: onDeleteConfirmToggle,
  } = useDisclosure();

  const [selectedSubmissionId, setSelectedSubmissionId] = useState('');

  const queryClient = useQueryClient();

  const userId = useAppSelector((state) => state.auth?.user?.id);

  const router = useRouter();

  const sortParams = router.query['sort'];

  const { data, isFetching } = useListMrSubmissionListQuery({
    pagination: sortParams
      ? getPaginationQuery()
      : {
          ...getPaginationQuery(),
          order: {
            column: 'submissionDate',
            arrange: Arrange.Desc,
          },
        },
    filter: {
      orConditions: [{ andConditions: [{ column: 'mrId', comparator: 'EqualTo', value: userId }] }],
    },
  });

  const rowData = useMemo(() => data?.agent?.listMRSubmissionList?.edges ?? [], [data]);

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        id: 'submissionDate',
        header: 'Date',
        accessorFn: (row) => row?.node?.submissionDate?.local,
        cell: (props) => localizedDate(props?.row?.original?.node?.submissionDate),
        // meta: {
        //   orderId: 'submissionDate',
        // },
        enableSorting: true,
      },
      {
        header: 'MR Transaction ID',
        accessorFn: (row) => row?.node?.id,
      },
      {
        accessorFn: (row) => row?.node?.mrName,
        header: 'Market Representative Name',

        meta: {
          width: '60%',
        },
      },
      {
        id: 'totalAmount',
        header: 'Amount Collected',
        cell: (props) => amountConverter(props?.row?.original?.node?.totalAmount || 0),
      },
      {
        id: 'totalFine',
        header: 'Fine Collected',
        cell: (props) => amountConverter(props?.row?.original?.node?.totalFine || 0),
      },
      {
        header: 'Status',
        accessorFn: (row) => row?.node?.status,
      },
      {
        id: '_actions',
        header: '',

        cell: (props) =>
          props?.row?.original?.node && (
            <TablePopover
              node={props?.row?.original?.node}
              items={
                props?.row?.original?.node?.status === 'COLLECTED'
                  ? [
                      {
                        title: 'Delete',
                        aclKey: 'DELETE_COLLECTION_LIST',
                        action: 'DELETE',
                        onClick: (row) => {
                          setSelectedSubmissionId(row?.id);
                          onDeleteConfirmToggle();
                        },
                      },
                      {
                        title: t['transDetailViewDetail'],
                        aclKey: 'CBS_MISCELLANEOUS_MARKET_REPRESENTATIVES',
                        action: 'VIEW',
                        onClick: (row) => {
                          router.push(
                            `${ROUTES.CBS_OTHERS_MARKET_REPRESENTATIVE_COLLECTION_DETAILS}?id=${row?.id}`
                          );
                        },
                      },
                    ]
                  : [
                      {
                        title: t['transDetailViewDetail'],
                        aclKey: 'CBS_MISCELLANEOUS_MARKET_REPRESENTATIVES',
                        action: 'VIEW',
                        onClick: (row) => {
                          router.push(
                            `${ROUTES.CBS_OTHERS_MARKET_REPRESENTATIVE_COLLECTION_DETAILS}?id=${row?.id}`
                          );
                        },
                      },
                    ]
              }
            />
          ),
        meta: {
          width: '3.125rem',
        },
      },
    ],
    [t]
  );

  const { mutateAsync: deleteSubmission } = useDeleteSubmissionListCollectedMutation();

  const handleDeleteCollection = () => {
    asyncToast({
      id: 'mr-delete-submission-list',
      msgs: {
        loading: 'Deleting Submission List',
        success: 'Submission List Deleted',
      },
      promise: deleteSubmission({ id: selectedSubmissionId }),
      onSuccess: () => {
        setSelectedSubmissionId('');
        queryClient.invalidateQueries(['listMRSubmissionList']);
      },
    });
  };

  return (
    <>
      <PageHeader heading="Market Representative Collection" />

      <Table
        data={rowData}
        getRowId={(row) => String(row?.node?.id)}
        isLoading={isFetching}
        columns={columns}
        // rowOnClick={(row) =>
        //   router.push(
        //     `/${getUrl(router.pathname, 3)}/details?id=${row?.node?.agentId}&date=${
        //       row?.node?.date?.local
        //     }`
        //   )
        // }
        rowOnClick={(row) =>
          router.push(
            `${ROUTES.CBS_OTHERS_MARKET_REPRESENTATIVE_COLLECTION_DETAILS}?id=${row?.node?.id}`
          )
        }
        noDataTitle="Market Representative Collection"
        pagination={{
          total: data?.agent?.listMRSubmissionList?.totalCount ?? 'Many',
          pageInfo: data?.agent?.listMRSubmissionList?.pageInfo,
        }}
      />

      <ConfirmationDialog
        isOpen={isDeleteConfirmOpen}
        onClose={() => {
          setSelectedSubmissionId('');
          onDeleteConfirmClose();
        }}
        handleConfirm={handleDeleteCollection}
        title="Delete Submission List"
        description="This action will delete the submission list. Are you sure you want to continue?"
      />
    </>
  );
};

export default MarketRepresentativeCollectionList;
