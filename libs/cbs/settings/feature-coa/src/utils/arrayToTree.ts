import { CoaView } from '@coop/cbs/data-access';

import { CoaTree } from '../types';

export const arrayToTreeCOA = (arr: Partial<CoaView>[], parent = ''): CoaTree[] =>
  arr
    ?.filter((item) => item?.under === parent)
    .map((child) => ({
      ...child,
      children: arrayToTreeCOA(arr, child?.accountCode),
    })) as CoaTree[];
