import React from 'react';
import { BsFillCaretRightFill } from 'react-icons/bs';
import { MdOutlineCircle } from 'react-icons/md';
import { Box, Collapse, Text } from '@chakra-ui/react';
import { Icon, NoDataState } from '@myra-ui';

import Accordion, { useAccordion } from './useAccordion';

export interface BaseType extends Record<string, unknown> {
  id: string;
  name: string;
  under: string;
  children: BaseType[];
}

interface IMultiTreeProps<T extends ArrayTree> {
  data: T[];
  searchTerm?: string;
  setValue: (newValue: BaseType) => void;
  value: BaseType | null;
}

export const MultiTree = <T extends ArrayTree>({
  data,
  setValue,
  value,
  searchTerm = '',
}: IMultiTreeProps<T>) => {
  const treeAfterSearch =
    searchTerm === '' ? arrayToTree(data) : arrayToTree(searchTree(data, searchTerm));

  return (
    <Box display="flex" flexDir="column" gap="s16">
      {treeAfterSearch?.length === 0 ? (
        <NoDataState
          custom={{
            title: 'No Accounts',
            subtitle: 'Please try searching another account',
          }}
        />
      ) : (
        treeAfterSearch.map((account) => (
          <Tree
            value={value}
            setValue={setValue}
            open={!!searchTerm}
            data={account.children}
            current={account}
          />
        ))
      )}
    </Box>
  );
};

export interface ArrayTree extends Record<string, unknown> {
  id: string;
  name: string;
  under: string;
}

interface ITreeProps<T extends BaseType> {
  data: T[];
  open: boolean;
  current: T;
  setValue: (newValue: BaseType) => void;
  value: BaseType | null;
}

export const Tree = <T extends BaseType>({
  current,
  data,
  open,
  value,
  setValue,
}: ITreeProps<T>) => (
  <Box>
    <Accordion defaultOpen={open}>
      <Accordion.Summary>
        <TreeHeader current={current} />
      </Accordion.Summary>
      <Accordion.Details>
        <TreeDetails value={value} setValue={setValue} data={data} open={open} />
      </Accordion.Details>
    </Accordion>
  </Box>
);

interface ITreeHeaderProps<T extends BaseType> {
  current: T;
}

const TreeHeader = <T extends BaseType>({ current }: ITreeHeaderProps<T>) => {
  const { isOpen } = useAccordion();

  return (
    <Box display="flex" gap="s8" ml="-3px" alignItems="center">
      {current?.children?.length !== 0 ? (
        <Icon
          size="sm"
          as={BsFillCaretRightFill}
          color="gray.500"
          transform={isOpen ? 'rotate(90deg)' : 'rotate(0deg)'}
          transition="0.4s all ease"
        />
      ) : (
        <Icon size="sm" as={MdOutlineCircle} color="gray.500" />
      )}

      <Box display="flex" alignItems="center" gap="s8" role="group">
        <Text fontWeight="bold" fontSize="14px">
          {current.id}
        </Text>
        <Text fontWeight="400" fontSize="14px" color="gray.800">
          {current.name}
        </Text>
      </Box>
    </Box>
  );
};

interface ITreeDetailsProps<T extends BaseType> {
  data: T[];
  open: boolean;
  setValue: (newValue: BaseType) => void;
  value: BaseType | null;
}

const TreeDetails = <T extends BaseType>({ data, open, setValue, value }: ITreeDetailsProps<T>) => {
  const { isOpen } = useAccordion();

  return (
    <Collapse in={isOpen}>
      {data?.map((d) => {
        if (d?.children?.length !== 0)
          return (
            <Node value={value} setValue={setValue} open={open} current={d} data={d.children} />
          );
        return <LeafNode value={value} setValue={setValue} current={d} />;
      })}
    </Collapse>
  );
};

interface INodeWrapper {
  children: React.ReactNode;
}

const NodeWrapper = ({ children }: INodeWrapper) => (
  <Box position="relative">
    <Box
      position="absolute"
      height="27.5px"
      width="35px"
      borderBottom="1px"
      borderStyle="dashed"
      borderColor="gray.500"
    />
    <Box pl="s40" pt="s16">
      {children}
    </Box>
  </Box>
);

