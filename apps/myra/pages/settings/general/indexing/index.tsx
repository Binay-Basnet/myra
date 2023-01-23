import { Box, Button, Text, toast } from '@myra-ui';

import {
  useResetTrailBalanceCacheMutation,
  useSearchIndexingMutation,
} from '@coop/cbs/data-access';
import { SettingsGeneralLayout, SettingsLayout } from '@coop/cbs/settings/ui-layout';
import { Can } from '@coop/cbs/utils';

const Indexing = () => {
  const { mutateAsync: resetSearchIndexMutation, isLoading: resetSearchIndexLoading } =
    useSearchIndexingMutation({});
  const { mutateAsync: resetTrailBalanceCacheMutation, isLoading: resetTrailBalanceCacheLoading } =
    useResetTrailBalanceCacheMutation({});
  const resetSearchIndexHandler = () => {
    resetSearchIndexMutation({}).then(() => {
      toast({
        id: 'indexing',
        type: 'success',
        message: 'Index reset successfully',
      });
    });
  };
  const resetTrailBalanceCacheHandler = () => {
    resetTrailBalanceCacheMutation({})
      .then(() => {
        toast({
          id: 'reset-trail-balance-cache-success',
          type: 'success',
          message: 'Trail balance reset successfully',
        });
      })
      .catch(() => {
        toast({
          id: 'reset-trail-balance-cache-error',
          type: 'error',
          message: 'Trail balance reset unsuccessful',
        });
      });
  };
  return (
    <Can I="SHOW_IN_MENU" a="SETTINGS_INDEXING" showError isErrorCentered>
      <Box display="flex" gap={5} flexDirection="column" p={5}>
        <Text fontSize="r2" fontWeight="medium">
          Indexing
        </Text>
        <Button onClick={resetSearchIndexHandler} width={150} isLoading={resetSearchIndexLoading}>
          Reset Search index
        </Button>
        <Button
          onClick={resetTrailBalanceCacheHandler}
          width={200}
          isLoading={resetTrailBalanceCacheLoading}
        >
          Reset Trail balance cache
        </Button>
      </Box>
    </Can>
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
