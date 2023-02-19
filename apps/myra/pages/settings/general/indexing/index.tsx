import { Box, Button, Text, toast } from '@myra-ui';

import {
  useResetTrialBalanceCacheMutation,
  useSearchIndexingMutation,
  useSearchInternalIndexingMutation,
} from '@coop/cbs/data-access';
import { Can } from '@coop/cbs/utils';

const Indexing = () => {
  const { mutateAsync: resetSearchIndexMutation, isLoading: resetSearchIndexLoading } =
    useSearchIndexingMutation({});
  const {
    mutateAsync: resetInternalSearchIndexMutation,
    isLoading: resetInternalSearchIndexLoading,
  } = useSearchInternalIndexingMutation();
  const { mutateAsync: resetTrialBalanceCacheMutation, isLoading: resetTrialBalanceCacheLoading } =
    useResetTrialBalanceCacheMutation({});

  const resetSearchIndexHandler = () => {
    resetSearchIndexMutation({}).then((res) => {
      toast({
        id: 'indexing',
        type: 'success',
        message: res?.search?.indexData,
      });
    });
  };

  const resetInternalSearchIndexHandler = () => {
    resetInternalSearchIndexMutation({}).then((res) => {
      toast({
        id: 'internal-indexing',
        type: 'success',
        message: res?.search?.indexData,
      });
    });
  };

  const resetTrailBalanceCacheHandler = () => {
    resetTrialBalanceCacheMutation({})
      .then((res) => {
        toast({
          id: 'reset-trial-balance-cache-success',
          type: 'success',
          message: res?.settings?.report?.resetTrialCache,
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
          Reset Search Index
        </Button>
        <Button
          onClick={resetTrailBalanceCacheHandler}
          width={200}
          isLoading={resetTrialBalanceCacheLoading}
        >
          Reset Trial Balance Cache
        </Button>
        <Button
          onClick={resetInternalSearchIndexHandler}
          width={200}
          isLoading={resetInternalSearchIndexLoading}
        >
          Reset Internal Search Index
        </Button>
      </Box>
    </Can>
  );
};

export default Indexing;
