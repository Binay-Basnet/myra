import { AiOutlineArrowDown } from 'react-icons/ai';
import { useRouter } from 'next/router';
import { Box, Icon } from '@chakra-ui/react';
import { flexRender, Header } from '@tanstack/react-table';
import { motion } from 'framer-motion';
import omit from 'lodash/omit';
import qs from 'qs';

interface TableHeaderWithSortingProps<T> {
  header: Header<T, unknown>;
}

export const TableHeaderWithSorting = <T,>({ header }: TableHeaderWithSortingProps<T>) => {
  const router = useRouter();

  const sortParams = qs.parse(router.query['sort'] as string);

  const column = header?.column?.columnDef?.meta?.orderId || header.column.id;

  const isActive = sortParams['column'] === column;

  return (
    <Box
      display="flex"
      alignItems="center"
      cursor={header.column.getCanSort() ? 'pointer' : 'default'}
      onClick={() => {
        if (!header.column.getCanSort()) {
          return null;
        }

        if (!isActive) {
          return router.push(
            {
              query: {
                ...omit(router.query, ['paginate']),

                sort: qs.stringify({
                  column: column as string,
                  arrange: 'asc',
                }),
              },
            },
            undefined,
            { shallow: true }
          );
        }

        if (sortParams['arrange'] === 'asc') {
          return router.push(
            {
              query: {
                ...omit(router.query, ['paginate']),

                sort: qs.stringify({
                  column: column as string,
                  arrange: 'desc',
                }),
              },
            },
            undefined,
            { shallow: true }
          );
        }

        return router.push(
          {
            query: {
              ...omit(router.query, ['paginate', 'sort']),
            },
          },
          undefined,
          { shallow: true }
        );
      }}
    >
      {flexRender(header.column.columnDef.header, header.getContext())}

      {header.column.getCanSort() && isActive ? (
        <motion.div animate={{ x: 4 }}>
          <Icon
            // as={sortParams['arrange'] === 'asc' ? AiOutlineArrowDown : AiOutlineArrowUp}
            as={AiOutlineArrowDown}
            w="s20"
            h="s20"
            p="s4"
            color="primary.500"
            transition="all 0.2s ease"
            transform={sortParams['arrange'] === 'asc' ? 'rotate(0)' : 'rotate(180deg)'}
          />
        </motion.div>
      ) : null}
    </Box>
  );
};

export default TableHeaderWithSorting;
