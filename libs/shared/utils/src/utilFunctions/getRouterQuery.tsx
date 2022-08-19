import Router from 'next/router';
import { isEmpty, omit } from 'lodash';
import qs from 'qs';
import { ParsedUrlQuery } from 'querystring';

import { DEFAULT_PAGE_SIZE } from '../constants/DEFAULT_PAGE_SIZE';

export enum Arrange {
  Asc = 'ASC',
  Desc = 'DESC',
}

type Pagination = {
  after?: string;
  before?: string;
  first?: number;
  last?: number;
  order: {
    arrange: Arrange;
    column: string;
  };
};

type RouterQueryType = 'PAGINATION' | 'SORTING';

interface GetRouterQuery {
  type: RouterQueryType[];
  query?: ParsedUrlQuery;
}

const defaultOrder = {
  arrange: Arrange.Desc,
  column: 'ID',
};

export const getRouterQuery = ({ type, query }: GetRouterQuery): Pagination => {
  const router = Router;

  if (!router || !(typeof window == undefined))
    return {
      after: '',
      first: DEFAULT_PAGE_SIZE,
      order: defaultOrder,
    };

  const paginationParams = query
    ? omit(qs.parse(query['paginate'] as string), 'page')
    : omit(qs.parse(router.query['paginate'] as string), 'page');

  if (type.includes('PAGINATION')) {
    if (isEmpty(paginationParams)) {
      return {
        after: '',
        first: DEFAULT_PAGE_SIZE,
        order: defaultOrder,
      };
    } else {
      return {
        ...paginationParams,
        order: defaultOrder,
      };
    }
  }

  return {
    after: '',
    first: DEFAULT_PAGE_SIZE,
    order: defaultOrder,
  };
};
