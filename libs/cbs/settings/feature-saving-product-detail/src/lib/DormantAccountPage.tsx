import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { Box, Column, Table, Text } from '@myra-ui';

import { ObjState, useGetSavingsAccountListQuery } from '@coop/cbs/data-access';
import { localizedDate, RedirectButton, ROUTES } from '@coop/cbs/utils';
import { amountConverter, getPaginationQuery } from '@coop/shared/utils';

import { SideBar } from '../components';

export const DormantAccountListPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data, isLoading } = useGetSavingsAccountListQuery({
    paginate: {
      ...getPaginationQuery(),

      order: null,
    },
    filter: {
      query: id as string,
      orConditions: [
        {
          andConditions: [
            {
              column: 'objState',
              comparator: 'EqualTo',
              value: ObjState.Dormant,
            },
          ],
        },
      ],
    },
  });
  const rowData = useMemo(
    () => data?.settings?.general?.depositProduct?.getAccountlist?.edges ?? [],
    [data]
  );

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        header: 'Account No',
        accessorFn: (row) => row?.node?.id,
        cell: (props) => (
          <RedirectButton
            link={`${ROUTES.CBS_ACCOUNT_SAVING_DETAILS}?id=${props?.row?.original?.node?.id}`}
            label={props?.row?.original?.node?.id as string}
          />
        ),
      },

      {
        header: 'Account Name',
        accessorFn: (row) => row?.node?.accountName,
      },
      {
        header: 'Member',
        accessorFn: (row) => row?.node?.member?.name?.local,
      },
      {
        header: 'Balance',
        accessorFn: (row) => amountConverter(row?.node?.balance ?? 0),
      },
      {
        header: 'Open Date',
        accessorFn: (row) => localizedDate(row?.node?.accountOpenedDate),
      },
      //   {
      //     id: '_actions',
      //     header: '',
      //     cell: (props) => (
      //       <ActionPopoverComponent items={popoverTitle} id={props?.row?.original?.node?.id} />
      //     ),
      //     meta: {
      //       width: '3.125rem',
      //     },
      //   },
    ],
    [router]
  );

  return (
    <>
      <Box
        bg="gray.0"
        w="320px"
        position="fixed"
        h="calc(100vh - 110px)"
        borderRight="1px"
        borderRightColor="border.layout"
      >
        <SideBar />
      </Box>
      <Box bg="background.500" ml="320px" p="s16" display="flex" flexDir="column" gap="s16">
        <Box display="flex" justifyContent="space-between" w="100%">
          <Text fontWeight="SemiBold" fontSize="r3" color="gray.800" lineHeight="150%">
            Dormant Account List
          </Text>
          {/* <Button
            leftIcon={<Icon as={IoAdd} size="md" />}
            onClick={() => router.push(`${ROUTES.CBS_ACCOUNT_OPEN_ADD}`)}
          >
            Add Account
          </Button> */}
        </Box>
      </Box>
      <Box bg="background.500" ml="320px" p="s16" minH="100vh">
        <Table
          isLoading={isLoading}
          data={rowData}
          columns={columns}
          pagination={{
            total: data?.settings?.general?.depositProduct?.getAccountlist?.totalCount ?? 'Many',
            pageInfo: data?.settings?.general?.depositProduct?.getAccountlist?.pageInfo,
          }}
        />
      </Box>
    </>
  );
};
