import { useMemo, useState } from 'react';
import { BiUndo } from 'react-icons/bi';
import { useQueryClient } from '@tanstack/react-query';

import { asyncToast, Box, Button, Icon, Input, Loader, Text } from '@myra-ui';

import { useGetBranchListQuery, useReadyBranchEodMutation } from '@coop/cbs/data-access';
import { getPaginationQuery, useDebounce } from '@coop/shared/utils';

export const AllBranchReadiness = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const queryClient = useQueryClient();

  const { data: branchListData, isFetching } = useGetBranchListQuery({
    paginate: { ...getPaginationQuery(), first: -1 },
    filter: { query: useDebounce(searchQuery, 800) },
  });

  const branchList = useMemo(
    () => branchListData?.settings?.general?.branch?.list?.edges ?? [],
    [branchListData]
  );

  const { mutateAsync } = useReadyBranchEodMutation();

  const handleRevertReadiness = (branchId: string) => {
    asyncToast({
      id: 'revert-branch-readiness',
      msgs: {
        loading: 'Reverting branch readiness',
        success: 'Branch readiness reverted',
      },
      promise: mutateAsync({ revertBranchId: branchId }),
      onSuccess: () => {
        queryClient.invalidateQueries(['getBranchList']);
      },
    });
  };

  return (
    <Box display="flex" flexDirection="column" gap="s16">
      <Text fontSize="r1" fontWeight={400} color="gray.600">
        To revert branch readiness of any branch press “Revert Readiness”
      </Text>

      <Input
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
        }}
        placeholder="Search Service Center"
      />
      <Box display="flex" flexDirection="column" gap="s8">
        {isFetching ? (
          <Loader />
        ) : (
          branchList?.map((branch) => (
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              px="s16"
              py="s12"
              borderRadius="br2"
              border="1px"
              borderColor="border.layout"
            >
              <Text fontSize="r2" fontWeight={600} color="gray.800">
                {branch?.node?.name}
              </Text>

              {branch?.node?.eodReady && (
                <Button
                  variant="outline"
                  shade="danger"
                  leftIcon={<Icon as={BiUndo} color="danger.500" />}
                  onClick={() => handleRevertReadiness(branch?.node?.id as string)}
                >
                  Revert Readiness
                </Button>
              )}
            </Box>
          ))
        )}
      </Box>
    </Box>
  );
};
