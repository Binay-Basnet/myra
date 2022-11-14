import { CoaView } from '@coop/cbs/data-access';

import { CoaTree } from '../types';

export const arrayToTreeCOA = (arr: Partial<CoaView>[], parent = ''): CoaTree[] =>
  arr
    ?.filter((item) => item?.under === parent)
    .map((child) => ({
      ...child,
      children: arrayToTreeCOA(arr, child?.accountCode),
    })) as CoaTree[];

export const getLeafNodes = (root: Partial<CoaTree>): Partial<CoaTree>[] => {
  if (root.children?.length) {
    return root.children.flatMap(getLeafNodes);
  }
  return [root];
};

export const getArrLeafNodes = (tree: CoaTree[]) =>
  tree.reduce((acc, curr) => {
    acc = [...acc, ...getLeafNodes(curr)];

    return acc;
  }, [] as Partial<CoaTree>[]);
