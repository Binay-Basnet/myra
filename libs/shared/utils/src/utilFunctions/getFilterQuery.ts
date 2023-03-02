import Router from 'next/router';
import qs from 'qs';

import { Filter } from '@coop/cbs/data-access';

const URLComparatorMap = {
  '=': 'EqualTo',
  '<': 'GreaterThan',
  '>': 'LessThan',
} as const;

type URLFilterComparator = '=' | '<' | '>';
type URLFilterValue = string | string[] | { from: string; to: string };

export type URLFilter = Record<
  string,
  {
    value: URLFilterValue;
    compare: URLFilterComparator;
  }
>;

const mapFilterQuery = (filters: URLFilter) => {
  const tempFilters = Object.keys(filters)
    .map((column) => ({
      column,
      value: Array.isArray(filters[column].value)
        ? (filters[column].value as string[])
        : ([filters[column].value] as string[]),

      comparator: URLComparatorMap[filters[column].compare],
    }))
    .sort((a, b) => b.value.length - a.value.length);

  if (tempFilters.length === 0) {
    return {};
  }

  return {
    orConditions: tempFilters[0].value.map((_, i) => ({
      andConditions: tempFilters.map((t) => ({ ...t, value: t.value[i] || t.value[0] })),
    })),
  };
};

export const getFilterQuery = (): Filter => {
  const filter = Router.query['filter'] || '';
  const search = Router.query['search'] || '';

  const parsedQuery = mapFilterQuery(
    qs.parse(filter as string, {
      allowDots: true,
      parseArrays: true,
    }) as URLFilter
  );

  if (search) {
    return {
      query: search as string,
      ...parsedQuery,
    };
  }
  return parsedQuery;
};
