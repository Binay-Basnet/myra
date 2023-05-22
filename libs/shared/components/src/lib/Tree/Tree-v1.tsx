import React, { useState } from 'react';
import { BsFillCaretRightFill } from 'react-icons/bs';
import { MdOutlineCircle } from 'react-icons/md';
import { Box, Collapse, Text } from '@chakra-ui/react';

import { Checkbox } from '@myra-ui/forms';
import { Icon } from '@myra-ui/foundations';

import Accordion, { useAccordion } from './useAccordion';

export interface BaseType extends Record<string, unknown> {
  id: string;
  name: string;
  under: string;
  isSelected?: boolean;
  children: BaseType[];
}

export interface ArrayTree extends Record<string, unknown> {
  id: string;
  name: string;
  under: string | null;
}

type MultiTreeProps<T extends ArrayTree> = {
  isMulti: boolean;
  value: BaseType | BaseType[] | null;
  onValueChange: (newValue: BaseType | BaseType[]) => void;
  data: T[];
  searchTerm: string;
};

export const MultiTreeV1 = <T extends ArrayTree>({
  data,
  onValueChange,
  isMulti,
  value,
  searchTerm,
}: MultiTreeProps<T>) => {
  const treeAfterSearch =
    searchTerm === '' ? arrayToTree(data) : arrayToTree(searchTree(data, searchTerm));

  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  console.log({ sagar: selectedIds });

  return (
    <Box display="flex" flexDir="column" gap="s16">
      {treeAfterSearch.map((account) => (
        <Tree
          originalTree={data}
          selectedIds={selectedIds}
          setSelectedIds={(newIds) => setSelectedIds(newIds)}
          isMulti={isMulti}
          value={value}
          setValue={onValueChange}
          open={!!searchTerm}
          data={account.children}
          current={account}
        />
      ))}
    </Box>
  );
};

type ITreeProps<T extends BaseType, U extends ArrayTree> = {
  isMulti: boolean;
  data: T[];
  open: boolean;
  current: T;
  setValue: (newValue: BaseType | BaseType[]) => void;
  value: BaseType | BaseType[] | null;
  selectedIds: string[];
  originalTree: U[];
  setSelectedIds: (newIds: string[]) => void;
};

export const Tree = <T extends BaseType, U extends ArrayTree>({
  isMulti,
  current,
  data,
  open,
  value,
  setValue,
  selectedIds,
  setSelectedIds,
  originalTree,
}: ITreeProps<T, U>) => (
  <Box>
    <Accordion defaultOpen={open}>
      <Accordion.Summary>
        <TreeHeader
          originalTree={originalTree}
          selectedIds={selectedIds}
          setSelectedIds={setSelectedIds}
          current={current}
        />
      </Accordion.Summary>
      <Accordion.Details>
        <TreeDetails
          originalTree={originalTree}
          selectedIds={selectedIds}
          setSelectedIds={setSelectedIds}
          isMulti={isMulti}
          value={value}
          setValue={setValue}
          data={data}
          open={open}
        />
      </Accordion.Details>
    </Accordion>
  </Box>
);

interface ITreeHeaderProps<T extends BaseType, U extends ArrayTree> {
  current: T;
  selectedIds: string[];
  setSelectedIds: (newIds: string[]) => void;
  originalTree: U[];
}

const TreeHeader = <T extends BaseType, U extends ArrayTree>({
  current,
  selectedIds,
  setSelectedIds,
  originalTree,
}: ITreeHeaderProps<T, U>) => {
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

      <Checkbox
        isChecked={selectedIds?.includes(current.id)}
        onChange={(e) => {
          if (e.target.checked) {
            setSelectedIds([
              ...(selectedIds || []),
              ...originalTree.filter((tree) => tree.id.indexOf(current.id) === 0).map((t) => t.id),
            ]);
          } else {
            setSelectedIds(selectedIds.filter((id) => !id.includes(current.id)));
          }
        }}
      />

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

interface ITreeDetailsProps<T extends BaseType, U extends ArrayTree> {
  data: T[];
  isMulti: boolean;
  open: boolean;
  setValue: (newValue: BaseType | BaseType[]) => void;
  value: BaseType[] | BaseType | null;

  selectedIds: string[];
  setSelectedIds: (newIds: string[]) => void;

  originalTree: U[];
}

const TreeDetails = <T extends BaseType, U extends ArrayTree>({
  isMulti,
  data,
  open,
  setValue,
  value,
  selectedIds,
  setSelectedIds,
  originalTree,
}: ITreeDetailsProps<T, U>) => {
  const { isOpen } = useAccordion();

  return (
    <Collapse in={isOpen}>
      {data?.map((d) => {
        if (d?.children?.length !== 0)
          return (
            <Node
              isMulti={isMulti}
              value={value}
              setValue={setValue}
              open={open}
              originalTree={originalTree}
              current={d}
              data={d.children}
              selectedIds={selectedIds}
              setSelectedIds={setSelectedIds}
            />
          );
        return (
          <LeafNode
            setSelectedIds={setSelectedIds}
            selectedIds={selectedIds}
            value={value}
            setValue={setValue}
            current={d}
          />
        );
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

interface INodeProps<T extends BaseType, U extends ArrayTree> {
  data: T[];
  isMulti: boolean;
  current: T;
  setValue: (newValue: BaseType | BaseType[]) => void;
  value: BaseType[] | BaseType | null;
  open: boolean;
  selectedIds: string[];
  setSelectedIds: (newIds: string[]) => void;
  originalTree: U[];
}

const Node = <T extends BaseType, U extends ArrayTree>(props: INodeProps<T, U>) => (
  <NodeWrapper>
    <Tree {...props} />
  </NodeWrapper>
);

interface ILeafNodeProps<T extends BaseType> {
  current: T;
  value: T | T[] | null;
  setValue: (newValue: T | T[]) => void;
  selectedIds: string[];
  setSelectedIds: (newIds: string[]) => void;
}

const LeafNode = <T extends BaseType>({
  current,
  setValue,
  value,
  selectedIds,
  setSelectedIds,
}: ILeafNodeProps<T>) => {
  console.log(selectedIds);

  return (
    <NodeWrapper>
      <Box
        display="flex"
        gap="s8"
        ml="-3px"
        alignItems="center"
        cursor="pointer"
        transition="all 0.05s ease"
        // onClick={() => {
        //   if (setValue) {
        //     setValue(current);
        //   }
        // }}
        sx={
          !Array.isArray(value) && value?.id === current.id
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
        <Checkbox
          isChecked={selectedIds?.includes(current.id)}
          onChange={(e) => {
            if (!e.target.checked) {
              // console.log({ sagar: selectedIds.filter((id) => id !== current.id) });
              setSelectedIds(selectedIds.filter((id) => !id.includes(current.under)));
            } else {
              setSelectedIds([...selectedIds, current.id]);
            }
          }}
        />
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
};

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
