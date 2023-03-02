import { Box } from '@chakra-ui/react';
import qs from 'qs';

const URLComparatorMap = {
  '=': 'EQUAL_TO',
  '<': 'LESS_THEN',
  '>': 'GREATER_THEN',
} as const;

type URLFilterComparator = '=' | '<' | '>';
type URLFilterValue = string | string[] | { from: string; to: string };

type URLFilter = Record<
  string,
  {
    value: URLFilterValue;
    compare: URLFilterComparator;
  }
>;

const getFilterQuery = (filters: URLFilter) => {
  const tempFilters = Object.keys(filters)
    .map((column) => ({
      column,
      value: Array.isArray(filters[column].value)
        ? (filters[column].value as string[])
        : ([filters[column].value] as string[]),

      comparator: URLComparatorMap[filters[column].compare],
    }))
    .sort((a, b) => b.value.length - a.value.length);

  return {
    orConditions: tempFilters[0].value.map((_, i) => ({
      andConditions: tempFilters.map((t) => ({ ...t, value: t.value[i] || t.value[0] })),
    })),
  };
};

const Temp = () => {
  const urlFilters = {
    // activeDate: {
    //   value: '2010-11-10',
    //   compare: '>',
    // },

    // createdAtDate: {
    //   value: '2000-10-10',
    //   compare: '=',
    // },

    objState: {
      value: ['APPROVED'],
      compare: '=',
    },

    serviceCenter: {
      value: ['MYRA'],
      compare: '=',
    },
  };

  const queryString = qs.stringify(urlFilters, {
    allowDots: true,
    arrayFormat: 'brackets',
    encode: false,
  });

  const parsedQuery = qs.parse(queryString, { allowDots: true, parseArrays: true }) as URLFilter;

  const finalFilters = getFilterQuery(parsedQuery);

  return (
    <Box display="flex" flexDir="column" minH="100vh" gap="s16" bg="gray.900" color="white" p="s32">
      <Box whiteSpace="pre"> {JSON.stringify(urlFilters, null, 10)}</Box>

      <Box whiteSpace="pre-line">{queryString}</Box>

      <Box whiteSpace="pre"> {JSON.stringify(finalFilters, null, 10)}</Box>
    </Box>
  );
};

export default Temp;
