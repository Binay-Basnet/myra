import React, { useState } from 'react';

import { Box, PathBar } from '@coop/shared/ui';

import { AccountTransferForm } from '../components/account-transfer/AccountTransfer';
import { AccountTransferResult } from '../components/account-transfer/AccountTransferResult';
import { AccountTransferReview } from '../components/account-transfer/AccountTransferReview';

type PaymentStatus = 'form' | 'review' | 'success' | 'failure';

export const AccountTransferPage = () => {
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>('form');

  return (
    <Box display="flex" flexDir="column" gap="s16">
      <PathBar
        paths={[
          { label: 'Home', link: '/home' },
          { label: 'Account Transfer', link: '/home/account-transfer' },
        ]}
      />

      <Box display={paymentStatus === 'form' ? 'block' : 'none'}>
        <AccountTransferForm setPaymentStatus={setPaymentStatus} />
      </Box>

      {paymentStatus === 'review' && (
        <AccountTransferReview setPaymentStatus={setPaymentStatus} />
      )}

      {paymentStatus === 'success' || paymentStatus === 'failure' ? (
        <AccountTransferResult
          paymentStatus={paymentStatus}
          setPaymentStatus={setPaymentStatus}
        />
      ) : null}
    </Box>
  );
};
