import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { useGetAccountTableListQuery } from '@coop/cbs/data-access';
import { ActionPopoverComponent } from '@coop/myra/components';
import { Column, Table } from '@coop/shared/table';
import { Box, DEFAULT_PAGE_SIZE, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

export function CBSAccountList() {
  const router = useRouter();

  const { t } = useTranslation();

  const { data, isLoading } = useGetAccountTableListQuery(
    router.query['before']
      ? {
          paginate: {
            last: Number(router.query['last'] ?? DEFAULT_PAGE_SIZE),
            before: router.query['before'] as string,
          },
        }
      : {
          paginate: {
            first: Number(router.query['first'] ?? DEFAULT_PAGE_SIZE),
            after: (router.query['after'] ?? '') as string,
          },
        },
    {
      staleTime: 0,
    }
  );

  const rowData = useMemo(() => data?.account?.list?.edges ?? [], [data]);

  const popoverTitle = [
    {
      title: 'depositProductEdit',
      onClick: (id: string) => router.push(`/accounts/account-open/edit/${id}`),
    },
  ];

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        header: 'Member Id',
        accessorFn: (row) => row?.node?.id,
      },

      {
        header: t['depositProductName'],
        accessorFn: (row) => row?.node?.member?.name?.local,
      },
      {
        header: t['depositNature'],
        accessorFn: (row) => row?.node?.product?.productName,
        cell: () => {
          return (
            <span>
              {/* {props?.row?.original?.node?.nature ===
              NatureOfDepositProduct.Mandatory
                ? t['depositProductMandatory']
                : props?.row?.original?.node?.nature ===
                  NatureOfDepositProduct.RecurringSaving
                ? t['depositProductRecurringSaving']
                : props?.row?.original?.node?.nature ===
                  NatureOfDepositProduct.TermSavingOrFd
                ? t['depositProductTermSaving']
                : props?.row?.original?.node?.nature ===
                  NatureOfDepositProduct.VoluntaryOrOptional
                ? t['depositProductVoluntaryOptional']
                : ' '} */}
            </span>
          );
        },
      },
      {
        header: t['depositInterest'],
        accessorFn: (row) => row?.node?.product?.productCode,
        // cell: (props) => {
        //   return (
        //     <span>{props?.row?.original?.node?.depositFrequencyMonthly} %</span>
        //   );
        // },
      },
      {
        header: t['depositCreatedDate'],
        accessorFn: (row) => row?.node?.createdAt,
      },
      {
        id: '_actions',
        header: '',
        cell: (props) => (
          <ActionPopoverComponent
            items={popoverTitle}
            id={props?.row?.original?.node?.id}
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
        </Box>
      </Box>

      <Table
        isLoading={isLoading}
        data={rowData}
        columns={columns}
        pagination={{
          total: data?.account?.list?.totalCount ?? 'Many',
          endCursor: data?.account?.list?.pageInfo?.startCursor ?? '',
          startCursor: data?.account?.list?.pageInfo?.endCursor ?? '',
        }}
      />
    </>
  );
}

export default CBSAccountList;
