import React, { useEffect } from 'react';
import { BsFillCaretRightFill } from 'react-icons/bs';
import { MdOutlineCircle } from 'react-icons/md';
import { Text } from '@chakra-ui/react';

import { Collapse } from '@myra-ui/components';
import { Checkbox } from '@myra-ui/forms';
import { Box, Icon } from '@myra-ui/foundations';

import { arrayToTree, searchTree } from './Tree-v1';
// eslint-disable-next-line import/no-cycle
import { Tree, useTree } from './useTree';

export interface BaseType extends Record<string, unknown> {
  id: string;
  name: string;
  under: string;
  children: BaseType[];
}

export interface ArrayTree extends Record<string, unknown> {
  id: string;
  name: string;
  under: string | null;
}

type TreeProps<TBase extends BaseType, TArray extends ArrayTree> = {
  isMulti: boolean;

  treeData: TBase[];
  arrayData: TArray[];

  value: string[];
  onValueChange: (newValue: string[]) => void;

  selectableNodes: 'leaf' | 'root' | 'all';
};

type MultiTreeProps<TArray extends ArrayTree> = {
  isMulti: boolean;

  arrayData: TArray[];

  value: string[];
  onValueChange: (newValue: string[]) => void;

  selectableNodes: 'leaf' | 'root' | 'all';

  searchTerm: string;

  index: number;

  setAccordionIndices: React.Dispatch<React.SetStateAction<number[]>>;
  accordionIndices: number[];
};

export const MultiTreeV2 = <TArray extends ArrayTree>(props: MultiTreeProps<TArray>) => {
  const {
    isMulti,
    arrayData,
    selectableNodes,
    searchTerm,
    value,
    onValueChange,
    accordionIndices,
    setAccordionIndices,
    index,
  } = props;

  const treeAfterSearch = React.useMemo(
    () =>
      searchTerm === '' ? arrayToTree(arrayData) : arrayToTree(searchTree(arrayData, searchTerm)),
    [searchTerm, arrayData]
  );

  useEffect(() => {
    if (!searchTerm) return;
    if (treeAfterSearch?.length === 0) {
      setAccordionIndices((prev) => prev?.filter((d) => d !== index));
    } else {
      setAccordionIndices((prev) => [...prev, index]);
    }
  }, [accordionIndices, treeAfterSearch.length, searchTerm]);

  return (
    <Box display="flex" flexDir="column" gap="s16">
      {treeAfterSearch.map((tree) => (
        <TreeComponent
          open={!!searchTerm}
          arrayData={arrayData}
          currentSubTree={tree}
          isMulti={isMulti}
          value={value}
          onValueChange={onValueChange}
          treeData={tree.children}
          selectableNodes={selectableNodes}
        />
      ))}
    </Box>
  );
};

export const TreeComponent = <TBase extends BaseType, TArray extends ArrayTree>(
  props: TreeProps<TBase, TArray> & {
    currentSubTree: TBase;
    open: boolean;
  }
) => {
  const {
    isMulti,
    treeData,
    arrayData,
    selectableNodes,
    value,
    onValueChange,
    currentSubTree,
    open,
  } = props;

  return (
    <Box>
      <Tree.Root treeData={treeData || []} arrayData={arrayData} defaultOpen={open}>
        <Tree.Summary>
          <TreeHeader
            isMulti={isMulti}
            selectableNodes={selectableNodes}
            currentSubTree={currentSubTree}
            selectedIds={value}
            onHeaderSelect={(newIds) => {
              onValueChange(newIds);
            }}
          />
        </Tree.Summary>
        <Tree.Details>
          <TreeDetails {...props} treeData={treeData} />
        </Tree.Details>
      </Tree.Root>
    </Box>
  );
};

/*-------------------------------------------------------------------------------------*/

type TreeHeaderProps<TBase extends BaseType> = {
  currentSubTree: TBase;
  selectedIds: string[];
  onHeaderSelect: (newIds: string[]) => void;
  selectableNodes: 'leaf' | 'root' | 'all';
  isMulti: boolean;
};

