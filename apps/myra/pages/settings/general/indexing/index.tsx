import { Box, Button, Divider, Text, toast } from '@myra-ui';

import {
  useResetTrialBalanceCacheMutation,
  useSearchIndexingMutation,
  useSearchInternalIndexingMutation,
} from '@coop/cbs/data-access';
import {
  SettingsGeneralLayout,
  SettingsLayout,
  SettingsPageHeader,
} from '@coop/cbs/settings/ui-layout';
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
      <SettingsPageHeader heading="Indexing" />
      <Box display="flex" flexDirection="column" p={5}>
        <Box p={2} borderX="1px" borderTop="1px" borderColor="border.layout" borderTopRadius={5}>
          <Text>Indexing Setup</Text>
        </Box>
        <Box
          gap={5}
          display="flex"
          flexDir="column"
          p={5}
          border="1px"
          borderColor="border.layout"
          borderBottomRadius={5}
        >
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Text>Reset Search Index</Text>
            <Button
              onClick={resetSearchIndexHandler}
              width={150}
              isLoading={resetSearchIndexLoading}
            >
              Reset Search Index
            </Button>
          </Box>
          <Divider />
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Text>Reset Trial Balance Cache</Text>
            <Button
              onClick={resetTrailBalanceCacheHandler}
              width={200}
              isLoading={resetTrialBalanceCacheLoading}
            >
              Reset Trial Balance Cache
            </Button>
          </Box>
          <Divider />
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Text>Reset Internal Search Index</Text>
            <Button
              onClick={resetInternalSearchIndexHandler}
              width={200}
              isLoading={resetInternalSearchIndexLoading}
            >
              Reset Internal Search Index
            </Button>
          </Box>
        </Box>
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
