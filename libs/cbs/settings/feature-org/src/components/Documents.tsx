import { Box, FileViewer, Grid, Text } from '@myra-ui';

import { Organization } from '@coop/cbs/data-access';

export const Documents = (props: { data?: Organization | null }) => {
  const { data } = props;
  return (
    <>
      <Text fontSize="r3" fontWeight="medium">
        Organization Documents
      </Text>
      <Box p="s16" bg="white" borderRadius={5}>
        <Grid templateColumns="repeat(3, 1fr)" rowGap="s48" columnGap="80px" py="s8">
          <Box display="flex" flexDirection="column" gap="s4">
            <Text variant="formLabel" color="gray.700">
              Documents
            </Text>
            {data?.documents?.map((file) => (
              <Box w="50%">
                <FileViewer fileName={file as string} fileUrl={file as string} />
              </Box>
            ))}
          </Box>
        </Grid>
      </Box>
    </>
  );
};

export default Documents;
