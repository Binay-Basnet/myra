import { IoAddOutline } from 'react-icons/io5';
import { useRouter } from 'next/router';

import { Box, Grid, Icon, Text } from '@coop/shared/ui';

import { TransactionTable } from '../components';

export const Transactions = () => {
  const router = useRouter();
  const id = router.query['id'] as string;
  const links = [
    {
      title: 'New Deposit',
      link: `/transactions/deposit/add?memberId=${id}`,
    },
    {
      title: 'New Withdraw',
      link: '/transactions/withdraw/add',
    },
    {
      title: 'Transfer',
      link: '/accounts/account-transfer/add',
    },
  ];

  return (
    <>
      <Text fontSize="r3" fontWeight="600">
        Transactions
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
                onClick={() => router.push(`${item.link}`)}
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
      <TransactionTable />
    </>
  );
};
