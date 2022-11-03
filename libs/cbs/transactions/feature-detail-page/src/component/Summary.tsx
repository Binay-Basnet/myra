import { Box, Tags, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

type SummaryProps = {
  summary: {
    transactionId: string | undefined | null;
    transactionDate: string | undefined | null;
    paymentMode: string | undefined | null;
    amount: string | undefined | null;
    method: string | undefined | null;
  };
};

export const Summary = ({ summary }: SummaryProps) => {
  const { t } = useTranslation();

  return (
    <Box
      p="s16"
      borderBottom="1px"
      justifyContent="space-between"
      borderBottomColor="border.layout"
      display="flex"
      gap="s16"
    >
      <Box display="flex" flexDirection="column">
        <Text fontSize="r1" fontWeight="Regular" color="neutralColorLight.Gray-70">
          #{summary.transactionId}
        </Text>
        <Text fontSize="r1" fontWeight="Medium" color="neutralColorLight.Gray-80">
          {summary.transactionDate}
        </Text>
        <Text fontSize="r1" fontWeight="Regular" color="neutralColorLight.Gray-80">
          {t['transDetailDeposit']} - {summary.method}
        </Text>
      </Box>

      <Box display="flex" flexDirection="column">
        <Text fontSize="r1" fontWeight="SemiBold" color="neutralColorLight.Gray-80">
          {summary.amount}
        </Text>
        <Tags
          type="chip"
          label={summary.paymentMode ?? ''}
          tagColor="primary.100"
          labelColor="success.500"
        />
      </Box>
    </Box>
  );
};