const TreeHeader = <T extends BaseType>({
  selectedIds,
  onHeaderSelect,
  currentSubTree,
  selectableNodes,
  isMulti,
}: TreeHeaderProps<T>) => {
  const { isOpen, arrayData } = useTree();

  return (
    <Box display="flex" gap="s8" ml="-3px" alignItems="center">
      {currentSubTree?.children?.length !== 0 ? (
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

      {isMulti && selectableNodes === 'all' && (
        <Checkbox
          id={currentSubTree.id}
          isChecked={selectedIds?.includes(currentSubTree.id)}
          onChange={(e) => {
            if (e.target.checked) {
              onHeaderSelect([
                ...(selectedIds || []),
                ...arrayData
                  .filter((tree) => tree.id.indexOf(currentSubTree.id) === 0)
                  .map((t) => t.id),
              ]);
            } else {
              onHeaderSelect(selectedIds.filter((id) => !id.includes(currentSubTree.under)));
            }
          }}
        />
      )}

      <label htmlFor={currentSubTree.id}>
        <Box display="flex" alignItems="center" gap="s8" role="group" cursor="pointer">
          <Text fontWeight="bold" fontSize="14px">
            {currentSubTree.id}
          </Text>
          <Text fontWeight="400" fontSize="14px" color="gray.800">
            {currentSubTree.name}
          </Text>
        </Box>
      </label>
    </Box>
  );
};

/*-------------------------------------------------------------------------------------*/

const TreeDetails = <TBase extends BaseType, TArray extends ArrayTree>({
  treeData,

  ...props
}: TreeProps<TBase, TArray> & {
  open: boolean;
}) => {
  const { isOpen } = useTree();

  return (
    <Collapse in={isOpen}>
      {treeData?.map((tree) => {
        if (tree?.children?.length !== 0) {
          return <Node {...props} treeData={tree.children as TBase[]} currentSubTree={tree} />;
        }

        return (
          <LeafNode
            isMulti={props.isMulti}
            selectableNodes={props.selectableNodes}
            currentSubTree={tree}
            selectedIds={props.value}
            onLeafSelect={(newIds) => {
              props.onValueChange(newIds);
            }}
          />
        );
      })}
    </Collapse>
  );
};

/*-------------------------------------------------------------------------------------*/

interface INodeWrapper {
  children: React.ReactNode;
}

const NodeWrapper = ({ children }: INodeWrapper) => (
  <Box position="relative">
    <Box
      position="absolute"
      height="1.703125rem"
      width="2.3125rem"
      borderBottom="1px"
      borderStyle="dashed"
      borderColor="gray.500"
    />
    <Box pl="s40" pt="s16">
      {children}
    </Box>
  </Box>
);

/*-------------------------------------------------------------------------------------*/

interface TreeDetailsProps<TBase extends BaseType, TArray extends ArrayTree>
  extends TreeProps<TBase, TArray> {
  currentSubTree: TBase;
  open: boolean;
}

const Node = <T extends BaseType, U extends ArrayTree>(props: TreeDetailsProps<T, U>) => (
  <NodeWrapper>
    <TreeComponent {...props} />
  </NodeWrapper>
);

/*-------------------------------------------------------------------------------------*/

interface LeafNodeProps<TBase extends BaseType> {
  currentSubTree: TBase;
  selectedIds: string[];
  onLeafSelect: (newIds: string[]) => void;
  selectableNodes: 'leaf' | 'root' | 'all';
  isMulti: boolean;
}

const LeafNode = <TBase extends BaseType>({
  currentSubTree,
  selectedIds,
  onLeafSelect,
  selectableNodes,
  isMulti,
}: LeafNodeProps<TBase>) => (
  <NodeWrapper>
    <Box display="flex" gap="s8" ml="-3px" alignItems="center" cursor="pointer">
      <Icon size="sm" as={MdOutlineCircle} color="gray.500" />
      {selectableNodes !== 'root' && (
        <Checkbox
          id={currentSubTree?.id}
          isChecked={
            isMulti
              ? selectedIds?.includes(currentSubTree.id)
              : currentSubTree.id === selectedIds[0]
          }
          onChange={(e) => {
            if (!e.target.checked) {
              if (isMulti) {
                onLeafSelect(selectedIds.filter((id) => !id.includes(currentSubTree.under)));
              } else {
                onLeafSelect([]);
              }
            } else if (isMulti) {
              onLeafSelect([...selectedIds, currentSubTree.id]);
            } else {
              onLeafSelect([currentSubTree.id]);
            }
          }}
        />
      )}
      <label htmlFor={currentSubTree?.id}>
        <Box display="flex" alignItems="center" gap="s8" role="group" cursor="pointer">
          <Text fontWeight="bold" fontSize="14px">
            {currentSubTree.id}
          </Text>
          <Text fontWeight="400" fontSize="14px">
            {currentSubTree.name}
          </Text>
        </Box>
      </label>
    </Box>
  </NodeWrapper>
);
