import { useMemo } from 'react';
import { useRouter } from 'next/router';
import { AddIcon } from '@chakra-ui/icons';
import format from 'date-fns/format';

import { ActionPopoverComponent } from '@coop/myra/components';
import {
  useGetDepositProductSettingsListQuery,
  useGetNewIdMutation,
} from '@coop/shared/data-access';
import {
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
  console.log(rowData);

  const popoverTitle = [
    {
      title: 'depositProductEdit',
      onClick: (id: string) =>
        router.push(`/settings/general/deposit-products/edit/${id}`),
    },
  ];

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        Header: t['depositProductCode'],
        accessor: 'node.productCode',
        maxWidth: 4,
        disableSortBy: false,
      },

      {
        Header: t['depositProductName'],
        accessor: 'node.productName',
        width: '80%',
      },
      {
        Header: t['depositNature'],
        accessor: 'node.nature',
        maxWidth: 48,

        Cell: ({ value, row }) => {
          return (
            <span>
              {value}, {row?.original?.node?.nature}
            </span>
          );
        },
      },
      {
        Header: t['depositInterest'],
        accessor: 'node.interest',
      },
      {
        Header: t['depositCreatedDate'],
        accessor: 'node.createdDate',
        Cell: ({ value }) => {
          return <span>{format(new Date(value), 'yyyy-mm-dd')}</span>;
        },
      },
      {
        Header: '',
        accessor: 'actions',
        disableFilters: true,
        Cell: ({ value, row }) => (
          <ActionPopoverComponent
            items={popoverTitle}
            id={row?.original?.node?.id}
          />
        ),
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
          <Button
            leftIcon={<AddIcon h="11px" />}
            onClick={() =>
              newId
                .mutateAsync({})
                .then((res) =>
                  router.push(
                    `/settings/general/deposit-products/add/${res?.newId}`
                  )
                )
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

export default SettingsDepositProducts;
