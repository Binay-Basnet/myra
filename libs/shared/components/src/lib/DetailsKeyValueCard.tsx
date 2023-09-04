import { Box, Grid, Text } from '@myra-ui';

export const DetailsKeyValueCard = (props: {
  title: string;
  keyValueList: { label: string; value: string | number }[];
}) => {
  const { title, keyValueList } = props;
  return (
    <Box mx="s24" p="s16" bg="white" borderRadius={4} boxShadow="xs">
      <Text fontSize="r1" color="gray.600" mb="s24">
        {title}
      </Text>
      <Grid templateColumns="repeat(3, 1fr)" gap="s16">
        {keyValueList?.map((item) => (
          <Box>
            <Text color="gray.700" fontSize="s3" fontWeight="medium">
              {item?.label}
            </Text>
            <Text color="gray.800" fontSize="s3" fontWeight="semibold">
              {item?.value}
            </Text>
          </Box>
        ))}
      </Grid>
    </Box>
  );
};

export default DetailsKeyValueCard;
