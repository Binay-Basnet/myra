import { useRouter } from 'next/router';

import { ShareTransactionType, useGetMemberDetailsOverviewQuery } from '@coop/cbs/data-access';
import { Box, Tags, Text } from '@coop/shared/ui';

export const ShareRegister = () => {
  const router = useRouter();
  const memberDetails = useGetMemberDetailsOverviewQuery({
    id: router.query['id'] as string,
  });

  const memberRecentTrans =
    memberDetails?.data?.members?.memberOverview?.data?.share?.registerDetails;

  return (
    <Box p="s16" bg="white">
      <Box display="flex" justifyContent="space-between" alignItems="center" h="50px">
        <Text fontWeight="600" fontSize="r1">
          Share Register
        </Text>
      </Box>
      {memberRecentTrans && (
        <Box>
          {memberRecentTrans?.slice(0, 10).map((items) => (
            <Box
              h="80px"
              display="flex"
              justifyContent="space-between"
              borderBottom="1px solid"
              alignItems="center"
              borderBottomColor="border.layout"
              key={`${items?.date}${items?.title}${items?.noOfShares}`}
            >
              <Box display="flex" flexDirection="column" gap="s4">
                <Text fontSize="s3" fontWeight="500">
                  {items?.title}
                </Text>
                <Text fontSize="s3" fontWeight="400">
                  {items?.date}
                </Text>
              </Box>
              <Box>
                <Box
                  display="flex"
                  justifyContent="flex-start"
                  color={
                    items?.txnType === ShareTransactionType?.Return ? 'danger.500' : 'primary.500'
                  }
                >
                  <Text fontSize="s3" fontWeight="400">
                    {items?.txnType === ShareTransactionType?.Return ? '-' : '+'}
                  </Text>
                  <Text fontSize="s3" fontWeight="400">
                    {' '}
                    {items?.txnAmount}
                  </Text>
                </Box>
                {items?.noOfShares && (
                  <Box>
                    <Tags
                      label={String(items?.noOfShares as unknown)}
                      type="chip"
                      bg={
                        items?.txnType === ShareTransactionType?.Return
                          ? 'danger.100'
                          : 'primary.100'
                      }
                      labelColor={
                        items?.txnType === ShareTransactionType?.Return
                          ? 'danger.500'
                          : 'primary.500'
                      }
                    />
                  </Box>
                )}
              </Box>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};
