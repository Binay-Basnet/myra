import { useRouter } from 'next/router';
import { Box } from '@chakra-ui/react';

import Select from '../select/Select';
import SmallPagination from '../small-pagination/SmallPagination';
import TextFields from '../text-fields/TextFields';

/* eslint-disable-next-line */
export interface PaginationProps {
  total: number | string;
  startCursor: string;
  endCursor: string;
  pageSizeOptions: number[];
}

export const DEFAULT_PAGE_SIZE = 10;

export function Pagination({
  endCursor,
  startCursor,
  total,
  pageSizeOptions,
}: PaginationProps) {
  const router = useRouter();

  const pageSize = Number(
    router?.query['first'] ?? router?.query['last'] ?? DEFAULT_PAGE_SIZE
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
              onChange={(newValue: { value: string }) => {
                if (router.query['after']) {
                  router.push({
                    query: {
                      ...router.query,
                      first: newValue?.value,
                    },
                  });
                } else if (router.query['before']) {
                  router.push({
                    query: {
                      ...router.query,
                      last: newValue?.value,
                    },
                  });
                } else {
                  router.push({
                    query: {
                      ...router.query,
                      first: newValue?.value,
                      after: startCursor,
                    },
                  });
                }
              }}
              options={pageSizeOptions?.map((size) => ({
                label: String(size),
                value: size,
              }))}
            />
          </Box>

          <span>items per page</span>
        </Box>

        <SmallPagination
          limit={pageSize}
          total={total}
          startCursor={startCursor}
          endCursor={endCursor}
        />
      </Box>
    </TextFields>
  );
}

export default Pagination;
