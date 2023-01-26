import { useDisclosure } from '@chakra-ui/react';

import { Box, Button, Text } from '@myra-ui';

import { LedgerTabList } from '../details';
import { AddAccountModal } from '../modals';
// import { AddAccount } from '../Tree/LeafNode';
import { useCOALeafNodeDetails } from '../../hooks';
import { CoaTree } from '../../types';

export const LedgerTab = () => {
  const modalProps = useDisclosure();
  const { leafNodeData } = useCOALeafNodeDetails();

  return (
    <>
      <Box display="flex" justifyContent="space-between">
        <Text fontSize="r3" fontWeight="600" color="gray.800">
          Ledger
        </Text>

        <Button
          variant="ghost"
          onClick={() => {
            modalProps.onToggle();
          }}
        >
          Add New Account
        </Button>

        <AddAccountModal clickedAccount={leafNodeData as CoaTree} modalProps={modalProps} />
      </Box>

      <LedgerTabList />
    </>
  );
};
