import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { Box } from '@myra-ui';

import { ArrayTree, BaseType } from './Tree-v2';

type TreeContextProps<TBase extends BaseType, TArray extends ArrayTree> = {
  isOpen: boolean;
  onToggle: () => void;

  treeData: TBase[];
  arrayData: TArray[];
};

const TreeContext = createContext<TreeContextProps<BaseType, ArrayTree>>({
  isOpen: false,
  onToggle: () => null,
  treeData: [],
  arrayData: [],
});

type ITreeProps<TBase extends BaseType, TArray extends ArrayTree> = {
  defaultOpen: boolean;
  children: React.ReactNode;

  treeData: TBase[];
  arrayData: TArray[];
};

export const Tree = <TBase extends BaseType, TArray extends ArrayTree>(
  props: ITreeProps<TBase, TArray>
) => {
  const { children, defaultOpen, treeData, arrayData } = props;
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const onToggle = useCallback(() => setIsOpen((item) => !item), []);

  useEffect(() => {
    if (defaultOpen) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [defaultOpen]);

  const memoizedValue = useMemo(
    () => ({ isOpen, onToggle, treeData, arrayData }),
    [isOpen, onToggle, treeData, arrayData]
  );

  return <TreeContext.Provider value={memoizedValue}>{children}</TreeContext.Provider>;
};

export const useTree = () => {
  const context = useContext(TreeContext);

  if (context === undefined) {
    throw new Error('useTree should be used within components wrapped by <Tree> only');
  }

  return context;
};

interface ITreeSummaryProps {
  children: React.ReactNode;
}

const TreeSummary = ({ children }: ITreeSummaryProps) => {
  const { onToggle } = useTree();

  return (
    <Box onClick={() => onToggle()} cursor="pointer">
      {children}
    </Box>
  );
};

interface ITreeDetailsProps {
  children: React.ReactNode;
}

const TreeDetails = ({ children }: ITreeDetailsProps) => {
  const { isOpen } = useTree();
  return (
    <Box
      borderLeft="1px"
      ml="4px"
      maxH={isOpen ? '100%' : 0}
      transition="0.5s all ease"
      overflow="hidden"
      borderColor="gray.500"
      borderStyle="dashed"
    >
      {children}
    </Box>
  );
};

Tree.Root = Tree;
Tree.Details = TreeDetails;
Tree.Summary = TreeSummary;

export default Tree;
