import React, { useCallback, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { useQueryClient } from '@tanstack/react-query';

import { asyncToast, Avatar, Box, Modal, PageHeader, TablePopover, Text } from '@myra-ui';
import { Column, Table } from '@myra-ui/table';

import {
  useDeleteDraftMutation,
  useGetGeneralMemberSettingsDataQuery,
  useGetMemberFilterMappingQuery,
  useGetMemberListQuery,
} from '@coop/cbs/data-access';
import { formatTableAddress, localizedDate, ROUTES } from '@coop/cbs/utils';
import {
  featureCode,
  getFilterQuery,
  getPaginationQuery,
  useTranslation,
} from '@coop/shared/utils';

import { forms, Page } from './MemberLayout';

const memberTypeSlug = {
  INDIVIDUAL: 'individual',
  INSTITUTION: 'institution',
  COOPERATIVE: 'coop',
  COOPERATIVE_UNION: 'coop_union',
};

export const MemberInactiveListPage = () => {
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
  const searchTerm = router?.query['search'] as string;
  const objState = router?.query['objState'];

  const { data: memberTypeData } = useGetGeneralMemberSettingsDataQuery();
  const { data: memberFilterData } = useGetMemberFilterMappingQuery();

  const memberTypes =
    memberTypeData?.settings?.general?.KYM?.general?.generalMember?.record?.memberType;

  const memberForms = Object.keys(memberTypes || {})
    ?.map((memberType) => {
      if (memberType && memberTypes?.[memberType as keyof typeof memberTypes]) {
        return forms[memberType];
      }
      return false;
    })
    ?.filter(Boolean) as Page[];

  const { data, isFetching, refetch } = useGetMemberListQuery(
    {
      pagination: getPaginationQuery(),
      filter: getFilterQuery({ objState: { value: 'INACTIVE', compare: '=' } }),
    },
    {
      staleTime: 0,
      enabled: searchTerm !== 'undefined',
    }
  );

  React.useEffect(() => {
    refetch();
  }, []);

  const rowData = useMemo(() => data?.members?.list?.data?.edges ?? [], [data]);

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        id: 'inactiveDate',
        header: 'Inactive Date',
        accessorFn: (row) => localizedDate(row?.node?.inactiveDate),
        cell: (row) => localizedDate(row?.cell?.row?.original?.node?.inactiveDate),
        enableColumnFilter: true,
        filterFn: 'dateTime',
        meta: {
          width: '100px',
        },
      },
      {
        id: 'id',
        header:
          objState === 'DRAFT' ? t['memberListTableMemberId'] : t['memberListTableMemberCode'],
        accessorFn: (row) => (objState === 'DRAFT' ? row?.node?.id : row?.node?.code),
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
        id: 'serviceCenter',
        header: 'Service Center',
        accessorFn: (row) => row?.node?.branch,
        enableColumnFilter: true,

        meta: {
          width: '120px',
          filterMaps: {
            list: memberFilterData?.members?.filterMapping?.serviceCenter || [],
          },
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
                /* eslint-disable no-nested-ternary */
                objState === 'DRAFT'
                  ? [
                      {
                        title: t['memberListTableEditMember'],
                        aclKey: 'CBS_MEMBERS_KYM_UPDATE',
                        action: 'UPDATE',
                        onClick: (node) => {
                          router.push(
                            `/cbs/members/${memberTypeSlug[node?.type || 'INDIVIDUAL']}/edit/${
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
                  : objState === 'VALIDATED'
                  ? [
                      {
                        title: t['memberListTableEditMember'],
                        aclKey: 'CBS_MEMBERS_MEMBER',
                        action: 'UPDATE',
                        onClick: (node) => {
                          router.push(
                            `/cbs/members/${memberTypeSlug[node?.type || 'INDIVIDUAL']}/edit/${
                              node?.id
                            }`
                          );
                        },
                      },
                      {
                        title:
                          objState === 'VALIDATED'
                            ? t['memberListTableMakeActive']
                            : t['memberListTableMakeInactive'],
                        aclKey: 'CBS_MEMBERS_MEMBER',
                        action: 'UPDATE',
                        onClick: (node) => {
                          objState === 'VALIDATED'
                            ? router.push(`${ROUTES.CBS_MEMBER_ACTIVATION}/${node?.id}`)
                            : router.push(`${ROUTES.CBS_MEMBER_INACTIVATION}/${node?.id}`);
                        },
                      },
                    ]
                  : [
                      {
                        title: t['memberListTableViewMemberProfile'],
                        aclKey: 'CBS_MEMBERS_MEMBER_DETAIL',
                        action: 'VIEW',
                        onClick: (node) =>
                          router.push(`${ROUTES.CBS_MEMBER_DETAILS}?id=${node?.id}`),
                      },
                      {
                        title: t['memberListTableEditMember'],
                        aclKey: 'CBS_MEMBERS_MEMBER',
                        action: 'UPDATE',
                        onClick: (node) => {
                          router.push(
                            `/cbs/members/${memberTypeSlug[node?.type || 'INDIVIDUAL']}/edit/${
                              node?.id
                            }`
                          );
                        },
                      },
                      {
                        title:
                          objState === 'VALIDATED'
                            ? t['memberListTableMakeActive']
                            : t['memberListTableMakeInactive'],
                        aclKey: 'CBS_MEMBERS_MEMBER',
                        action: 'UPDATE',
                        onClick: (node) => {
                          objState === 'VALIDATED'
                            ? router.push(`${ROUTES.CBS_MEMBER_ACTIVATION}/${node?.id}`)
                            : router.push(`${ROUTES.CBS_MEMBER_INACTIVATION}/${node?.id}`);
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
    [t, objState, memberFilterData?.members?.filterMapping?.serviceCenter]
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
      <Box position="sticky" top="0" zIndex={3}>
        <PageHeader heading={`Inactive Members - ${featureCode?.memberList}`} />
      </Box>
      <Table
        data={rowData}
        columns={columns}
        getRowId={(row) => String(row?.node?.id)}
        rowOnClick={(row) => {
          queryClient.invalidateQueries(['getMemberDetailsOverview']);
          if (objState !== 'VALIDATED' && objState !== 'DRAFT') {
            router.push(`${ROUTES.CBS_MEMBER_DETAILS}?id=${row?.node?.id}`);
          }
        }}
        isLoading={isFetching}
        noDataTitle={t['member']}
        pagination={{
          total: data?.members?.list?.data?.totalCount ?? 'Many',
          pageInfo: data?.members?.list?.data?.pageInfo,
        }}
        menu="MEMBERS"
        forms={memberForms}
      />
      <Modal
        open={openModal}
        onClose={onCloseModal}
        primaryButtonLabel="yes"
        secondaryButtonLabel="cancel"
        width="600px"
        primaryButtonHandler={deleteMember}
        secondaryButtonHandler={onCancel}
      >
        {t['memberDeleteConfirm']}
      </Modal>
    </>
  );
};

export default MemberInactiveListPage;
