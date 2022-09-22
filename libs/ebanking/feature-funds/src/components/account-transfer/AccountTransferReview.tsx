import React from 'react';
import { AiOutlinePlus } from 'react-icons/ai';

import { InfoCard } from '@coop/ebanking/cards';
import { Box, Button, Icon } from '@coop/shared/ui';

import { CardBodyContainer, CardContainer, CardContent, CardHeader } from '../CardContainer';

type PaymentStatus = 'form' | 'review' | 'success' | 'failure';

interface AccountTransferReviewProps {
  setPaymentStatus: React.Dispatch<React.SetStateAction<PaymentStatus>>;
}

export const AccountTransferReview = ({ setPaymentStatus }: AccountTransferReviewProps) => (
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
        <CardContent title="Source Account" subtitle="Salary Saving Account - 10101432" />
        <CardContent title="Destination Account" subtitle="Nari Samman Saving Account - 101432" />
        <CardContent title="Remarks" subtitle="Personal Use" />
      </CardBodyContainer>
      <CardBodyContainer>
        <CardHeader>Payment Details</CardHeader>

        <CardContent title="Transaction Amount" subtitle="42,120.59" />
      </CardBodyContainer>
      <Box display="flex" gap="s16">
        <Button
          w="100px"
          onClick={() => {
            if (Math.floor(Math.random() * 100) % 2 === 0) {
              setPaymentStatus('success');
            } else {
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
          Edit
        </Button>
      </Box>
    </CardContainer>
  </InfoCard>
);
