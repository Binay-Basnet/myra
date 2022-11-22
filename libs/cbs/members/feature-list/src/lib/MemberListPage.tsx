import React, { useCallback, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { useQueryClient } from '@tanstack/react-query';

import { ObjState, useDeleteDraftMutation, useGetMemberListQuery } from '@coop/cbs/data-access';
import { formatTableAddress } from '@coop/cbs/utils';
import { Column, Table } from '@coop/shared/table';
import {
  asyncToast,
  Avatar,
  Box,
  ChakraModal,
  PageHeader,
  TablePopover,
  Text,
} from '@coop/shared/ui';
import { featureCode, getRouterQuery, useTranslation } from '@coop/shared/utils';

import { MEMBER_TAB_ITEMS } from '../constants/MEMBER_TAB_ITEMS';

const memberTypeSlug = {
  INDIVIDUAL: 'individual',
  INSTITUTION: 'institution',
  COOPERATIVE: 'coop',
  COOPERATIVE_UNION: 'coop_union',
};

export const MemberListPage = () => {
  const { t } = useTranslation();
  const [ID, setID] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const { mutateAsync } = useDeleteDraftMutation();

  const onOpenModal = () => {
    setOpenModal(true);
  };
  const onCloseModal = () => {
    setOpenModal(false);
  };

  const queryClient = useQueryClient();

  const router = useRouter();
  const isDraft = router?.query['objState'] === 'DRAFT';
  const isSubmitted = router?.query['objState'] === 'VALIDATED';

  const { data, isFetching, refetch } = useGetMemberListQuery({
    pagination: getRouterQuery({ type: ['PAGINATION'] }),
    filter: {
      objState: (router.query['objState'] ?? ObjState.Approved) as ObjState,
    },
  });

  React.useEffect(() => {
    refetch();
  }, []);

  const rowData = useMemo(() => data?.members?.list?.edges ?? [], [data]);

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        id: 'id',
        header: isDraft ? t['memberListTableMemberId'] : t['memberListTableMemberCode'],
        accessorFn: (row) => (isDraft ? row?.node?.id : row?.node?.code),
        // enableSorting: true,
      },
      {
        id: 'name',
        accessorFn: (row) => row?.node?.name?.local,
        header: t['memberListTableName'],
        // enableSorting: true,
        cell: (props) => (
          <Box display="flex" alignItems="center" gap="s12">
            <Avatar
              name={props.getValue() as string}
              size="sm"
              src={props?.row?.original?.node?.profilePicUrl ?? ''}
            />
            <Text
              fontSize="s3"
              textTransform="capitalize"
              textOverflow="ellipsis"
              overflow="hidden"
            >
              {props.getValue() as string}
            </Text>
          </Box>
        ),

        meta: {
          width: '400px',
        },
      },
      {
        header: t['memberListTableAddress'],
        accessorFn: (row) => formatTableAddress(row?.node?.address),
        meta: {
          width: '220px',
        },
      },
      {
        header: t['memberListTablePhoneNo'],
        accessorFn: (row) => row?.node?.contact,
        meta: {
          width: '120px',
        },
      },
      {
        header: t['memberListDateJoined'],
        accessorFn: (row) => row?.node?.dateJoined?.split(' ')[0] ?? 'N/A',
        meta: {
          width: '100px',
        },
      },
      {
        id: '_actions',
        header: '',
        accessorKey: 'actions',
        cell: (cell) =>
          cell.row.original?.node ? (
            <TablePopover
              node={cell.row.original?.node}
              items={
                isDraft
                  ? [
                      {
                        title: t['memberListTableViewMemberProfile'],
                        onClick: (node) => router.push(`/members/details?id=${node?.id}`),
                      },
                      {
                        title: t['memberListTableEditMember'],
                        onClick: (node) => {
                          router.push(
                            `/members/${memberTypeSlug[node?.type || 'INDIVIDUAL']}/edit/${
                              node?.id
                            }`
                          );
                        },
                      },
                      {
                        title: t['memberDeleteMember'],
                        onClick: (node) => {
                          onOpenModal();
                          setID(node?.id);
                        },
                      },
                    ]
                  : [
                      {
                        title: t['memberListTableViewMemberProfile'],
                        onClick: (node) => router.push(`/members/details?id=${node?.id}`),
                      },
                      {
                        title: t['memberListTableEditMember'],
                        onClick: (node) => {
                          router.push(
                            `/members/${memberTypeSlug[node?.type || 'INDIVIDUAL']}/edit/${
                              node?.id
                            }`
                          );
                        },
                      },
                      {
                        title: isSubmitted
                          ? t['memberListTableMakeActive']
                          : t['memberListTableMakeInactive'],
                        onClick: (node) => {
                          isSubmitted
                            ? router.push(`/members/activation/${node?.id}`)
                            : router.push(`/members/inactivation/${node?.id}`);
                        },
                      },
                    ]
              }
            />
          ) : null,
        meta: {
          width: '60px',
        },
      },
    ],
    [t, isDraft, isSubmitted]
  );

  const deleteMember = useCallback(async () => {
    await asyncToast({
      id: 'inactive-id',
      msgs: {
        success: 'Deleted member successfully',
        loading: 'Deleting member',
      },
      onSuccess: () => {
        refetch();
        onCloseModal();
      },
      promise: mutateAsync({
        memberId: ID,
      }),
    });
  }, [ID, mutateAsync]);
  const onCancel = () => {};

  return (
    <>
      <Box position="sticky" top="110px" zIndex={3}>
        <PageHeader
          heading={`${t['memberLayoutMembers']} - ${featureCode?.memberList}`}
          tabItems={MEMBER_TAB_ITEMS}
        />
      </Box>
      <Table
        data={rowData}
        columns={columns}
        getRowId={(row) => String(row?.node?.id)}
        rowOnClick={(row) => {
          queryClient.invalidateQueries(['getMemberDetailsOverview']);
          router.push(`/members/details?id=${row?.node?.id}`);
        }}
        isLoading={isFetching}
        noDataTitle={t['member']}
        pagination={{
          total: data?.members?.list?.totalCount ?? 'Many',
          pageInfo: data?.members?.list?.pageInfo,
        }}
      />
      <ChakraModal
        open={openModal}
        onClose={onCloseModal}
        primaryButtonLabel="yes"
        secondaryButtonLabel="cancel"
        width="600px"
        primaryButtonHandler={deleteMember}
        secondaryButtonHandler={onCancel}
      >
        {t['memberDeleteConfirm']}
      </ChakraModal>
    </>
  );
};

export default MemberListPage;
