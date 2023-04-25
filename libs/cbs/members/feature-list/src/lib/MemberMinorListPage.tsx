import React, { useMemo } from 'react';
import { useRouter } from 'next/router';

import { Box, PageHeader } from '@myra-ui';
import { Column, Table } from '@myra-ui/table';

import { useGetGeneralMemberSettingsDataQuery, useGetMinorListQuery } from '@coop/cbs/data-access';
import { featureCode, getPaginationQuery, useTranslation } from '@coop/shared/utils';

import { forms, Page } from './MemberLayout';

export const MemberMinorListPage = () => {
  const { t } = useTranslation();

  const router = useRouter();
  const searchTerm = router?.query['search'] as string;
  const objState = router?.query['objState'];

  const { data: memberTypeData } = useGetGeneralMemberSettingsDataQuery();
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

  const { data, isFetching, refetch } = useGetMinorListQuery(
    {
      pagination: getPaginationQuery(),
      filter: {
        id: searchTerm,
      },
    },
    {
      staleTime: 0,
      enabled: searchTerm !== 'undefined',
    }
  );

  React.useEffect(() => {
    refetch();
  }, []);

  const rowData = useMemo(() => data?.members?.listMinor?.edges ?? [], [data]);

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        header: 'Member ID',
        accessorFn: (row) => row?.node?.memberId,
      },
      {
        header: 'Minor Name',
        accessorFn: (row) => row?.node?.minorName,
      },
      {
        header: 'Member Name',
        accessorFn: (row) => row?.node?.memberName?.local,
        cell: (row) => row?.cell?.row?.original?.node?.memberName?.local,
      },
      {
        header: 'Date of birth',
        accessorFn: (row) => row?.node?.dateOfBirth?.local,
      },
      {
        header: 'Relation',
        accessorFn: (row) => row?.node?.relationshipName,
      },
      {
        header: 'Branch',
        accessorFn: (row) => row?.node?.serviceCentreName,
      },
    ],
    [t, objState]
  );

  return (
    <>
      <Box position="sticky" top="0" zIndex={3}>
        <PageHeader heading={`Minor Members - ${featureCode?.memberList}`} />
      </Box>
      <Table
        data={rowData}
        columns={columns}
        getRowId={(row) => String(row?.node?.id)}
        isLoading={isFetching}
        noDataTitle={t['member']}
        pagination={{
          total: data?.members?.listMinor?.totalCount ?? 'Many',
          pageInfo: data?.members?.listMinor?.pageInfo,
        }}
        menu="MEMBERS"
        forms={memberForms}
      />
    </>
  );
};

export default MemberMinorListPage;
