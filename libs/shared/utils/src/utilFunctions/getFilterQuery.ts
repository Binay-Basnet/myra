import Router from 'next/router';
import qs from 'qs';

import { Filter } from '@coop/cbs/data-access';

const URLComparatorMap = {
  '=': 'EqualTo',
  '<': 'LessThan',
  '>': 'GreaterThan',
  '< >': 'BETWEEN',
  CONTAINS: 'CONTAINS',
} as const;

type URLFilterComparator = '=' | '<' | '>' | '< >' | 'CONTAINS';
type URLFilterValue = string | string[] | { from: string; to: string };

export type URLFilter = Record<
  string,
  {
    value: URLFilterValue;
    compare: URLFilterComparator;
  }
>;

function combinations<T>(...arrays: T[][]): T[][] {
  return arrays.reduce(
    (acc, arr) => acc.flatMap((combination) => arr.map((element) => combination.concat(element))),
    [[]] as T[][]
  );
}

const mapFilterQuery = (filters: URLFilter) => {
  const tempFilters = Object.keys(filters).map((column) => {
    const value = Array.isArray(filters[column].value)
      ? (filters[column].value as string[])
      : ([filters[column].value] as string[]);

    const comparator = URLComparatorMap[filters[column].compare];

    return value.map((v) => ({
      value: v,
      column,
      comparator,
    }));
  });

  if (tempFilters.length === 0) {
    return {};
  }

  const combinationsArray = combinations(...tempFilters);

  return {
    orConditions: combinationsArray.map((arr) => ({
      andConditions: arr,
    })),
  };
};

export const getFilterQuery = (defaultFilter?: URLFilter): Filter => {
  const filter = Router.query['filter'] || '';
  const search = Router.query['search'] || '';

  const parsedQuery = mapFilterQuery({
    ...(defaultFilter || {}),
    ...(qs.parse(filter as string, {
      allowDots: true,
      parseArrays: true,
      comma: true,
    }) as URLFilter),
  });

  if (search) {
    return {
      query: search as string,
      ...parsedQuery,
    };
  }
  return parsedQuery;
};
