import { Box } from '@myra-ui';

interface INodeWrapper {
  children: React.ReactNode;
}

const NodeWrapper = ({ children }: INodeWrapper) => (
  <Box position="relative">
    <Box
      position="absolute"
      height="24px"
      width="35px"
      borderBottom="1px"
      borderStyle="dashed"
      borderColor="gray.500"
    />
    <Box px="s40" pt="s8">
      {children}
    </Box>
  </Box>
);

export default NodeWrapper;
