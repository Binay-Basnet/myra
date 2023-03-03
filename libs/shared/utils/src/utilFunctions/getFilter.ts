import Router from 'next/router';
import qs from 'qs';

import { URLFilter } from './getFilterQuery';

export const getFilter = (key: string) => {
  const filterString = Router.query['filter'] || '';

  const filter = qs.parse(filterString as string, {
    allowDots: true,
    parseArrays: true,
  }) as URLFilter;

  return filter?.[key]?.value;
};
