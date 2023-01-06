import { Box, Text } from '@myra-ui';

import { LedgerList } from '@coop/cbs/data-access';

import { LedgerLists } from '../details/LedgerList';
import { AddAccount } from '../Tree/LeafNode';
import { useCOALeafNodeDetails } from '../../hooks';
import { CoaTree } from '../../types';

export const LedgerTab = () => {
  const { leafNodeData } = useCOALeafNodeDetails();

  return (
    <>
      <Box display="flex" justifyContent="space-between">
        <Text fontSize="r3" fontWeight="600" color="gray.800">
          Ledger
        </Text>

        <AddAccount
          clickedAccount={{ id: leafNodeData?.id as string } as CoaTree}
          isGrouped={false}
        />
      </Box>

      <LedgerLists ledgers={leafNodeData?.ledgers as LedgerList[]} />
    </>
  );
};
