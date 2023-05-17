import { Dispatch, SetStateAction, useMemo } from 'react';
import { useRouter } from 'next/router';

import { Avatar, Box, FormSection, Text } from '@myra-ui';
import { Column, Table } from '@myra-ui/table';

import { ObjState, useAppSelector, useGetSavingsAccountListQuery } from '@coop/cbs/data-access';
import { localizedDate, localizedText } from '@coop/cbs/utils';
import { getPaginationQuery } from '@coop/shared/utils';

interface IBulkTransferAccountTableProps {
  productName: string;
  productId: string;
  setSelectedAccounts: Dispatch<SetStateAction<string[]>>;
}

export const BulkTransferAccountTable = ({
  productName,
  productId,
  setSelectedAccounts,
}: IBulkTransferAccountTableProps) => {
  const router = useRouter();

  const branchId = useAppSelector((state) => state?.auth?.user?.currentBranch?.id);

  const search = router.query['search'] || '';

  const { data: accountListData, isLoading } = useGetSavingsAccountListQuery(
    {
      paginate: {
        ...getPaginationQuery(),

        order: null,
      },
      filter: {
        query: search as string,
        orConditions: [
          {
            andConditions: [
              {
                column: 'objState',
                comparator: 'EqualTo',
                value: ObjState.Active,
              },
              {
                column: 'productId',
                comparator: 'EqualTo',
                value: productId,
              },
              {
                column: 'branch',
                comparator: 'EqualTo',
                value: branchId,
              },
            ],
          },
        ],
      },
    },
    {
      enabled: !!productId && productId !== 'undefined',
    }
  );

  const accountList = useMemo(
    () => accountListData?.settings?.general?.depositProduct?.getAccountlist?.edges ?? [],
    [accountListData]
  );

  const columns = useMemo<Column<typeof accountList[0]>[]>(
    () => [
      {
        header: 'Account Open Date',
        accessorFn: (row) => localizedDate(row?.node?.accountOpenedDate),
      },
      {
        header: 'Account ID',
        accessorFn: (row) => row?.node?.id,
      },
      {
        header: 'Account Name',
        accessorFn: (row) => row?.node?.accountName,
      },
      {
        header: 'Member Name',
        accessorFn: (row) => row?.node?.member?.name?.local,
        cell: (props) => (
          <Box display="flex" alignItems="center" gap="s12">
            <Avatar
              name={props.getValue() as string}
              size="sm"
              src={props?.row?.original?.node?.member?.profilePicUrl || ''}
            />
            <Text
              fontSize="s3"
              textTransform="capitalize"
              textOverflow="ellipsis"
              overflow="hidden"
            >
              {localizedText(props?.row?.original?.node?.member?.name)}
            </Text>
          </Box>
        ),
      },
      {
        header: 'Member ID',
        accessorFn: (row) => row?.node?.member?.code,
      },
    ],
    []
  );

  return (
    <FormSection templateColumns={1} divider={false}>
      <Box display="flex" flexDirection="column" gap="s4">
        <Text fontSize="r1" fontWeight={500} color="gary.800">
          All accounts in {productName}
        </Text>
        <Text fontSize="s2" fontWeight={400} color="gary.700">
          All accounts are selected by default. Please uncheck any accounts that you do not wish to
          transfer.
        </Text>
      </Box>

      <Table
        isStatic
        allowSelection
        allowSearch
        data={accountList}
        getRowId={(row) => row?.node?.id as string}
        columns={columns}
        isLoading={isLoading}
        pagination={{
          total:
            accountListData?.settings?.general?.depositProduct?.getAccountlist?.totalCount ??
            'Many',
          pageInfo: accountListData?.settings?.general?.depositProduct?.getAccountlist?.pageInfo,
        }}
        onRowSelect={(selected) => setSelectedAccounts(selected)}
      />
    </FormSection>
  );
};
