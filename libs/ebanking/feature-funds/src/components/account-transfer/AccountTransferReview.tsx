import React from 'react';
import { useFormContext } from 'react-hook-form';
import { AiOutlinePlus } from 'react-icons/ai';
import { useQueryClient } from 'react-query';

import { InfoCard } from '@coop/ebanking/cards';
import { useAccountTransferMutation, useGetAccountListQuery } from '@coop/ebanking/data-access';
import { AccountTransferFormType } from '@coop/ebanking/funds';
import { Box, Button, Icon } from '@coop/shared/ui';

import { CardBodyContainer, CardContainer, CardContent, CardHeader } from '../CardContainer';

type PaymentStatus = 'form' | 'review' | 'success' | 'failure' | 'loading';

interface AccountTransferReviewProps {
  setPaymentStatus: React.Dispatch<React.SetStateAction<PaymentStatus>>;
  setTransactionCode: React.Dispatch<React.SetStateAction<string>>;
}

export const AccountTransferReview = ({
  setPaymentStatus,
  setTransactionCode,
}: AccountTransferReviewProps) => {
  const queryClient = useQueryClient();
  const methods = useFormContext<AccountTransferFormType>();

  const { mutateAsync } = useAccountTransferMutation({
    onMutate: () => setPaymentStatus('loading'),
  });

  const { data } = useGetAccountListQuery({ transactionPagination: { after: '', first: 1 } });
  const accounts = data?.eBanking?.account?.list?.accounts?.map((account) => ({
    label: `${account?.name} - ${account?.accountNumber}`,
    value: account?.id as string,
  }));

  return (
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
            subtitle={
              accounts?.find((account) => account.value === methods?.getValues().sourceAccount)
                ?.label as string
            }
          />
          <CardContent
            title="Destination Account"
            subtitle={
              accounts?.find((account) => account.value === methods?.getValues().destinationAccount)
                ?.label as string
            }
          />
          <CardContent title="Remarks" subtitle={methods?.getValues().remarks} />
        </CardBodyContainer>
        <CardBodyContainer>
          <CardHeader>Payment Details</CardHeader>

          <CardContent
            title="Transaction Amount"
            subtitle={Number(methods?.getValues().amount).toFixed(2)}
          />
        </CardBodyContainer>
        <Box display="flex" gap="s16">
          <Button
            w="100px"
            onClick={async () => {
              // if (Math.floor(Math.random() * 100) % 2 === 0) {
              //   setPaymentStatus('success');
              // } else {
              //   setPaymentStatus('failure');
              // }

              const response = await mutateAsync({
                data: methods?.getValues(),
              });

              if (response?.eBanking?.webUtilityPayments?.accountTransfer?.success) {
                queryClient.invalidateQueries('getAccountList');
                queryClient.invalidateQueries('getTransactionLists');

                setTransactionCode(
                  response?.eBanking?.webUtilityPayments?.accountTransfer?.record
                    ?.transactionCode as string
                );
                setPaymentStatus('success');
              } else {
                const error = response?.eBanking?.webUtilityPayments?.accountTransfer?.error;
                const errMsg =
                  error?.__typename === 'BadRequestError' && error?.badRequestErrorMessage;

                if (error && errMsg) {
                  methods.setError('amount', { message: errMsg });
                  setPaymentStatus('form');
                } else {
                  setPaymentStatus('failure');
                }
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
            Edit
          </Button>
        </Box>
      </CardContainer>
    </InfoCard>
  );
};
