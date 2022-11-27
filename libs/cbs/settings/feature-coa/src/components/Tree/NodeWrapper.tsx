import { Box } from '@myra-ui';

interface INodeWrapper {
  children: React.ReactNode;
}
function NodeWrapper({ children }: INodeWrapper) {
  return (
    <Box position="relative">
      <Box
        position="absolute"
        height="27.5px"
        width="35px"
        borderBottom="1px"
        borderStyle="dashed"
        borderColor="gray.500"
      ></Box>
      <Box px="s40" pt="s16">
        {children}
      </Box>
    </Box>
  );
}

export default NodeWrapper;
