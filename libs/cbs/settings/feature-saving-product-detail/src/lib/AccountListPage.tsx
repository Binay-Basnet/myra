import { useMemo } from 'react';
import { IoAdd } from 'react-icons/io5';
import { useRouter } from 'next/router';

import { Box, Button, Column, Icon, Table, Text } from '@myra-ui';

import { Id_Type, useGetNewIdMutation, useGetSavingsAccountListQuery } from '@coop/cbs/data-access';
import { RedirectButton, ROUTES } from '@coop/cbs/utils';
import { getRouterQuery } from '@coop/shared/utils';

import { SideBar } from '../components';

export const AccountListPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const newId = useGetNewIdMutation({});

  const { data, isLoading } = useGetSavingsAccountListQuery({
    paginate: {
      ...getRouterQuery({ type: ['PAGINATION'], query: router.query }),
      order: null,
    },
    filter: {
      productID: id as string,
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
        accessorFn: (row) => row?.node?.balance,
      },
      {
        header: 'Open Date',
        accessorFn: (row) => row?.node?.accountOpenedDate,
      },
      //   {
      //     id: '_actions',
      //     header: '',
      //     cell: (props) => (
      //       <ActionPopoverComponent items={popoverTitle} id={props?.row?.original?.node?.id} />
      //     ),
      //     meta: {
      //       width: '50px',
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
            Account List
          </Text>
          <Button
            leftIcon={
              <Icon
                as={IoAdd}
                size="md"
                onClick={() =>
                  newId
                    .mutateAsync({ idType: Id_Type.Account })
                    .then((res) => router.push(`/savings/account-open/add//${res?.newId}`))
                }
              />
            }
          >
            Add Account
          </Button>
        </Box>
      </Box>
      <Box bg="background.500" ml="320px" p="s16">
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
