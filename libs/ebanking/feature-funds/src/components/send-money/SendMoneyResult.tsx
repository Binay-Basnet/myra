import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';

import { TransactionHeaderCardWithChip, TransferModal } from '@coop/ebanking/cards';
import {
  EbankingSendMoneyInput,
  EbankingSendMoneyRecord,
  useGetAccountListQuery,
} from '@coop/ebanking/data-access';
import { Box, Button, Grid, Icon, Text, TextFields } from '@myra-ui';
import { amountConverter } from '@coop/shared/utils';

import { CardBodyContainer, CardContainer, CardContent, CardHeader } from '../CardContainer';

type PaymentStatus = 'form' | 'review' | 'success' | 'failure' | 'loading';

interface SendMoneyResultProps {
  paymentStatus: 'success' | 'failure';
  setPaymentStatus: React.Dispatch<React.SetStateAction<PaymentStatus>>;
}

export const SendMoneyResult = ({ paymentStatus, setPaymentStatus }: SendMoneyResultProps) => {
  const router = useRouter();

  const queryClient = useQueryClient();

  const successResponse = queryClient?.getQueryData([
    'send-money-success',
  ]) as EbankingSendMoneyRecord;

  const { getValues } = useFormContext<EbankingSendMoneyInput>();

  const { data: accountData } = useGetAccountListQuery({
    transactionPagination: { after: '', first: 1 },
  });

  const sourceAccount = accountData?.eBanking?.account?.list?.accounts?.find(
    (account) => account?.id === getValues()?.sourceAccount
  );

  // const { getValues } = useFormContext<EbankingSendMoneyInput>();

  return (
    <>
      <TransferModal status={paymentStatus} />
      <Box display="flex" flexDir="column" bg="white" borderRadius="br2" overflow="hidden">
        <TransactionHeaderCardWithChip
          chipText={paymentStatus === 'failure' ? 'Transfer Failed' : 'Transfer Successful'}
          isSuccess={paymentStatus === 'success'}
        />
        <Box
          h="74px"
          p="s16"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          borderY="1px"
          borderColor="border.layout"
        >
          <Box display="flex" alignItems="center" gap="12px">
            <Icon as={TempIcon} />
            <TextFields variant="navItems" color="gray.800" fontSize="r1">
              Send Money
            </TextFields>
          </Box>

          <Box display="flex" flexDir="column" alignItems="flex-end">
            <TextFields
              variant="tableHeader"
              color={paymentStatus === 'success' ? 'primary.500' : 'gray.800'}
            >
              Rs. {amountConverter(successResponse?.amount as string)}
            </TextFields>

            <Text fontSize="s3" fontWeight="400" color="gray.500">
              {dayjs(successResponse?.transactionDate).format('YYYY-MM-DD hh:mm A')}
            </Text>
          </Box>
        </Box>

        <CardContainer>
          <CardBodyContainer>
            <CardHeader>Transaction Details</CardHeader>
            <CardContent
              title="Source Account"
              subtitle={`${sourceAccount?.name} - ${sourceAccount?.id}`}
            />{' '}
            <Grid templateColumns="repeat(3, 1fr)" gap="s16">
              {successResponse?.transactionCode && (
                <CardContent title="Transaction Code" subtitle={successResponse?.transactionCode} />
              )}

              <CardContent title="Recipient Name" subtitle={getValues()?.recipientName as string} />
              <CardContent
                title="Mobile Number"
                subtitle={getValues()?.recipientMobileNumber as string}
              />
              <CardContent
                title="Account Number"
                subtitle={getValues()?.recipientAccountNumber as string}
              />
              <CardContent
                title="Purpose"
                subtitle={
                  getValues()?.purposeOfTransaction?.toLowerCase().replace('_', ' ') as string
                }
              />
              <CardContent title="Remarks" subtitle={getValues()?.remarks as string} />
            </Grid>
          </CardBodyContainer>
          {paymentStatus === 'failure' ? (
            <Box display="flex" gap="s16">
              <Button
                w="100px"
                shade="danger"
                onClick={() => {
                  setPaymentStatus('form');
                }}
              >
                Retry
              </Button>
              <Button
                variant="outline"
                colorScheme="gray"
                w="100px"
                cursor="pointer"
                onClick={() => {
                  setPaymentStatus('review');
                }}
              >
                Go Back
              </Button>
            </Box>
          ) : (
            <Box display="flex" gap="s16">
              <Button
                w="100px"
                onClick={() => {
                  router.push('/home');
                }}
              >
                Done
              </Button>
              <Button variant="outline" colorScheme="gray" w="100px" cursor="pointer">
                Save
              </Button>
            </Box>
          )}
        </CardContainer>
      </Box>
    </>
  );
};

const TempIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="0.5" y="0.5" width="31" height="31" rx="3.5" fill="#F5F9F7" />
    <path
      d="M16 16C15.5145 16 15.04 16.1408 14.6363 16.4045C14.2327 16.6682 13.9181 17.043 13.7323 17.4816C13.5465 17.9201 13.4979 18.4027 13.5926 18.8682C13.6873 19.3338 13.9211 19.7614 14.2644 20.0971C14.6076 20.4327 15.045 20.6613 15.5211 20.7539C15.9973 20.8465 16.4908 20.799 16.9393 20.6173C17.3878 20.4357 17.7712 20.128 18.0409 19.7334C18.3106 19.3387 18.4545 18.8747 18.4545 18.4C18.4545 17.7635 18.1959 17.153 17.7356 16.7029C17.2753 16.2529 16.651 16 16 16ZM16 19.2C15.8382 19.2 15.68 19.1531 15.5454 19.0652C15.4109 18.9773 15.306 18.8523 15.2441 18.7061C15.1822 18.56 15.166 18.3991 15.1975 18.2439C15.2291 18.0887 15.307 17.9462 15.4215 17.8343C15.5359 17.7224 15.6817 17.6462 15.8404 17.6154C15.9991 17.5845 16.1636 17.6003 16.3131 17.6609C16.4626 17.7214 16.5904 17.824 16.6803 17.9555C16.7702 18.0871 16.8182 18.2418 16.8182 18.4C16.8182 18.6122 16.732 18.8157 16.5785 18.9657C16.4251 19.1157 16.217 19.2 16 19.2ZM15.4191 14.168C15.4969 14.2408 15.5887 14.2979 15.6891 14.336C15.787 14.3783 15.8929 14.4002 16 14.4002C16.1071 14.4002 16.213 14.3783 16.3109 14.336C16.4113 14.2979 16.5031 14.2408 16.5809 14.168L18.4545 12.368C18.613 12.2131 18.7019 12.003 18.7019 11.784C18.7019 11.565 18.613 11.3549 18.4545 11.2C18.2961 11.0451 18.0813 10.9581 17.8573 10.9581C17.6333 10.9581 17.4184 11.0451 17.26 11.2L16.8182 11.672V8.8C16.8182 8.58783 16.732 8.38434 16.5785 8.23431C16.4251 8.08429 16.217 8 16 8C15.783 8 15.5749 8.08429 15.4215 8.23431C15.268 8.38434 15.1818 8.58783 15.1818 8.8V11.672L14.74 11.2C14.5816 11.0451 14.3667 10.9581 14.1427 10.9581C13.9187 10.9581 13.7039 11.0451 13.5455 11.2C13.387 11.3549 13.2981 11.565 13.2981 11.784C13.2981 12.003 13.387 12.2131 13.5455 12.368L15.4191 14.168ZM21.7273 18.4C21.7273 18.2418 21.6793 18.0871 21.5894 17.9555C21.4995 17.824 21.3717 17.7214 21.2222 17.6609C21.0727 17.6003 20.9082 17.5845 20.7495 17.6154C20.5908 17.6462 20.445 17.7224 20.3305 17.8343C20.2161 17.9462 20.1382 18.0887 20.1066 18.2439C20.0751 18.3991 20.0913 18.56 20.1532 18.7061C20.2151 18.8523 20.32 18.9773 20.4545 19.0652C20.5891 19.1531 20.7473 19.2 20.9091 19.2C21.1261 19.2 21.3342 19.1157 21.4876 18.9657C21.6411 18.8157 21.7273 18.6122 21.7273 18.4ZM22.5455 12.8H20.0909C19.8739 12.8 19.6658 12.8843 19.5124 13.0343C19.3589 13.1843 19.2727 13.3878 19.2727 13.6C19.2727 13.8122 19.3589 14.0157 19.5124 14.1657C19.6658 14.3157 19.8739 14.4 20.0909 14.4H22.5455C22.7625 14.4 22.9706 14.4843 23.124 14.6343C23.2774 14.7843 23.3636 14.9878 23.3636 15.2V21.6C23.3636 21.8122 23.2774 22.0157 23.124 22.1657C22.9706 22.3157 22.7625 22.4 22.5455 22.4H9.45455C9.23755 22.4 9.02944 22.3157 8.876 22.1657C8.72256 22.0157 8.63636 21.8122 8.63636 21.6V15.2C8.63636 14.9878 8.72256 14.7843 8.876 14.6343C9.02944 14.4843 9.23755 14.4 9.45455 14.4H11.9091C12.1261 14.4 12.3342 14.3157 12.4876 14.1657C12.6411 14.0157 12.7273 13.8122 12.7273 13.6C12.7273 13.3878 12.6411 13.1843 12.4876 13.0343C12.3342 12.8843 12.1261 12.8 11.9091 12.8H9.45455C8.80356 12.8 8.17924 13.0529 7.71892 13.5029C7.2586 13.953 7 14.5635 7 15.2V21.6C7 22.2365 7.2586 22.847 7.71892 23.2971C8.17924 23.7471 8.80356 24 9.45455 24H22.5455C23.1964 24 23.8208 23.7471 24.2811 23.2971C24.7414 22.847 25 22.2365 25 21.6V15.2C25 14.5635 24.7414 13.953 24.2811 13.5029C23.8208 13.0529 23.1964 12.8 22.5455 12.8ZM10.2727 18.4C10.2727 18.5582 10.3207 18.7129 10.4106 18.8445C10.5005 18.976 10.6283 19.0786 10.7778 19.1391C10.9273 19.1997 11.0918 19.2155 11.2505 19.1846C11.4092 19.1538 11.555 19.0776 11.6695 18.9657C11.7839 18.8538 11.8618 18.7113 11.8934 18.5561C11.9249 18.4009 11.9087 18.24 11.8468 18.0939C11.7849 17.9477 11.68 17.8227 11.5455 17.7348C11.4109 17.6469 11.2527 17.6 11.0909 17.6C10.8739 17.6 10.6658 17.6843 10.5124 17.8343C10.3589 17.9843 10.2727 18.1878 10.2727 18.4Z"
      fill="#006837"
    />
    <rect x="0.5" y="0.5" width="31" height="31" rx="3.5" stroke="#E6F0EB" />
  </svg>
);
