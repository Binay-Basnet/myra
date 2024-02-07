import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { useDisclosure } from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';
import qs from 'qs';

import { PageHeader, TablePopover, toast } from '@myra-ui';
import { AvatarCell, Column, Table } from '@myra-ui/table';

import {
  useAppSelector,
  useGetGeneralMemberSettingsDataQuery,
  useGetMemberFilterMappingQuery,
  useGetMemberListExportQuery,
  useGetMemberListQuery,
} from '@coop/cbs/data-access';
import { formatTableAddress, localizedDate, ROUTES } from '@coop/cbs/utils';
import { MemberActivationModal, MemberDormancyEditModal } from '@coop/members/dormancy';
import {
  featureCode,
  getFilter,
  getFilterQuery,
  getPaginationQuery,
  useTranslation,
} from '@coop/shared/utils';

import { forms, Page } from './MemberLayout';
import { MemberDeleteModal } from '../components/MemberDeleteModal';
import { MEMBER_TAB_ITEMS } from '../constants/MEMBER_TAB_ITEMS';

const memberTypeSlug = {
  INDIVIDUAL: 'individual',
  INSTITUTION: 'institution',
  COOPERATIVE: 'coop',
  COOPERATIVE_UNION: 'coop_union',
};

export const MemberListPage = () => {
  const [triggerExport, setTriggerExport] = useState(false);
  const [isExportPDF, setIsExportPDF] = useState(false);
  const [isExportExcel, setIsExportExcel] = useState(false);
  const { t } = useTranslation();
  const [memberId, setMemberId] = useState<string | null>(null);
  const { isOpen, onClose, onToggle } = useDisclosure();
  const {
    isOpen: isActivationModalOpen,
    onClose: onActivationModalClose,
    onToggle: onActivationModalToggle,
  } = useDisclosure();
  const {
    isOpen: isDormancyEditModalOpen,
    onClose: onDormancyEditModalClose,
    onToggle: onDormancyEditModalToggle,
  } = useDisclosure();

  const router = useRouter();
  const queryClient = useQueryClient();
  const objState = getFilter('objState') || 'APPROVED';

  const filterParams = {
    filter: getFilterQuery({ objState: { value: 'APPROVED', compare: '=' } }),
  };

  const sortParams = router.query['sort'] as string;

  const { data, isFetching } = useGetMemberListQuery({
    ...filterParams,
    pagination: sortParams
      ? getPaginationQuery()
      : {
          ...getPaginationQuery(),
          order: {
            column: objState === 'DRAFT' || objState === 'VALIDATED' ? 'id' : 'activeDate',
            arrange: 'DESC',
          },
        },
  });

  const { data: memberFilterData } = useGetMemberFilterMappingQuery();
  const { data: memberTypeData } = useGetGeneralMemberSettingsDataQuery();

  const memberTypes =
    memberTypeData?.settings?.general?.KYM?.general?.generalMember?.record?.memberType;
  const isMemberCodeSetup =
    memberTypeData?.settings?.general?.KYM?.general?.generalMember?.record?.isCodeSetup;

  const memberForms = useMemo(
    () =>
      Object.keys(memberTypes || {})
        ?.map((memberType) => {
          if (memberType && memberTypes?.[memberType as keyof typeof memberTypes]) {
            return forms[memberType];
          }
          return false;
        })
        ?.filter(Boolean) as Page[],
    [memberTypes]
  );

  const alteredMemberForms = useMemo(
    () =>
      isMemberCodeSetup
        ? memberForms
        : memberForms?.map((item) => ({ ...item, route: ROUTES.CBS_NO_MEMBER_CODE })),
    [isMemberCodeSetup, memberForms]
  );

  const rowData = useMemo(() => data?.members?.list?.data?.edges ?? [], [data]);
  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        id: objState === 'DRAFT' || objState === 'VALIDATED' ? 'createdAt' : 'activeDate',
        header:
          objState === 'DRAFT' || objState === 'VALIDATED'
            ? t['memberListDateJoined']
            : t['memberListActiveDate'],
        accessorFn: (row) =>
          objState === 'DRAFT' || objState === 'VALIDATED'
            ? localizedDate(row?.node?.dateJoined)
            : localizedDate(row?.node?.activeDate),
        cell: (row) =>
          objState === 'DRAFT' || objState === 'VALIDATED'
            ? localizedDate(row?.cell?.row?.original?.node?.dateJoined)
            : localizedDate(row?.cell?.row?.original?.node?.activeDate),
        filterFn: 'dateTime',
        enableColumnFilter: true,
        meta: {
          width: '100px',
        },
        enableSorting: !(objState === 'DRAFT' || objState === 'VALIDATED'),
      },
      {
        id: 'id',
        header:
          objState === 'DRAFT' ? t['memberListTableMemberId'] : t['memberListTableMemberCode'],

        accessorFn: (row) => (objState === 'DRAFT' ? row?.node?.id : row?.node?.code),
        enableSorting: true,
      },
      {
        id: 'name',
        accessorKey: 'node.name.local',
        header: t['memberListTableName'],
        cell: (props) => (
          <AvatarCell
            name={props.getValue() as string}
            src={props.row.original?.node?.profilePicUrl}
          />
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
        header: t['memberListTableServiceCenter'],
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
                objState === 'DORMANT'
                  ? [
                      {
                        title: t['memberListEditDormancy'],
                        onClick: (node) => {
                          setMemberId(node?.id);
                          onDormancyEditModalToggle();
                        },
                      },
                      {
                        title: t['memberListTableMakeActive'],
                        onClick: (node) => {
                          setMemberId(node?.id);
                          onActivationModalToggle();
                        },
                      },
                    ]
                  : objState === 'DRAFT'
                  ? [
                      {
                        title: t['memberListTableEditMember'],
                        aclKey: 'CBS_MEMBERS_KYM_UPDATE',
                        action: 'UPDATE',
                        onClick: (node) => {
                          router.push(
                            `/cbs/members/${memberTypeSlug[node?.type || 'INDIVIDUAL']}/edit?id=${
                              node?.id
                            }`
                          );
                        },
                      },
                      {
                        title: t['memberDeleteMember'],
                        onClick: (node) => {
                          onToggle();
                          setMemberId(node?.id);
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
                            `/cbs/members/${memberTypeSlug[node?.type || 'INDIVIDUAL']}/edit?id=${
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
                            ? router.push(`${ROUTES.CBS_MEMBER_ACTIVATION}?id=${node?.id}`)
                            : router.push(`${ROUTES.CBS_MEMBER_INACTIVATION}?id={node?.id}`);
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
                            `/cbs/members/${memberTypeSlug[node?.type || 'INDIVIDUAL']}/edit?id=${
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
                            ? router.push(`${ROUTES.CBS_MEMBER_ACTIVATION}?id=${node?.id}`)
                            : router.push(`${ROUTES.CBS_MEMBER_INACTIVATION}?id=${node?.id}`);
                        },
                      },
                      {
                        title: t['memberListTableMakeDormant'],
                        onClick: (node) =>
                          router.push(`${ROUTES.CBS_MEMBER_DORMANCY}?id=${node?.id}`),
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
    [objState, t, memberFilterData?.members?.filterMapping?.serviceCenter, router, onToggle]
  );

  useGetMemberListExportQuery(
    { ...filterParams, pagination: { after: '', first: -1 }, isExportExcel, isExportPDF },
    {
      enabled: triggerExport,
      staleTime: 0,
      onSettled: () => setTriggerExport(false),
      onSuccess: (res) => {
        setTriggerExport(false);
        toast({
          id: 'export',
          type: 'success',
          message: res?.members?.list?.success?.message as string,
        });
      },
    }
  );

  const user = useAppSelector((state) => state.auth?.user);

  useEffect(() => {
    const queryString = qs.stringify(
      {
        serviceCenter: {
          value: user?.currentBranch?.id,
          compare: '=',
        },
      },
      { allowDots: true, arrayFormat: 'brackets', encode: false }
    );

    router.push(
      {
        query: {
          ...router.query,
          filter: queryString,
        },
      },
      undefined,
      { shallow: true }
    );
  }, []);

  return (
    <>
      <PageHeader
        showTabsInFilter
        heading={`${t['activeMembers']} - ${featureCode?.memberList}`}
        tabItems={MEMBER_TAB_ITEMS}
      />

      <Table
        data={rowData}
        columns={columns}
        getRowId={(row) => String(row?.node?.id)}
        rowOnClick={(row) => {
          queryClient.invalidateQueries(['getMemberDetailsOverview']);
          if (objState !== 'VALIDATED' && objState !== 'DRAFT') {
            router.push(`${ROUTES.CBS_MEMBER_DETAILS}?id=${row?.['node']?.id}`);
          }
        }}
        isLoading={isFetching}
        noDataTitle={t['member']}
        pagination={{
          total: data?.members?.list?.data?.totalCount ?? 'Many',
          pageInfo: data?.members?.list?.data?.pageInfo,
        }}
        menu="MEMBERS"
        forms={alteredMemberForms}
        canExport
        handleExportPDF={() => {
          setTriggerExport(true);
          setIsExportPDF(true);
          setIsExportExcel(false);
        }}
        handleExportCSV={() => {
          setTriggerExport(true);
          setIs(false);
          setIsExportExcel(true);
        }}
      />
      <MemberDeleteModal isOpen={isOpen} onClose={onClose} memberId={memberId} />

      <MemberActivationModal
        open={isActivationModalOpen}
        onClose={onActivationModalClose}
        memberId={memberId as string}
      />

      <MemberDormancyEditModal
        open={isDormancyEditModalOpen}
        onClose={onDormancyEditModalClose}
        memberId={memberId as string}
      />
    </>
  );
};

export default MemberListPage;
