import React, { useState } from 'react';
import { useForm, useFormContext } from 'react-hook-form';
import { AiOutlinePlus } from 'react-icons/ai';
import { useQueryClient } from 'react-query';
import { useRouter } from 'next/router';

import { InfoCard } from '@coop/ebanking/cards';
import {
  EbankingSendMoneyInput,
  useCompleteSendMoneyMutation,
  useGetAccountListQuery,
} from '@coop/ebanking/data-access';
import { Box, Button, Grid, Icon, PasswordInput, Text, toast } from '@coop/shared/ui';
import { amountConverter } from '@coop/shared/utils';

import { CardBodyContainer, CardContainer, CardContent, CardHeader } from '../CardContainer';

type PaymentStatus = 'form' | 'review' | 'success' | 'failure' | 'loading';

interface SendMoneyReviewProps {
  setPaymentStatus: React.Dispatch<React.SetStateAction<PaymentStatus>>;
}

export const SendMoneyReview = ({ setPaymentStatus }: SendMoneyReviewProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [hasTransactionPassword, setHasTransactionPassword] = useState(false);
  const { mutateAsync: completeSendMoney } = useCompleteSendMoneyMutation({
    onSuccess: (response) => {
      queryClient.setQueryData(
        'send-money-success',
        response?.eBanking?.webUtilityPayments?.sendMoney?.proceed?.record
      );
    },
  });
  const { getValues } = useFormContext<EbankingSendMoneyInput>();

  const { register, reset, getValues: getTransactionPin } = useForm<{ transactionPin: string }>();

  const { data: accountData } = useGetAccountListQuery({
    transactionPagination: { after: '', first: 1 },
  });

  const sourceAccount = accountData?.eBanking?.account?.list?.accounts?.find(
    (account) => account?.id === getValues()?.sourceAccount
  );

  return (
    <>
      <InfoCard
        title="Payment Review"
        btn={
          <Button variant="ghost" gap="s4">
            <Icon as={AiOutlinePlus} color="primary.500" />
            Schedule for later
          </Button>
        }
      >
        <CardContainer>
          <CardBodyContainer>
            <CardHeader>Payee Details</CardHeader>
            <CardContent
              title="Source Account"
              subtitle={`${sourceAccount?.name} - ${sourceAccount?.id}`}
            />
            <Grid templateColumns="repeat(3, 1fr)" gap="s16">
              <CardContent title="Recipient Name" subtitle={getValues().recipientName as string} />
              <CardContent
                title="Mobile Number"
                subtitle={getValues().recipientMobileNumber as string}
              />
              <CardContent
                title="Account Number"
                subtitle={getValues().recipientAccountNumber as string}
              />
              <CardContent
                title="Purpose"
                subtitle={
                  getValues().purposeOfTransaction?.toLowerCase().replace('_', ' ') as string
                }
              />
              <CardContent title="Remarks" subtitle={getValues().remarks as string} />
            </Grid>
          </CardBodyContainer>
          <CardBodyContainer>
            <CardHeader>Payment Details</CardHeader>

            <CardContent
              title="Transaction Amount"
              subtitle={amountConverter(getValues().amount as string) as string}
            />
          </CardBodyContainer>
          {!hasTransactionPassword && (
            <Box display="flex" gap="s16">
              <Button
                w="100px"
                onClick={() => {
                  setHasTransactionPassword(true);
                }}
              >
                Proceed
              </Button>
              <Button
                variant="outline"
                colorScheme="white"
                w="100px"
                cursor="pointer"
                onClick={() => {
                  setPaymentStatus('form');
                }}
              >
                Edit
              </Button>
            </Box>
          )}
        </CardContainer>
      </InfoCard>

      {hasTransactionPassword ? (
        <Box bg="white" p="s16" display="flex" flexDir="column" gap="s32">
          <Box display="flex" w="50%" flexDir="column" gap="s4">
            <PasswordInput label="Pin" {...register('transactionPin')} />
            <Text
              fontWeight="500"
              fontSize="s3"
              color="success.400"
              onClick={() => router.push('/settings')}
            >
              Forget your pin ?
            </Text>
          </Box>
          <Box display="flex" gap="s16">
            <Button
              w="100px"
              type="button"
              onClick={async (e) => {
                e.preventDefault();
                setPaymentStatus('loading');

                const response = await completeSendMoney({
                  data: getValues(),
                  transactionPin: getTransactionPin().transactionPin,
                });

                const errors = response?.eBanking?.webUtilityPayments?.sendMoney?.proceed?.error;

                if (
                  errors?.__typename === 'BadRequestError' &&
                  errors?.badRequestErrorMessage.toLowerCase().includes('pin')
                ) {
                  toast({
                    id: 'error-text',
                    type: 'error',
                    message: 'Invalid Pin',
                  });
                  setPaymentStatus('review');

                  return;
                }

                if (response.eBanking.webUtilityPayments?.sendMoney?.proceed?.recordId) {
                  setHasTransactionPassword(false);
                  queryClient.invalidateQueries('getAccountList');
                  queryClient.invalidateQueries('getTransactionLists');

                  setPaymentStatus('success');
                  reset();
                } else {
                  setHasTransactionPassword(false);

                  setPaymentStatus('failure');
                }
              }}
            >
              Submit
            </Button>
            <Button
              variant="outline"
              colorScheme="white"
              w="100px"
              cursor="pointer"
              onClick={() => {
                setPaymentStatus('form');
              }}
            >
              Clear
            </Button>
          </Box>
        </Box>
      ) : null}
    </>
  );
};
