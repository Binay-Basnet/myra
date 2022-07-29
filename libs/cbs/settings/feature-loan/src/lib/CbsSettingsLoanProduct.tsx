import { useMemo } from 'react';
import { useRouter } from 'next/router';
import { AddIcon } from '@chakra-ui/icons';

import { PopoverComponent } from '@coop/myra/components';
// import format from 'date-fns/format';
// import { ActionPopoverComponent } from '@coop/myra/components';
import {
  useGetDepositProductSettingsListQuery,
  useGetNewIdMutation,
} from '@coop/shared/data-access';
import { Column, Table } from '@coop/shared/table';
import { Box, Button, DEFAULT_PAGE_SIZE, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

/* eslint-disable-next-line */
export interface SettingsLoanProductProps {}

const popoverTitle = [
  {
    title: 'neoClientDetailOverviewEdit',
  },
];

export function SettingsLoanProduct(props: SettingsLoanProductProps) {
  const router = useRouter();

  const { t } = useTranslation();

  const newId = useGetNewIdMutation();

  const { data, isLoading } = useGetDepositProductSettingsListQuery(
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

  const rowData = useMemo(
    () => data?.settings?.general?.depositProduct?.list?.edges ?? [],
    [data]
  );

  // const popoverTitle = [
  //   {
  //     title: 'depositProductEdit',
  //     onClick: (id: string) =>
  //       router.push(`/settings/general/deposit-products/edit/${id}`),
  //   },
  // ];

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        header: t['loanProductsProductCode'],
        accessorFn: (row) => row?.node.productCode,
        meta: {
          width: 4,
        },
      },

      {
        header: t['loanProductsProductName'],
        accessorFn: (row) => row?.node.productName,
        meta: {
          width: '80%',
        },
        cell: (props) => {
          return (
            <Box
              display="flex"
              alignItems="center"
              cursor={'pointer'}
              gap="s12"
              onClick={() => {
                router.push(
                  '/settings/general/loan-products/detail/12123/overview'
                );
              }}
            >
              <Text
                fontSize="s3"
                textTransform="capitalize"
                textOverflow="ellipsis"
                overflow="hidden"
              >
                {props.getValue()}
              </Text>
            </Box>
          );
        },
      },
      {
        header: t['loanProductsProductType'],
        accessorFn: (row) => row?.node.nature,
        meta: {
          width: '20%',
        },

        cell: (row) => {
          return <span>Nature</span>;
        },
      },

      {
        header: t['loanProductsProductSubType'],
        accessorFn: (row) => row?.node.createdAt,
      },
      {
        header: t['loanProductsInterest'],
        accessorFn: (row) => row?.node.interest,
      },
      {
        header: t['loanProductsCreatedDate'],
        accessorFn: (row) => row?.node.createdDate,
        cell: (value) => {
          return <span>'2020/01/20' </span>;
          // return <span>{format(new Date(value), 'yyyy-mm-dd')}</span>;
        },
      },
      {
        id: '_actions',
        header: '',
        cell: (row) => <PopoverComponent items={popoverTitle} />,
        meta: {
          width: '60px',
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
            {t['loanProductsLoanProducts']}
          </Text>
          <Button
            leftIcon={<AddIcon h="11px" />}
            onClick={() =>
              newId
                .mutateAsync({})
                .then((res) =>
                  router.push(
                    `/settings/general/loan-products/add/${res?.newId}`
                  )
                )
            }
          >
            {t['loanProductsNewLoanProduct']}
          </Button>
        </Box>
      </Box>

      <Table
        isLoading={isLoading}
        data={rowData}
        columns={columns}
        pagination={{
          total: 1200,
          endCursor:
            data?.settings?.general?.depositProduct?.list?.pageInfo
              ?.startCursor ?? '',
          startCursor:
            data?.settings?.general?.depositProduct?.list?.pageInfo
              ?.endCursor ?? '',
        }}
      />
    </>
  );
}

export default SettingsLoanProduct;
