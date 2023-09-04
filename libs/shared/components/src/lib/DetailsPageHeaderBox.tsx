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
    >
      <Text fontSize="1.125rem">{title}</Text>
    </Box>
  );
};

export default DetailsPageHeaderBox;
