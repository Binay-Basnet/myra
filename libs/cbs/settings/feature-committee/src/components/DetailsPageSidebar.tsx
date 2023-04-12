import { useMemo } from 'react';
import { IoCopyOutline } from 'react-icons/io5';
import { useRouter } from 'next/router';

import { Box, DetailPageTabs, Icon, Text } from '@myra-ui';

import { useGetCommitteeListQuery } from '@coop/cbs/data-access';
import { copyToClipboard } from '@coop/shared/utils';

export const CommitteeDetailSidebar = () => {
  const router = useRouter();
  const id = router?.query?.['id'];
  const { data } = useGetCommitteeListQuery();
  const rowData = useMemo(() => data?.settings?.general?.organization?.committee ?? [], [data]);

  const detailData = rowData?.find((d) => d?.id === id);

  return (
    <>
      <Box
        borderBottom="1px"
        borderBottomColor="border.layout"
        display="flex"
        p="s16"
        justifyContent="space-between"
      >
        <Box display="flex" flexDirection="column" gap="s8" width="100%">
          <Box display="flex" flexDirection="column">
            <Box display="flex" justifyContent="space-between">
              <Text fontSize="r1" fontWeight={600} color="primary.500">
                {detailData?.name}
              </Text>
            </Box>
            <Box display="flex" alignItems="center" gap="s4">
              <Text
                fontSize="s3"
                fontWeight={400}
                color="neutralColorLight.Gray-50"
                wordBreak="break-all"
              >
                {detailData?.code}
              </Text>
              <Icon
                _hover={{ cursor: 'pointer' }}
                size="sm"
                as={IoCopyOutline}
                onClick={() => copyToClipboard('#122334343434434')}
              />
            </Box>
          </Box>
        </Box>
      </Box>

      {/* <Box
        borderBottom="1px"
        borderBottomColor="border.layout"
        display="flex"
        flexDirection="column"
      >
        <DetailPageMemberCard
          name={accountDetails?.member?.name?.local as string}
          profilePicUrl={accountDetails?.member?.profilePicUrl ?? ''}
        />
      </Box> */}

      <DetailPageTabs
        tabs={[
          'Overview',
          'Members',
          // 'ATM',
          // 'Activity',
          // 'Documents',
          // 'Tasks',
        ]}
      />
    </>
  );
};
