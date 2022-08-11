import { useMemo } from 'react';
import { useRouter } from 'next/router';
import { AddIcon } from '@chakra-ui/icons';

import {
  Id_Type,
  useGetLoanProductListQuery,
  useGetNewIdMutation,
} from '@coop/cbs/data-access';
import { ActionPopoverComponent } from '@coop/myra/components';
import { Column, Table } from '@coop/shared/table';
import { Box, Button, DEFAULT_PAGE_SIZE, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

export function SettingsLoanProduct() {
  const router = useRouter();

  const { t } = useTranslation();

  const newId = useGetNewIdMutation();

  const { data, isLoading } = useGetLoanProductListQuery(
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
    () => data?.settings?.general?.loanProducts?.list?.edges ?? [],
    [data]
  );

  const popoverTitle = [
    {
      title: 'edit',
      onClick: (id: string) =>
        router.push(`/settings/general/loan-products/edit/${id}`),
    },
  ];

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        header: t['loanProductsProductCode'],
        accessorFn: (row) => row?.node.productCodeString,
      },

      {
        header: t['loanProductsProductName'],
        accessorFn: (row) => row?.node.productName,
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
        accessorFn: (row) => row?.node.productType,
      },
      {
        header: t['loanProductsProductSubType'],
        accessorFn: (row) => row?.node.productSubType,
      },
      {
        header: t['loanProductsInterest'],
        accessorFn: (row) => row?.node.interest?.defaultRate,
        cell: (props) => {
          return (
            <span>{props?.row?.original?.node?.interest?.defaultRate} %</span>
          );
        },
      },
      {
        header: t['loanProductsCreatedDate'],
        accessorFn: (row) => row?.node.createdDate,
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
    [t, router, popoverTitle]
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
                .mutateAsync({ idType: Id_Type.Loanproduct })
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
          total:
            data?.settings?.general?.loanProducts?.list?.totalCount ?? 'Many',
          endCursor:
            data?.settings?.general?.loanProducts?.list?.pageInfo?.endCursor ??
            '',
          startCursor:
            data?.settings?.general?.loanProducts?.list?.pageInfo
              ?.startCursor ?? '',
        }}
      />
    </>
  );
}

export default SettingsLoanProduct;
