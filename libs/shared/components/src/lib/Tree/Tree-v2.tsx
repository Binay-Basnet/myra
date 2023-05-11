import React from 'react';
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

  value: TArray[] | null;
  onValueChange: (newValue: TArray[] | null) => void;

  selectableNodes: 'leaf' | 'root' | 'all';
};

type MultiTreeProps<TBase extends BaseType, TArray extends ArrayTree> = {
  isMulti: boolean;

  arrayData: TArray[];

  value: TArray[] | null;
  onValueChange: (newValue: TArray[] | null) => void;

  selectableNodes: 'leaf' | 'root' | 'all';

  searchTerm: string;
};

export const MultiTreeV2 = <TBase extends BaseType, TArray extends ArrayTree>(
  props: MultiTreeProps<TBase, TArray>
) => {
  const { isMulti, treeData, arrayData, selectableNodes, searchTerm, value, onValueChange } = props;

  const treeAfterSearch =
    searchTerm === '' ? arrayToTree(arrayData) : arrayToTree(searchTree(arrayData, searchTerm));

  return (
    <Box display="flex" flexDir="column" gap="s16">
      {treeAfterSearch.map((tree) => (
        <TreeComponent
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
  }
) => {
  const { isMulti, treeData, arrayData, selectableNodes, value, onValueChange, currentSubTree } =
    props;

  if (isMulti) {
    return (
      <Box>
        <Tree.Root treeData={treeData || []} arrayData={arrayData} defaultOpen={false}>
          <Tree.Summary>
            <TreeHeader
              currentSubTree={currentSubTree}
              selectedIds={value?.map((v) => v.id) || []}
              onHeaderSelect={(newIds) =>
                onValueChange(
                  newIds.map((id) => {
                    const foundArray = arrayData.find((d) => d.id === id);

                    if (foundArray) {
                      return foundArray;
                    }

                    throw new Error('Something went wrong');
                  })
                )
              }
            />
          </Tree.Summary>
          <Tree.Details>
            <TreeDetails {...props} treeData={treeData} />
          </Tree.Details>
        </Tree.Root>
      </Box>
    );
  }

  return null;
};

/*-------------------------------------------------------------------------------------*/

type TreeHeaderProps<TBase extends BaseType> = {
  currentSubTree: TBase;
  selectedIds: string[];
  onHeaderSelect: (newIds: string[]) => void;
};

const TreeHeader = <T extends BaseType>({
  selectedIds,
  onHeaderSelect,
  currentSubTree,
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

      <Checkbox
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
            onHeaderSelect(selectedIds.filter((id) => !id.includes(currentSubTree.id)));
          }
        }}
      />

      <Box display="flex" alignItems="center" gap="s8" role="group">
        <Text fontWeight="bold" fontSize="14px">
          {currentSubTree.id}
        </Text>
        <Text fontWeight="400" fontSize="14px" color="gray.800">
          {currentSubTree.name}
        </Text>
      </Box>
    </Box>
  );
};

/*-------------------------------------------------------------------------------------*/

const TreeDetails = <TBase extends BaseType, TArray extends ArrayTree>({
  treeData,
  ...props
}: TreeProps<TBase, TArray>) => {
  const { isOpen } = useTree();

  return (
    <Collapse in={isOpen}>
      {treeData?.map((tree) => {
        if (tree?.children?.length !== 0) {
          return <Node {...props} treeData={tree.children as TBase[]} currentSubTree={tree} />;
        }

        if (props.isMulti) {
          return (
            <LeafNode
              currentSubTree={tree}
              selectedIds={props.value?.map((v) => v.id) || []}
              onLeafSelect={(newIds) =>
                props.onValueChange(
                  newIds.map((id) => {
                    const foundArray = props.arrayData.find((d) => d.id === id);

                    if (foundArray) {
                      return foundArray;
                    }

                    throw new Error('Something went wrong');
                  })
                )
              }
            />
          );
        }

        return null;
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

/*-------------------------------------------------------------------------------------*/

interface TreeDetailsProps<TBase extends BaseType, TArray extends ArrayTree>
  extends TreeProps<TBase, TArray> {
  currentSubTree: TBase;
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
}

const LeafNode = <TBase extends BaseType>({
  currentSubTree,
  selectedIds,
  onLeafSelect,
}: LeafNodeProps<TBase>) => (
  <NodeWrapper>
    <Box display="flex" gap="s8" ml="-3px" alignItems="center" cursor="pointer">
      <Icon size="sm" as={MdOutlineCircle} color="gray.500" />
      <Checkbox
        isChecked={selectedIds?.includes(currentSubTree.id)}
        onChange={(e) => {
          if (!e.target.checked) {
            onLeafSelect(selectedIds.filter((id) => !id.includes(currentSubTree.under)));
          } else {
            onLeafSelect([...selectedIds, currentSubTree.id]);
          }
        }}
      />
      <Box display="flex" alignItems="center" gap="s8" role="group">
        <Text fontWeight="bold" fontSize="14px">
          {currentSubTree.id}
        </Text>
        <Text fontWeight="400" fontSize="14px">
          {currentSubTree.name}
        </Text>
      </Box>
    </Box>
  </NodeWrapper>
);
