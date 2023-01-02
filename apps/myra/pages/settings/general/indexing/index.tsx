import { Box, Button, Text, toast } from '@myra-ui';

import { useSearchIndexingMutation } from '@coop/cbs/data-access';
import { SettingsGeneralLayout, SettingsLayout } from '@coop/cbs/settings/ui-layout';

const Indexing = () => {
  const { mutateAsync, isLoading } = useSearchIndexingMutation({});
  const onClick = () => {
    mutateAsync({}).then(() => {
      toast({
        id: 'indexing',
        type: 'success',
        message: 'Index reset successfully',
      });
    });
  };
  return (
    <Box display="flex" gap={5} flexDirection="column" p={5}>
      <Text>Indexing</Text>
      <Button onClick={onClick} width={150} isLoading={isLoading}>
        Reset Search index
      </Button>
    </Box>
  );
};

Indexing.getLayout = function getLayout(page) {
  return (
    <SettingsLayout>
      <SettingsGeneralLayout>{page}</SettingsGeneralLayout>
    </SettingsLayout>
  );
};

export default Indexing;
