import { Box, Text } from '@myra-ui';

export const GridKeyValuePair = (props: {
  itemKey: string;
  itemValue: string;
  colorOfValue?: string;
}) => {
  const { itemKey, itemValue, colorOfValue = 'gray.800' } = props;
  return (
    <Box>
      <Text fontSize="r1" color="gray.600">
        {itemKey}
      </Text>
      <Text fontSize="r1" fontWeight="semibold" color={colorOfValue}>
        {itemValue}
      </Text>
    </Box>
  );
};

export default GridKeyValuePair;
