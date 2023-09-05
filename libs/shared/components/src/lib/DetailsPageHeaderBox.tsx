import { Box, Text } from '@myra-ui';

export const DetailsPageHeaderBox = (props: { title: string }) => {
  const { title } = props;
  return (
    <Box
      pl="s20"
      py="s16"
      bg="white"
      fontWeight="medium"
      borderBottom="1px"
      borderColor="border.layout"
      // position="sticky"
      // top={0}
      // zIndex={2}
    >
      <Text fontSize="r3">{title}</Text>
    </Box>
  );
};

export default DetailsPageHeaderBox;
