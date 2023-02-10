import { Box, Button, Text, toast } from '@myra-ui';

import {
  useResetTrialBalanceCacheMutation,
  useSearchIndexingMutation,
  useSearchInternalIndexingMutation,
} from '@coop/cbs/data-access';
import { SettingsGeneralLayout, SettingsLayout } from '@coop/cbs/settings/ui-layout';
import { Can } from '@coop/cbs/utils';

const Indexing = () => {
  const { mutateAsync: resetSearchIndexMutation, isLoading: resetSearchIndexLoading } =
    useSearchIndexingMutation({});
  const {
    mutateAsync: resetInternalSearchIndexMutation,
    isLoading: resetInternalSearchIndexLoading,
  } = useSearchInternalIndexingMutation({});
  const { mutateAsync: resetTrialBalanceCacheMutation, isLoading: resetTrialBalanceCacheLoading } =
    useResetTrialBalanceCacheMutation({});

  const resetSearchIndexHandler = () => {
    resetSearchIndexMutation({}).then(() => {
      toast({
        id: 'indexing',
        type: 'success',
        message: 'Index reset successfully',
      });
    });
  };

  const resetInternalSearchIndexHandler = () => {
    resetInternalSearchIndexMutation({}).then(() => {
      toast({
        id: 'internal-indexing',
        type: 'success',
        message: 'Internal Index reset successfully',
      });
    });
  };

  const resetTrailBalanceCacheHandler = () => {
    resetTrialBalanceCacheMutation({})
      .then(() => {
        toast({
          id: 'reset-trial-balance-cache-success',
          type: 'success',
          message: 'Trail balance reset successfully',
        });
      })
      .catch(() => {
        toast({
          id: 'reset-trial-balance-cache-error',
          type: 'error',
          message: 'Trial balance reset unsuccessful',
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
          isLoading={resetTrialBalanceCacheLoading}
        >
          Reset trial balance cache
        </Button>
        <Button
          onClick={resetInternalSearchIndexHandler}
          width={200}
          isLoading={resetInternalSearchIndexLoading}
        >
          Reset Internal Search index
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
