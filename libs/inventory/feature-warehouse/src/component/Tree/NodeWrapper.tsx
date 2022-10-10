import { Box } from '@chakra-ui/react';

interface INodeWrapper {
  children: React.ReactNode;
}
const NodeWrapper = ({ children }: INodeWrapper) => (
  <Box position="relative">
    <Box
      position="absolute"
      height="33px"
      width="35px"
      borderBottom="1px"
      borderStyle="dashed"
      borderColor="gray.500"
    />
    <Box px="40px" pt={5}>
      {children}
    </Box>
  </Box>
);

export default NodeWrapper;
