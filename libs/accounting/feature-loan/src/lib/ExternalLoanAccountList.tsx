import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { AccountingPageHeader } from '@coop/accounting/ui-components';
import { ObjState, useGetMemberListQuery } from '@coop/cbs/data-access';
import { Column, Table } from '@coop/shared/table';
import { Avatar, Box, TablePopover, Text } from '@coop/shared/ui';
import { getRouterQuery, useTranslation } from '@coop/shared/utils';

/* eslint-disable-next-line */
export interface ExternalLoanAccountListProps {}

export const ExternalLoanAccountList = () => {
  const { t } = useTranslation();

  const router = useRouter();

  const { data, isLoading } = useGetMemberListQuery({
    pagination: getRouterQuery({ type: ['PAGINATION'] }),
    filter: {
      objState: (router.query['objState'] ?? ObjState.Approved) as ObjState,
    },
  });

  const rowData = useMemo(() => data?.members?.list?.edges ?? [], [data]);

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        accessorFn: (row) => row?.node?.name?.local,
        header: 'Name',
        cell: (props) => (
          <Box display="flex" alignItems="center" gap="s12">
            <Avatar name="Dan Abrahmov" size="sm" src="https://bit.ly/dan-abramov" />
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
          width: '60%',
        },
      },
      {
        header: 'Address',
        accessorFn: (row) => row?.node?.code,
        meta: {
          width: '30%',
        },
      },
      {
        header: 'Created Date',
        accessorFn: (row) => row?.node?.contact,
        meta: {
          width: '30%',
        },
      },
      {
        id: '_actions',
        header: '',
        cell: (props) =>
          props?.row?.original?.node && (
            <TablePopover
              node={props?.row?.original?.node}
              items={[
                {
                  title: t['transDetailViewDetail'],
                },
              ]}
            />
          ),
        meta: {
          width: '50px',
        },
      },
    ],
    [t]
  );
  return (
    <>
      <AccountingPageHeader
        heading="External Loan Accounts"
        buttonLabel="New Cash Transfer"
        buttonHandler={() => router.push('/accounting/loan/external-loan/67/add')}
      />

      <Table data={rowData} isLoading={isLoading} columns={columns} />
    </>
  );
};
