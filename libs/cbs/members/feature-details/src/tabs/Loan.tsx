import { IoAddOutline, IoList } from 'react-icons/io5';
import { useRouter } from 'next/router';

import { Box, Grid, Icon, Text } from '@myra-ui';

import { LoanAccountList, LoanPaymentTable } from '../components';

export const Loan = () => {
  const router = useRouter();
  const id = router.query['id'] as string;

  const links = [
    {
      title: 'New Loan Application',
      link: `/loan/apply?memberId=${id}`,
    },
    {
      title: 'Loan Repayment',
      link: `/loan/repayments/add?memberId=${id}`,
    },
    {
      title: 'Payment Schedules',
      link: `/loan?memberId=${id}`,
    },
  ];
  return (
    <>
      <Text fontSize="r3" fontWeight="600">
        Loan{' '}
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
                <Icon as={item.title !== 'Share Register' ? IoAddOutline : IoList} />

                <Text fontWeight="500" fontSize="s3">
                  {item.title}
                </Text>
              </Box>
            </Box>
          ))}
        </Grid>
      </Box>
      <LoanAccountList />
      <LoanPaymentTable />
    </>
  );
};
