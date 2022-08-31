import { MdOutlineCircle } from 'react-icons/md';

import { Box, Icon, Text } from '@coop/shared/ui';

import NodeWrapper from './NodeWrapper';
import { CoaTree } from '../../types';

interface ITestProps {
  data: CoaTree;
}
function LeafNode(props: ITestProps) {
  return (
    <NodeWrapper>
      <Box display="flex" ml="-3px" alignItems="center">
        <Icon size="sm" as={MdOutlineCircle} color="gray.500" />
        <Box display="flex" alignItems="center">
          <Text fontWeight="bold" fontSize="14px">
            110
          </Text>
          <Text fontWeight="400" fontSize="14px">
            {props.data.name?.en}
          </Text>
        </Box>
      </Box>
    </NodeWrapper>
  );
}
export default LeafNode;
