import { Box, DetailCardContent, DetailsCard, FileViewer, Text } from '@myra-ui';

import { SharePaymentMode } from '@coop/cbs/data-access';
import { localizedDate } from '@coop/cbs/utils';
import { amountConverter } from '@coop/shared/utils';

type PaymentDataProps = {
  paymentFile?: string | null | undefined;
  paymentData:
    | {
        paymentMode?: SharePaymentMode | null | undefined;
        amount?: string | null | undefined;
        sourceOfFund?: string | null | undefined;
        depositedDate?: Record<'local' | 'en' | 'np', string> | null | undefined;
      }
    | undefined
    | null;
};

export const PaymentDetails = ({ paymentData, paymentFile }: PaymentDataProps) => {
  const paymentFileUrl = paymentFile as string;

  return (
    <DetailsCard title="Payment Details" hasThreeRows>
      <DetailCardContent
        title="Payment Mode"
        subtitle={paymentData?.paymentMode?.split('_')?.join(' ')}
      />
      <DetailCardContent title="Amount" subtitle={amountConverter(paymentData?.amount as string)} />
      <DetailCardContent title="Source of Fund" subtitle={paymentData?.sourceOfFund} />
      {paymentData?.paymentMode === 'BANK_VOUCHER_OR_CHEQUE' && paymentData?.depositedDate && (
        <DetailCardContent
          title="Deposited Date"
          subtitle={localizedDate(paymentData?.depositedDate)}
        />
      )}
      {paymentData?.paymentMode === 'BANK_VOUCHER_OR_CHEQUE' && paymentFile && (
        <Box display="flex" flexDirection="column" gap="s4">
          <Text fontWeight="500" fontSize="s3" color="gray.700">
            File Upload
          </Text>
          <FileViewer fileName={paymentFileUrl} fileUrl={paymentFileUrl} type="Bank Voucher" />
        </Box>
      )}
    </DetailsCard>
  );
};
