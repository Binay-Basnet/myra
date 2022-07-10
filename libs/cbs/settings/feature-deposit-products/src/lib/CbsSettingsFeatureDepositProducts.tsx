import { useMemo } from 'react';
import { useRouter } from 'next/router';
import { AddIcon } from '@chakra-ui/icons';
import format from 'date-fns/format';

import { PopoverComponent } from '@coop/myra/components';
import { ObjState, useGetMemberListQuery } from '@coop/shared/data-access';
import {
  Avatar,
  Box,
  Button,
  Column,
  DEFAULT_PAGE_SIZE,
  Table,
  Text,
} from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

/* eslint-disable-next-line */
export interface SettingsDepositProductsProps {}

export function SettingsDepositProducts(props: SettingsDepositProductsProps) {
  const router = useRouter();

  const { t } = useTranslation();

  const { data, isLoading } = useGetMemberListQuery(
    router.query['before']
      ? {
          objState: (router.query['objState'] ?? ObjState.Approved) as ObjState,
          pagination: {
            last: Number(router.query['last'] ?? DEFAULT_PAGE_SIZE),
            before: router.query['before'] as string,
          },
        }
      : {
          objState: (router.query['objState'] ?? ObjState.Approved) as ObjState,
          pagination: {
            first: Number(router.query['first'] ?? DEFAULT_PAGE_SIZE),
            after: (router.query['after'] ?? '') as string,
          },
        },
    {
      staleTime: 0,
    }
  );

  const rowData = useMemo(() => data?.members?.list?.edges ?? [], [data]);

  const popoverTitle = ['View Member Profile', 'Edit Member', 'Make Inactive'];

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        Header: 'memberID',
        accessor: 'node.id',
        maxWidth: 4,
        disableSortBy: false,
      },

      {
        Header: 'Name',
        accessor: 'node.name.local',
        width: '80%',

        Cell: ({ value, row }) => {
          return (
            <Box display="flex" alignItems="center" gap="2">
              <Avatar
                name="Dan Abrahmov"
                size="sm"
                src="https://bit.ly/dan-abramov"
              />
              <span>{value}</span>
            </Box>
          );
        },
      },

      {
        Header: 'Address',
        accessor: 'node.address.locality.local',
        maxWidth: 48,

        Cell: ({ value, row }) => {
          return (
            <span>
              {value}, {row?.original?.node?.address?.locality?.local}
            </span>
          );
        },
      },
      {
        Header: 'Phone No.',
        accessor: 'node.contact',
      },
      {
        Header: 'Date Joined',
        accessor: 'node.createdAt',
        Cell: ({ value }) => {
          return <span>{format(new Date(value), 'yyyy-mm-dd')}</span>;
        },
      },
      {
        Header: '',
        accessor: 'actions',
        Cell: () => <PopoverComponent title={popoverTitle} />,
        disableFilters: true,
      },
    ],
    []
  );

  return (
    <>
      <Box borderBottom="1px solid #E6E6E6" p="8px 16px">
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          h="100%"
        >
          <Text fontSize="r2" fontWeight="600" color="gray.800">
            {t['settingsDepositProducts']}
          </Text>
          <Button
            leftIcon={<AddIcon h="11px" />}
            onClick={() =>
              router.push('/settings/general/deposit-products/[action]')
            }
          >
            {t['settingsDepositProductNew']}
          </Button>
        </Box>
      </Box>

      <Table
        isLoading={isLoading}
        data={rowData}
        columns={columns}
        sort={true}
        disableSortAll={true}
        filter={true}
        pagination={{
          total: 1200,
          endCursor: data?.members?.list.pageInfo?.startCursor ?? '',
          startCursor: data?.members?.list.pageInfo?.endCursor ?? '',
        }}
      />
    </>
  );
}

export default SettingsDepositProducts;
