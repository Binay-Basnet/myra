import { useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';

import { Avatar, Box } from '@myra-ui';
import { Column, Table, TablePopover } from '@myra-ui/table';

import { Filter_Mode, useGetShareBalanceListQuery } from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import { TableListPageHeader } from '@coop/myra/components';
import { amountConverter, featureCode, getRouterQuery, useTranslation } from '@coop/shared/utils';

export const ShareBalanceTable = () => {
  const router = useRouter();
  const searchTerm = router?.query['search'] as string;

  const { data, isFetching, refetch } = useGetShareBalanceListQuery({
    pagination: getRouterQuery({ type: ['PAGINATION'] }),
    filter: {
      memberName: searchTerm,
      memberCode: searchTerm,
      filterMode: Filter_Mode.Or,
    },
  });

  const { t } = useTranslation();

  useEffect(() => {
    refetch();
  }, [router]);

  const rowData = useMemo(() => data?.share?.balance?.edges ?? [], [data]);

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        header: t['shareTableMemberId'],
        accessorFn: (row) => row?.node?.member?.code,
      },

      {
        header: t['shareTableName'],
        accessorFn: (row) => row?.node.member.name?.local,
        cell: (props) => (
          <Box display="flex" alignItems="center" gap="2">
            <Avatar
              name={props.getValue() as string}
              size="sm"
              src={props?.row?.original?.node?.member?.profilePicUrl ?? ' '}
            />
            <span>{props.getValue() as string}</span>
          </Box>
        ),
        meta: {
          width: '25%',
        },
      },

      {
        header: t['shareTableShareCount'],
        accessorFn: (row) => row?.node.count,
      },
      {
        header: t['shareTableShareAmount'],
        accessorFn: (row) => amountConverter(row?.node.amount),
        meta: { isNumeric: true },
        // cell: (props) => <span>{Number(props.getValue()).toLocaleString('en-IN')}</span>,
      },

      {
        id: '_actions',
        header: '',
        cell: (props) => (
          <TablePopover
            node={props?.row?.original.node}
            items={[
              {
                title: t['shareRegisterTableViewMemberProfile'],
                aclKey: 'CBS_MEMBERS_MEMBER_DETAIL',
                action: 'VIEW',
                onClick: (node) => {
                  router.push(`${ROUTES.CBS_MEMBER_DETAILS}?id=${node?.member?.id}&tab=share`);
                },
              },
            ]}
          />
        ),
      },
    ],
    [router.locale]
  );

  return (
    <>
      <Box position="sticky" top={0} zIndex={3}>
        <TableListPageHeader
          heading={`${t['shareBalanceTable']} - ${featureCode?.shareBalanceList}`}
        />
      </Box>
      <Table
        isLoading={isFetching}
        data={rowData ?? []}
        columns={columns}
        rowOnClick={(row) =>
          router.push(`${ROUTES.CBS_MEMBER_DETAILS}?id=${row?.node?.member?.id}&tab=share`)
        }
        pagination={{
          total: data?.share?.balance?.totalCount as number,
          pageInfo: data?.share?.balance?.pageInfo,
        }}
        menu="SHARE"
      />
    </>
  );
};