interface INodeProps<T extends BaseType> {
  data: T[];
  current: T;
  setValue: (newValue: BaseType) => void;
  value: BaseType | null;
  open: boolean;
}

const Node = <T extends BaseType>(props: INodeProps<T>) => (
  <NodeWrapper>
    <Tree {...props} />
  </NodeWrapper>
);

interface ILeafNodeProps<T extends BaseType> {
  current: T;
  value: T | null;
  setValue: (newValue: T) => void;
}

const LeafNode = <T extends BaseType>({ current, setValue, value }: ILeafNodeProps<T>) => (
  <NodeWrapper>
    <Box
      display="flex"
      gap="s8"
      ml="-3px"
      alignItems="center"
      cursor="pointer"
      transition="all 0.05s ease"
      onClick={() => {
        if (setValue) {
          setValue(current);
        }
      }}
      sx={
        value?.id === current.id
          ? { bg: 'background.500', py: 's10', mt: '-10px', borderRadius: 'br2', px: 's10' }
          : {}
      }
      _hover={{
        bg: 'background.500',
        py: 's10',
        mt: '-10px',
        borderRadius: 'br2',
        px: 's10',
      }}
    >
      <Icon size="sm" as={MdOutlineCircle} color="gray.500" />
      <Box display="flex" alignItems="center" gap="s8" role="group">
        <Text fontWeight="bold" fontSize="14px">
          {current.id}
        </Text>
        <Text fontWeight="400" fontSize="14px">
          {current.name}
        </Text>
      </Box>
    </Box>
  </NodeWrapper>
);

export const arrayToTree = <T extends ArrayTree>(arr: Partial<T>[], parent = ''): BaseType[] =>
  arr
    ?.filter((item) => item?.under === parent)
    .map((child) => ({
      ...child,
      children: arrayToTree(arr, child?.id),
    })) as BaseType[];

export const getLeafNodes = <T extends BaseType>(root: Partial<T>): Partial<T>[] => {
  if (root.children?.length) {
    return root.children.flatMap(getLeafNodes) as Partial<T>[];
  }
  return [root];
};

export const getArrLeafNodes = <T extends BaseType>(tree: T[]) =>
  tree.reduce((acc, curr) => {
    acc = [...acc, ...getLeafNodes(curr)] as Partial<T>[];

    return acc;
  }, [] as Partial<T>[]);

const getParent = (tree: ArrayTree[], under: string) => {
  const found = tree.find((c) => c.id === under);

  return {
    id: found?.id as string,
    under: found?.under as string,
    name: found?.name as string,
  };
};

export const searchTree = (array: ArrayTree[], keyword: string) => {
  const tree = arrayToTree(array);
  // TODO! can generate the new tree while finding leaf nodes. if lag use this
  const leafNodes = getArrLeafNodes(tree);
  const leafNodesAfterSearch = leafNodes.filter(
    (c) =>
      new RegExp(keyword?.toLowerCase()).test(c?.name?.toLowerCase() as string) ||
      new RegExp(keyword?.toLowerCase()).test(c?.id as string)
  );

  if (leafNodesAfterSearch?.length === 0) return [];

  let result: Partial<BaseType>[] = [];

  const generateNewTree = (arr: Partial<BaseType>[]) => {
    arr?.forEach((node) => {
      let temp: Partial<BaseType>[] = [];

      result = [...result, node];

      const parent = getParent(array, node.under as string);

      if (parent) {
        if (!result.some((a) => a.id === parent.id)) {
          temp = [...temp, parent];
          generateNewTree(temp);
        }
      }

      result = [...result, ...temp];
    });
  };

  generateNewTree(leafNodesAfterSearch);

  return getUniqueListBy(result, 'id');
};

const getUniqueListBy = <T extends BaseType>(arr: Partial<T>[], key: string) =>
  [...new Map(arr.map((item) => [item[key], item])).values()] as T[];
