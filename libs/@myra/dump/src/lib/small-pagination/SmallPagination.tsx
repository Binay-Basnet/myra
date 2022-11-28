import { IoChevronBack, IoChevronForward } from 'react-icons/io5';
import { useRouter } from 'next/router';
import { Box } from '@chakra-ui/react';
import qs from 'qs';

import Icon from '../icon/Icon';
import IconButton from '../icon-button/IconButton';
import TextFields from '../text-fields/TextFields';

/* eslint-disable-next-line */
export interface SmallPaginationProps {
  limit: number;
  total: number | string;
  pageInfo: {
    startCursor?: string | null;
    endCursor?: string | null;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export function SmallPagination({ pageInfo, limit, total }: SmallPaginationProps) {
  const router = useRouter();

  const pageParams = qs.parse(router.query['paginate'] as string);

  const page = Number(pageParams['page'] ?? 1);

  const lowerLimit = (Number(page) - 1) * limit + 1;
  const upperLimit = page * limit - Number(total) >= 0 ? total : page * limit;

  return (
    <Box display="flex" gap="s4" alignItems="center">
      <IconButton
        colorScheme="gray"
        width="38px"
        height="38px"
        aria-label="go-to-next-page"
        variant="ghost"
        disabled={page === 1}
        onClick={() => {
          // delete router.query['after'];
          //
          // router.push({
          //   query: {
          //     ...router.query,
          //     page: +page - 1,
          //     before: startCursor,
          //   },
          // });

          router.push({
            query: {
              ...router.query,
              paginate: qs.stringify({
                page: +page - 1,
                before: pageInfo?.startCursor,
                last: limit,
              }),
            },
          });
        }}
        icon={<Icon mt="-2px" size="md" color="gray.800" as={IoChevronBack} />}
      ></IconButton>

      <TextFields as="div" variant="bodyRegular">
        {lowerLimit}-{upperLimit} /{' '}
        <TextFields as="span" color="primary.500" variant="bodyRegular">
          {total}
        </TextFields>
      </TextFields>

      <IconButton
        colorScheme="gray"
        width="38px"
        height="38px"
        aria-label="go-to-next-page"
        variant="ghost"
        disabled={page === Math.ceil(Number(total) / limit)}
        onClick={() => {
          // delete router.query['before'];
          //
          // router.push({
          //   query: {
          //     ...router.query,
          //     page: +page + 1,
          //     after: endCursor,
          //   },
          // });
          router.push({
            query: {
              ...router.query,
              paginate: qs.stringify({
                page: +page + 1,
                after: pageInfo?.endCursor,
                first: limit,
              }),
            },
          });
        }}
        icon={<Icon mt="-2px" size="md" color="gray.800" as={IoChevronForward} />}
      ></IconButton>
    </Box>
  );
}

export default SmallPagination;
