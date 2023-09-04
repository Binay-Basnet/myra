import { Box, Grid, Text } from '@myra-ui';

export const DetailsKeyValueCards = (props: {
  keyValueList: { label: string; value: string | number }[];
}) => {
  const { keyValueList } = props;
  return (
    <Grid templateColumns="repeat(3, 1fr)" gap="s20" px="s24">
      {keyValueList?.map((item) => (
        <Box bg="white" py="s12" px="s16" boxShadow="xs" borderRadius={4}>
          <Text color="gray.700" fontSize="s3">
            {item?.label}
          </Text>
          <Text color="gray.800" fontSize="r2" fontWeight="semibold">
            {item?.value}
          </Text>
        </Box>
      ))}
    </Grid>
  );
};

export default DetailsKeyValueCards;
