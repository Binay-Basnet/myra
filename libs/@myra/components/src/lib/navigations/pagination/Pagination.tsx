import { useRouter } from 'next/router';
import { Box } from '@chakra-ui/react';
import { Table } from '@tanstack/react-table';
import qs from 'qs';

import { Select } from '@myra-ui/forms';
import { Text } from '@myra-ui/foundations';

import { DEFAULT_PAGE_SIZE as UTIL_PAGE_SIZE, quantityConverter } from '@coop/shared/utils';

import SmallPagination from '../small-pagination/SmallPagination';

/* eslint-disable-next-line */
export interface PaginationProps<T> {
  total: number | string;
  pageInfo?: {
    startCursor?: string | null;
    endCursor?: string | null;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  } | null;
  pageSizeOptions: number[];
  tablePagination?: boolean;
  table: Table<T>;
}

export const DEFAULT_PAGE_SIZE = UTIL_PAGE_SIZE;

export const Pagination = <T,>({
  table,
  pageInfo,
  total,
  pageSizeOptions,
  tablePagination,
}: PaginationProps<T>) => {
  const router = useRouter();
  const paginationParams = qs.parse(router?.query['paginate'] as string);

  const pageSize = Number(
    tablePagination
      ? table?.getState()?.pagination?.pageSize
      : paginationParams['first'] ?? paginationParams['last'] ?? DEFAULT_PAGE_SIZE
  );

  return (
    <Text as="div" variant="bodyRegular" color="gray.800">
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        bg="white"
        px="s16"
        h="60px"
        gap="s8"
      >
        <Box display="flex" alignItems="center" gap="s8">
          <span>View</span>
          <Box width="90px">
            <Select
              instanceId="pagination-select"
              menuPlacement="auto"
              isSearchable={false}
              value={{ label: quantityConverter(pageSize), value: pageSize }}
              onChange={(newValue) => {
                if (newValue && 'value' in newValue) {
                  if (tablePagination) {
                    table.setPageSize(Number(newValue?.value));
                  } else {
                    router.push({
                      query: {
                        ...router.query,
                        paginate: qs.stringify({
                          page: 1,
                          after: '',
                          first: newValue?.value,
                        }),
                      },
                    });
                  }
                }
              }}
              options={pageSizeOptions?.map((size) => ({
                label: quantityConverter(size),
                value: size,
              }))}
            />
          </Box>

          <span>items per page</span>
        </Box>

        {(pageInfo || tablePagination) && (
          <SmallPagination
            table={table}
            limit={pageSize}
            total={total}
            pageInfo={pageInfo}
            tablePagination={tablePagination}
          />
        )}
      </Box>
    </Text>
  );
};

export default Pagination;
