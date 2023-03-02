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

const DEFAULT_ORDER = {
  arrange: Arrange.Desc,
  column: 'ID',
};

export const getPaginationQuery = (query?: ParsedUrlQuery): Pagination => {
  try {
    const router = Router;

    const sortParams = qs.parse(router.query['sort'] as string);

    // Page is omitted because it is not needed for server.
    const paginationParams = query
      ? omit(qs.parse(query['paginate'] as string), 'page')
      : omit(qs.parse(router?.query['paginate'] as string), 'page');

    if (isEmpty(paginationParams) && isEmpty(sortParams)) {
      return {
        after: '',
        first: DEFAULT_PAGE_SIZE,
        order: DEFAULT_ORDER,
      };
    }

    if (isEmpty(paginationParams)) {
      return {
        after: '',
        first: DEFAULT_PAGE_SIZE,
        order: {
          arrange: sortParams['arrange'] === 'asc' ? Arrange.Asc : Arrange.Desc,
          column: sortParams['column'] as string,
        },
      };
    }

    if (isEmpty(sortParams)) {
      return { ...paginationParams, order: DEFAULT_ORDER };
    }

    return {
      ...paginationParams,
      order: {
        arrange: sortParams['arrange'] === 'asc' ? Arrange.Asc : Arrange.Desc,
        column: sortParams['column'] as string,
      },
    };
  } catch (e) {
    return {
      after: '',
      first: DEFAULT_PAGE_SIZE,
      order: DEFAULT_ORDER,
    };
  }
};
