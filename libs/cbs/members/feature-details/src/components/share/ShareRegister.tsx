import { useRouter } from 'next/router';

import { Box, Chips, Text } from '@myra-ui';

import { ShareTransactionType, useGetMemberDetailsOverviewQuery } from '@coop/cbs/data-access';
import { localizedDate, ROUTES } from '@coop/cbs/utils';

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
              style={{
                cursor: 'pointer',
              }}
              onClick={() => router.push(`${ROUTES.CBS_SHARE_REGISTER_DETAILS}?id=123`)}
            >
              <Box display="flex" flexDirection="column" gap="s4">
                <Text fontSize="s3" fontWeight="500">
                  {items?.title}
                </Text>
                <Text fontSize="s3" fontWeight="400">
                  {localizedDate(items?.date)}
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
                    {items?.txnAmount}
                  </Text>
                </Box>
                {items?.noOfShares && (
                  <Box>
                    {items?.txnType === ShareTransactionType?.Return ? (
                      <Chips
                        variant="solid"
                        theme="danger"
                        size="md"
                        type="label"
                        label={String(items?.noOfShares as unknown)}
                      />
                    ) : (
                      <Chips
                        variant="solid"
                        theme="success"
                        size="md"
                        type="label"
                        label={String(items?.noOfShares as unknown)}
                      />
                    )}
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
