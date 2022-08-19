import { useRouter } from 'next/router';
import { Box } from '@chakra-ui/react';
import qs from 'qs';

import { DEFAULT_PAGE_SIZE as UTIL_PAGE_SIZE } from '@coop/shared/utils';

import Select from '../select/Select';
import SmallPagination from '../small-pagination/SmallPagination';
import TextFields from '../text-fields/TextFields';

/* eslint-disable-next-line */
export interface PaginationProps {
  total: number | string;
  pageInfo?: {
    startCursor?: string | null;
    endCursor?: string | null;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  } | null;
  pageSizeOptions: number[];
}

export const DEFAULT_PAGE_SIZE = UTIL_PAGE_SIZE;

export function Pagination({
  pageInfo,
  total,
  pageSizeOptions,
}: PaginationProps) {
  const router = useRouter();
  const paginationParams = qs.parse(router.query['paginate'] as string);

  const pageSize = Number(
    paginationParams['first'] ?? paginationParams['last'] ?? DEFAULT_PAGE_SIZE
  );

  return (
    <TextFields as="div" variant="bodyRegular" color="gray.800">
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
              menuPlacement="top"
              isSearchable={false}
              value={{ label: pageSize, value: pageSize }}
              onChange={(newValue: { value?: string | number }) => {
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
              }}
              // onChange={(newValue: { value?: string | number }) => {
              //   // if (router.query['after']) {
              //   //   router.push({
              //   //     query: {
              //   //       ...router.query,
              //   //       first: newValue?.value,
              //   //     },
              //   //   });
              //   // } else if (router.query['before']) {
              //   //   router.push({
              //   //     query: {
              //   //       ...router.query,
              //   //       last: newValue?.value,
              //   //     },
              //   //   });
              //   // } else {
              //   //   router.push({
              //   //     query: {
              //   //       ...router.query,
              //   //       first: newValue?.value,
              //   //       after: startCursor,
              //   //     },
              //   //   });
              //   }
              // }}
              options={pageSizeOptions?.map((size) => ({
                label: String(size),
                value: size,
              }))}
            />
          </Box>

          <span>items per page</span>
        </Box>

        {pageInfo && (
          <SmallPagination limit={pageSize} total={total} pageInfo={pageInfo} />
        )}
      </Box>
    </TextFields>
  );
}

export default Pagination;
