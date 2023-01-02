import { Box, Button, Text } from '@myra-ui';

import { useSearchIndexingMutation } from '@coop/cbs/data-access';
import { SettingsGeneralLayout, SettingsLayout } from '@coop/cbs/settings/ui-layout';

const Indexing = () => {
  const { mutate } = useSearchIndexingMutation({});
  const onClick = () => {
    mutate({});
  };
  return (
    <Box display="flex" gap={5} flexDirection="column" p={5}>
      <Text>Indexing</Text>
      <Button onClick={onClick} width={150}>
        Fetch all index
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
