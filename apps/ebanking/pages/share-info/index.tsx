import { ReactElement } from 'react';

import { ShareHeader } from '@coop/ebanking/cards';
import { Transaction_Direction, useGetEbankingShareHistoryQuery } from '@coop/ebanking/data-access';
import { EbankingMainLayout } from '@coop/ebanking/ui-layout';
import { Box, Divider, Text } from '@coop/shared/ui';

const ShareInfoPage = () => {
  const { data } = useGetEbankingShareHistoryQuery();
  return (
    <Box display="flex" flexDir="column" gap="s16">
      <ShareHeader />
      <Divider />
      <Box bg="white" borderRadius="br2">
        {data?.eBanking?.share?.history.map((share) => (
          <Box
            p="s20"
            key={share.id}
            borderBottom="1px"
            borderBottomColor="border.layout"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box display="flex" flexDir="column" gap="s4">
              <Text fontSize="r1" fontWeight="500" color="gray.800">
                {share.transactionDirection === Transaction_Direction.Purchased
                  ? 'Share Purchased'
                  : 'Share Returned'}
              </Text>
              <Text fontSize="s3" color="gray.500">
                {share.date}
              </Text>
            </Box>

            <Box display="flex" flexDir="column" alignItems="end" gap="s4">
              <Box
                p="2px"
                px="s4"
                borderRadius="br2"
                bg={
                  share.transactionDirection === Transaction_Direction.Purchased
                    ? 'primary.100'
                    : 'red.0'
                }
              >
                <Text
                  fontSize="s2"
                  fontWeight="500"
                  color={
                    share.transactionDirection === Transaction_Direction.Purchased
                      ? 'primary.500'
                      : 'red.500'
                  }
                >
                  {share.transactionDirection === Transaction_Direction.Purchased ? '+' : '-'}
                  {share.numberOfShares}
                </Text>
              </Box>

              <Text fontSize="r1" fontWeight="600" color="gray.800">
                {share.amount}
              </Text>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

ShareInfoPage.getLayout = (page: ReactElement) => <EbankingMainLayout>{page}</EbankingMainLayout>;

export default ShareInfoPage;
