import { IoAddOutline } from 'react-icons/io5';
import { useRouter } from 'next/router';

import {
  Id_Type,
  useGetMemberDetailsOverviewQuery,
  useGetNewIdMutation,
} from '@coop/cbs/data-access';
import { Box, Grid, Icon, Text } from '@coop/shared/ui';

import { AccountList, UpcomingPaymentTable } from '../components';

const links = [
  {
    title: 'Account Open',
    link: '/accounts/account-open',
  },
  {
    title: 'Account Close',
    link: '/accounts/account-close',
  },
];
export const Accounts = () => {
  const router = useRouter();
  const memberDetails = useGetMemberDetailsOverviewQuery({
    id: router.query['id'] as string,
  });

  const memberPayment = memberDetails?.data?.members?.memberOverview?.data?.overview?.payments;
  const memberPaymentUp = memberPayment?.map((data, index) => ({
    sn: Number(index) + 1,
    date: data?.date,
    accountName: data?.accountName,
    paymentType: data?.paymentType,
    amount: data?.amount,
  }));
  const newId = useGetNewIdMutation();

  return (
    <>
      <Text fontSize="r3" fontWeight="600">
        Saving Accounts
      </Text>
      <Box display="flex" flexDirection="column" gap="s16" pb="s16">
        <Text fontWeight="600" fontSize="r1">
          Quick Links
        </Text>
        <Grid templateColumns="repeat(3,1fr)" gap="s16">
          {links?.map((item) => (
            <Box key={`${item.link}${item.title}`}>
              <Box
                display="flex"
                justifyContent="flex-start"
                alignItems="center"
                bg="white"
                borderRadius="br2"
                gap="s12"
                h="58px"
                pl="s16"
                cursor="pointer"
                onClick={() =>
                  newId
                    .mutateAsync({ idType: Id_Type.Account })
                    .then((res) => router.push(`${item.link}/add/${res?.newId}`))
                }
              >
                <Icon as={IoAddOutline} />

                <Text fontWeight="500" fontSize="s3">
                  {item.title}
                </Text>
              </Box>
            </Box>
          ))}
        </Grid>
      </Box>
      <AccountList />
      {memberPaymentUp && (
        <Box bg="white" display="flex" flexDirection="column" gap="s8" pb="s16" borderRadius="br2">
          <Box display="flex" justifyContent="space-between" p="s16">
            <Text fontSize="r1" fontWeight="600">
              {' '}
              Upcoming Payments
            </Text>
          </Box>
          <Box>
            <UpcomingPaymentTable data={memberPaymentUp} />
          </Box>
        </Box>
      )}
    </>
  );
};
