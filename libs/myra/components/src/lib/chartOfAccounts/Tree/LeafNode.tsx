import { MdOutlineCircle } from 'react-icons/md';
import { HStack, Icon, Text } from '@chakra-ui/react';

import NodeWrapper from './NodeWrapper';

interface ITestProps {
  code: string;
  title: string;
}
function LeafNode(props: ITestProps) {
  const { code, title } = props;

  return (
    <NodeWrapper>
      <HStack ml="-5px" alignItems="center">
        <Icon pl={1} as={MdOutlineCircle} color="gray.500" />
        <HStack alignItems="center">
          <Text fontWeight="bold" fontSize="14px">
            {code}
          </Text>
          <Text fontWeight="400" fontSize="14px">
            {title}
          </Text>
        </HStack>
      </HStack>
    </NodeWrapper>
  );
}
export default LeafNode;
